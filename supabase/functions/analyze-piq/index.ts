import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { description, image, pdf } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are an expert SSB psychologist specializing in PIQ (Picture Interpretation Questionnaire) analysis. 

Analyze the candidate's PIQ and provide feedback on:
1. **Imagination & Creativity**: How vivid and original is the interpretation?
2. **OLQ Display**: Which Officer Like Qualities are demonstrated?
3. **Story Structure**: Coherence, characters, plot, and action
4. **Practical Thinking**: Realistic vs fantasy elements
5. **Positive Attitude**: Optimistic vs negative themes

Provide analysis in JSON format with:
- strengths: Array of positive points
- improvements: Array of areas to improve
- suggestions: Array of 5-6 word max specific actionable suggestions
- howToImprove: Detailed guidance on making the PIQ better`;

    const messages: any[] = [
      { role: "system", content: systemPrompt }
    ];

    if (pdf) {
      messages.push({
        role: "user",
        content: [
          {
            type: "text",
            text: description ? `Analyze this 2-page PIQ PDF. Description: ${description}` : "Analyze this 2-page PIQ PDF."
          },
          {
            type: "image_url",
            image_url: { url: pdf }
          }
        ]
      });
    } else if (image) {
      messages.push({
        role: "user",
        content: [
          {
            type: "text",
            text: description ? `Analyze this PIQ. Description: ${description}` : "Analyze this PIQ image."
          },
          {
            type: "image_url",
            image_url: { url: image }
          }
        ]
      });
    } else {
      messages.push({
        role: "user",
        content: `Analyze this PIQ: ${description}`
      });
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: messages,
        tools: [{
          type: 'function',
          function: {
            name: 'provide_piq_analysis',
            description: 'Provide detailed PIQ analysis',
            parameters: {
              type: 'object',
              properties: {
                strengths: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Strengths in the PIQ'
                },
                improvements: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Areas to improve'
                },
                suggestions: {
                  type: 'array',
                  items: { type: 'string' },
                  description: '5-6 word max specific suggestions'
                },
                howToImprove: {
                  type: 'string',
                  description: 'Detailed guidance'
                }
              },
              required: ['strengths', 'improvements', 'suggestions', 'howToImprove'],
              additionalProperties: false
            }
          }
        }],
        tool_choice: { type: 'function', function: { name: 'provide_piq_analysis' } }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limits exceeded, please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'Payment required, please add funds to your workspace.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      throw new Error('AI gateway error');
    }

    const data = await response.json();
    const toolCall = data.choices[0]?.message?.tool_calls?.[0];
    
    if (toolCall && toolCall.function?.arguments) {
      const analysis = JSON.parse(toolCall.function.arguments);
      
      return new Response(JSON.stringify({ analysis }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    throw new Error('No analysis returned from AI');

  } catch (error) {
    console.error('Error in analyze-piq function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
