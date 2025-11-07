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
    const { testType, content, language = 'english' } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const languageInstruction = language === 'hindi' 
      ? "IMPORTANT: Provide ALL your analysis in Hindi language (हिंदी में)." 
      : "";
    
    let systemPrompt = "";
    
    if (testType === 'tat') {
      systemPrompt = `You are an expert SSB psychologist analyzing TAT stories. ${languageInstruction} Evaluate based on 15 Officer-Like Qualities (OLQs):
1. Effective Intelligence
2. Reasoning Ability
3. Organizing Ability
4. Power of Expression
5. Social Adaptability
6. Cooperation
7. Sense of Responsibility
8. Initiative
9. Self Confidence
10. Speed of Decision
11. Ability to Influence the Group
12. Liveliness
13. Determination
14. Courage
15. Stamina

Analyze the story and provide:
1. OLQs identified (list specific qualities shown)
2. Strengths (what the candidate did well)
3. Improvements (what could be better)
4. Detailed feedback on the story structure, character, action, and outcome
5. Specific suggestions on how to improve the story
6. Exact changes the candidate can make to create a perfect story

Be specific, constructive, and SSB-focused. Stories should show positive action, leadership, helping nature, and practical solutions.`;
    } else if (testType === 'wat') {
      systemPrompt = `You are an expert SSB psychologist analyzing WAT responses. ${languageInstruction} Evaluate based on Officer-Like Qualities (OLQs).

The candidate writes a sentence using a given word. Analyze:
1. Which OLQs are reflected
2. Positive qualities shown
3. What could be improved
4. How to make the sentence more impactful
5. Better alternative sentences showing stronger OLQs

Look for: positivity, action-orientation, leadership, helping nature, responsibility, determination.
REMINDER for candidates: In SSB WAT, you get only 15 seconds per word, so aim for 5-6 words maximum for quick thinking.`;
    } else if (testType === 'srt') {
      systemPrompt = `You are an expert SSB psychologist analyzing SRT responses. ${languageInstruction} Evaluate based on Officer-Like Qualities (OLQs).

The candidate describes how they would react to a situation. Analyze:
1. Which OLQs are demonstrated
2. Strengths in the response (decisiveness, practical thinking, leadership)
3. Weaknesses or unrealistic elements
4. How to improve the response
5. What an ideal officer-like response would be

Good responses show: quick decision-making, practical solutions, taking initiative, helping others, confidence, and courage.
REMINDER for candidates: In SSB SRT, give 1-2 line detailed answers so the psychologist clearly understands your thought process.`;
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Analyze this ${testType.toUpperCase()} response:\n\n${content}` }
        ],
        tools: [{
          type: 'function',
          function: {
            name: 'provide_analysis',
            description: 'Provide detailed OLQ-based analysis',
            parameters: {
              type: 'object',
              properties: {
                olqsIdentified: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'List of OLQs demonstrated'
                },
                strengths: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Strengths in the response'
                },
                improvements: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Areas that need improvement'
                },
                detailedFeedback: {
                  type: 'string',
                  description: 'Detailed analysis of the response'
                },
                suggestions: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Specific actionable suggestions'
                },
                howToImprove: {
                  type: 'string',
                  description: 'Specific guidance on how to make the response perfect, including exact changes'
                }
              },
              required: ['olqsIdentified', 'strengths', 'improvements', 'detailedFeedback', 'suggestions', 'howToImprove'],
              additionalProperties: false
            }
          }
        }],
        tool_choice: { type: 'function', function: { name: 'provide_analysis' } }
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
        return new Response(JSON.stringify({ error: 'Payment required, please add funds to your Lovable AI workspace.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      return new Response(JSON.stringify({ error: 'AI gateway error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
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
    console.error('Error in analyze-psych function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
