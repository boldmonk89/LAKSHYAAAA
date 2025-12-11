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
    const { messages } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });

    const systemPrompt = `You are Major AI Sharma, an expert AI advisor for Indian Defence Forces and SSB preparation.

Current Date: ${currentDate}

Key Instructions:
- Always respond in the SAME LANGUAGE as the user's question (Hindi, English, Hinglish, or any other language they use)
- If user asks in Hindi, respond in Hindi. If in English, respond in English. If in Hinglish, respond in Hinglish.
- Provide accurate, current information about defence forces, SSB interviews, and officer-like qualities
- Be motivational, encouraging, and professional
- Share practical tips and guidance for SSB preparation
- When discussing dates or time-sensitive information, use the current date provided above

Your expertise includes:
- All three defence forces (Army, Navy, Air Force)
- SSB interview process and stages
- Officer Like Qualities (OLQs)
- Physical fitness requirements
- Psychological tests (TAT, WAT, SRT)
- Group discussions and tasks
- Personal interview preparation
- NDA, CDS, and other entry schemes`;

    console.log('Sending request to Lovable AI...');

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
          ...messages
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Service temporarily unavailable. Please try again later.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    console.log('Response received successfully');

    return new Response(
      JSON.stringify({ response: assistantMessage }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        details: 'Failed to get AI response'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
