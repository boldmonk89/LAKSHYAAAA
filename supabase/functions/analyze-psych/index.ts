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
    const { testType, content, language = 'english', tatImage, storyImage } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const languageInstruction = language === 'hindi' 
      ? "IMPORTANT: Provide ALL your analysis in Hindi language (हिंदी में)." 
      : "";

    console.log(`Analyzing ${testType} with Gemini...`);
    console.log(`Has TAT image: ${!!tatImage}, Has story image: ${!!storyImage}`);

    let systemPrompt = "";
    let userContent: any[] = [];
    
    if (testType === 'tat') {
      // Check if we have uploaded images for TAT
      const hasImages = tatImage || storyImage;
      
      if (hasImages) {
        // TAT with uploaded images - analyze both TAT picture and handwritten story
        systemPrompt = `You are an expert SSB psychologist specializing in TAT (Thematic Apperception Test) analysis. ${languageInstruction}

YOUR TASK:
1. **FIRST**: Analyze the TAT stimulus picture provided:
   - Stimulus: What's shown in the picture
   - What's going on: Current situation depicted
   - What led to this: Background/cause
   - What will be the outcome: Expected resolution based on visual cues

2. **SECOND**: Read and analyze the candidate's handwritten story (if provided):
   - Extract the text from the handwritten image
   - Evaluate the story against SSB OLQ standards

CRITICAL TAT ANALYSIS RULES:
1. **Never give rewards to yourself** - Story protagonist should never receive medals, awards, or self-glory
2. **Always praise your team** - Show teamwork and collective effort
3. **Be a team player** - Demonstrate collaboration, not individual heroism

15 Officer Like Qualities to identify:
Leadership, Initiative, Courage, Determination, Effective Intelligence, Social Adjustment, Sense of Responsibility, Cooperation, Speed of Decision, Communication Skills, Liveliness, Stamina, Self-Confidence, Ability to Influence, Group Cohesion

Provide structured analysis with:
- OLQs demonstrated (or expected from the story)
- Strengths (what's good in the story structure and OLQ display)
- Improvements needed (common mistakes like self-rewards, lack of teamwork)
- Detailed feedback comparing TAT picture analysis vs candidate's story
- How to improve with specific changes`;

        // Build multimodal content
        userContent.push({
          type: "text",
          text: "Analyze this TAT submission:\n\n"
        });

        if (tatImage) {
          userContent.push({
            type: "text",
            text: "TAT PICTURE (Analyze this stimulus image):"
          });
          userContent.push({
            type: "image_url",
            image_url: { url: tatImage }
          });
        }

        if (storyImage) {
          userContent.push({
            type: "text",
            text: "\n\nCANDIDATE'S HANDWRITTEN STORY (Read and analyze this):"
          });
          userContent.push({
            type: "image_url",
            image_url: { url: storyImage }
          });
        }

        if (content) {
          userContent.push({
            type: "text",
            text: `\n\nAdditional typed content: ${content}`
          });
        }
      } else {
        // TAT with typed story only (original behavior)
        systemPrompt = `You are an expert SSB psychologist specializing in TAT analysis. ${languageInstruction}

CRITICAL TAT ANALYSIS RULES:
1. **Never give rewards to yourself** - Story protagonist should never receive medals, awards, or self-glory
2. **Always praise your team** - Show teamwork and collective effort
3. **Be a team player** - Demonstrate collaboration, not individual heroism

SSB expects you to analyze based on:
- Stimulus (What's shown in the picture)
- What's going on (Current situation)
- What led to this (Background/cause)
- What will be the outcome (Resolution)

15 Officer Like Qualities to identify:
Leadership, Initiative, Courage, Determination, Effective Intelligence, Social Adjustment, Sense of Responsibility, Cooperation, Speed of Decision, Communication Skills, Liveliness, Stamina, Self-Confidence, Ability to Influence, Group Cohesion

Provide structured analysis with:
- OLQs demonstrated
- Strengths (what's good)
- Improvements needed (common mistakes like self-rewards, lack of teamwork)
- Detailed feedback on story structure
- How to improve with specific changes`;

        userContent.push({
          type: "text",
          text: `Analyze this TAT response:\n\n${content}`
        });
      }
    } else if (testType === 'wat') {
      systemPrompt = `You are an expert SSB psychologist for WAT analysis. ${languageInstruction}

CRITICAL WAT RULES:
1. **OBSERVATIONAL SENTENCES ONLY** - No personal opinions!
   ❌ WRONG: "I think soldiers are brave", "He is honest", "They should help"
   ✅ CORRECT: "Soldiers protect the nation", "Honesty builds trust", "Courage overcomes fear"

2. **NO PERSONAL PRONOUNS** - Never use I, We, They, He, She, You
   
3. **5-6 WORDS MAX** - Keep it short (you get only 15 seconds in SSB!)

4. **POSITIVE THINKING** - Show optimism and solution-oriented mindset

5. **SHOW OLQs NATURALLY** - Display Leadership, Courage, Determination, etc.

Provide analysis with:
- OLQs identified in responses
- What's correct (observational, positive, no pronouns)
- What needs fixing (pronouns, negative thinking, too long)
- Specific suggestions with 5-6 word observational sentences`;

      userContent.push({
        type: "text",
        text: `Analyze this WAT response:\n\n${content}`
      });
    } else if (testType === 'srt') {
      systemPrompt = `You are an expert SSB psychologist for SRT analysis. ${languageInstruction}

CRITICAL SRT RULES:
1. **ACTION-ORIENTED** - Show immediate practical action with "I will..."
   ❌ WRONG: "I will wait and see", "I will ask someone"
   ✅ CORRECT: "I will immediately assess and take charge"

2. **SHOW INITIATIVE** - Be decisive and take responsibility

3. **BE PRACTICAL** - Realistic solutions, not fantasy

4. **DEMONSTRATE OLQs** - Leadership, Courage, Quick Decision Making

Provide analysis with:
- OLQs demonstrated
- What's strong (action, initiative, practical)
- What needs improvement (passive responses, unrealistic)
- Specific actionable suggestions showing how to respond`;

      userContent.push({
        type: "text",
        text: `Analyze this SRT response:\n\n${content}`
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
          { role: 'user', content: userContent }
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
                  description: 'Detailed analysis of the response including TAT picture analysis and story evaluation'
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
