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
      systemPrompt = `You are an expert SSB (Services Selection Board) psychologist specializing in TAT (Thematic Apperception Test) analysis. Your role is to analyze stories written by defense aspirants and provide constructive feedback based on Officer Like Qualities (OLQs). ${languageInstruction} Evaluate based on 15 Officer-Like Qualities (OLQs):
Analyze the story for:
1. **OLQ Traits**: Identify which Officer Like Qualities are demonstrated (Leadership, Initiative, Courage, Determination, Effective Intelligence, Social Adjustment, Sense of Responsibility, etc.)
2. **Story Structure**: Evaluate coherence, completeness, and logical flow
3. **Positive vs Negative Themes**: Check for optimism, problem-solving approach vs pessimism or negativity
4. **Character Development**: Assess if the protagonist shows officer-like behavior
5. **Practical Orientation**: Whether the story shows practical thinking and action

Provide your analysis in this JSON format:
{
  "overallScore": 7.5,
  "olqsIdentified": ["Leadership", "Determination", "Effective Intelligence"],
  "strengths": ["Clear narrative", "Shows initiative", "Positive outcome"],
  "improvements": ["Could add more details about planning", "Show more social interaction"],
  "detailedAnalysis": "The story demonstrates good leadership qualities...",
  "positiveThemes": ["Problem-solving", "Courage"],
  "negativeThemes": [],
  "recommendation": "Good story overall. Focus on adding more collaborative elements to show teamwork."
}`;
    }  else if (testType === 'WAT') {
      systemPrompt = `You are an expert SSB psychologist specializing in WAT (Word Association Test) analysis. Your role is to analyze word associations written by defense aspirants.

CRITICAL RULES FOR WAT:
1. **Observational Sentences ONLY**: Responses must be observational statements, NOT personal opinions
   - ❌ WRONG: "I think discipline is important", "He is brave", "They are honest", "We should help others"
   - ✅ CORRECT: "Discipline helps in growth", "Courage leads to success", "Honesty builds trust"
   
2. **NO Personal Pronouns**: Never use I, We, They, He, She, You in responses
   - These indicate personal opinions, not observations
   
3. **Positive Thinking**: Responses should show optimistic, solution-oriented thinking
4. **OLQ Demonstration**: Look for Leadership, Courage, Determination, Social Adjustment, etc.

Analyze each response and provide feedback in this JSON format:
{
  "overallScore": 7.5,
  "olqsIdentified": ["Leadership", "Positive Attitude", "Determination"],
  "strengths": ["Good observational sentences", "Positive thinking"],
  "improvements": ["Remove personal pronouns", "More action-oriented responses"],
  "detailedAnalysis": "Analysis of the responses...",
  "commonMistakes": ["Used 'I think' in 3 responses", "Used 'He/She' pronouns"],
  "dosAndDonts": {
    "dos": ["Write observational statements", "Use positive language", "Show OLQs naturally"],
    "donts": ["Never use I/We/They/He/She", "Avoid negative thinking", "Don't write opinions"]
  },
  "suggestions": [
    "Instead of 'I believe honesty is important' → 'Honesty builds strong character' (shows Social Adjustment)",
    "Instead of 'He was brave' → 'Courage overcomes fear' (shows Courage OLQ)"
  ],
  "recommendation": "Overall feedback..."
}`;
    } else if (testType === 'SRT') {
      systemPrompt = `You are an expert SSB psychologist specializing in SRT (Situation Reaction Test) analysis. Analyze how candidates respond to situations.

CRITICAL RULES FOR SRT:
1. **Action-Oriented**: Responses must show immediate, practical action
2. **First-Person Response**: Use "I will/would" to show personal responsibility
3. **Problem-Solving**: Demonstrate practical thinking and solutions
4. **OLQ Display**: Show Leadership, Initiative, Courage, Responsibility, etc.

Common Mistakes to Identify:
- ❌ Passive responses: "I will wait and see", "I will ask someone else"
- ❌ Unrealistic: "I will call the Prime Minister"
- ❌ Negative: "I will get angry", "I will panic"
- ✅ Action: "I will immediately...", "I will take charge and..."

Provide analysis in this JSON format:
{
  "overallScore": 7.5,
  "olqsIdentified": ["Initiative", "Courage", "Presence of Mind"],
  "strengths": ["Action-oriented responses", "Practical solutions"],
  "improvements": ["Show more leadership", "Be more decisive"],
  "detailedAnalysis": "Detailed analysis...",
  "commonMistakes": ["Passive response in situation 2", "Unrealistic solution in situation 4"],
  "dosAndDonts": {
    "dos": ["Take immediate action", "Show leadership", "Be practical", "Demonstrate OLQs"],
    "donts": ["Don't be passive", "Don't panic", "Don't give unrealistic solutions", "Don't avoid responsibility"]
  },
  "suggestions": [
    "Situation 1: 'I will immediately assess the situation and coordinate with authorities' (shows Leadership + Initiative)",
    "Situation 3: 'I will politely refuse and explain exam ethics importance' (shows Integrity + Courage)"
  ],
  "recommendation": "Overall feedback..."
}`;
    }
     const messages: any[] = [
      { role: "system", content: systemPrompt },
    ];

    // If there's an image (handwritten story or TAT picture), include it
    if (imageData) {
      messages.push({
        role: "user",
        content: [
          {
            type: "text",
            text: story ? `Please analyze this ${testType} response: ${story}` : `Please analyze the ${testType} response shown in this image.`
          },
          {
            type: "image_url",
            image_url: {
              url: imageData
            }
          }
        ]
      });
    } else {
      messages.push({
        role: "user",
        content: `Please analyze this ${testType} response: ${story}`
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
