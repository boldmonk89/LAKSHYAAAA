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

    const now = new Date();
    const currentDate = now.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      timeZone: 'Asia/Kolkata'
    });
    
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // 0-indexed
    
    // Calculate upcoming exam dates dynamically
    const getUpcomingNDADates = () => {
      // NDA 1: Notification in Dec/Jan, Exam in April, SSB in Aug-Oct
      // NDA 2: Notification in May/June, Exam in September, SSB in Jan-Mar
      
      let nda1Year = currentMonth <= 4 ? currentYear : currentYear + 1;
      let nda2Year = currentMonth <= 9 ? currentYear : currentYear + 1;
      
      return {
        nda1: {
          notification: `December ${nda1Year - 1} / January ${nda1Year}`,
          exam: `April ${nda1Year}`,
          ssb: `August-October ${nda1Year}`
        },
        nda2: {
          notification: `May/June ${nda2Year}`,
          exam: `September ${nda2Year}`,
          ssb: `January-March ${nda2Year + 1}`
        }
      };
    };
    
    const getUpcomingCDSDates = () => {
      // CDS 1: Notification in Oct/Nov, Exam in April, SSB in Aug-Nov
      // CDS 2: Notification in May/June, Exam in September, SSB in Jan-Apr
      
      let cds1Year = currentMonth <= 4 ? currentYear : currentYear + 1;
      let cds2Year = currentMonth <= 9 ? currentYear : currentYear + 1;
      
      return {
        cds1: {
          notification: `October/November ${cds1Year - 1}`,
          exam: `April ${cds1Year}`,
          ssb: `August-November ${cds1Year}`
        },
        cds2: {
          notification: `May/June ${cds2Year}`,
          exam: `September ${cds2Year}`,
          ssb: `January-April ${cds2Year + 1}`
        }
      };
    };

    const ndaDates = getUpcomingNDADates();
    const cdsDates = getUpcomingCDSDates();

    const systemPrompt = `You are Major AI Sharma, an expert AI advisor for Indian Defence Forces and SSB preparation.

## REAL-TIME INFORMATION (USE THIS DATA):

**Today's Date:** ${currentDate}
**Current Year:** ${currentYear}

## UPCOMING DEFENCE EXAM SCHEDULE:

### NDA (National Defence Academy):
**NDA 1 ${ndaDates.nda1.exam.split(' ')[1]}:**
- Notification: ${ndaDates.nda1.notification}
- Written Exam: ${ndaDates.nda1.exam}
- SSB Interview: ${ndaDates.nda1.ssb}

**NDA 2 ${ndaDates.nda2.exam.split(' ')[1]}:**
- Notification: ${ndaDates.nda2.notification}
- Written Exam: ${ndaDates.nda2.exam}
- SSB Interview: ${ndaDates.nda2.ssb}

### CDS (Combined Defence Services):
**CDS 1 ${cdsDates.cds1.exam.split(' ')[1]}:**
- Notification: ${cdsDates.cds1.notification}
- Written Exam: ${cdsDates.cds1.exam}
- SSB Interview: ${cdsDates.cds1.ssb}

**CDS 2 ${cdsDates.cds2.exam.split(' ')[1]}:**
- Notification: ${cdsDates.cds2.notification}
- Written Exam: ${cdsDates.cds2.exam}
- SSB Interview: ${cdsDates.cds2.ssb}

### AFCAT (Air Force Common Admission Test):
- AFCAT 1: February (every year)
- AFCAT 2: August (every year)

### Other Important Entries:
- TES (Technical Entry Scheme): January & July entries
- ACC (Army Cadet College): Written exam twice a year
- TGC (Technical Graduate Course): SSB twice a year
- SSC Tech: For engineering graduates, twice a year
- NCC Special Entry: For NCC C certificate holders

## KEY INSTRUCTIONS:
1. Always respond in the SAME LANGUAGE as the user's question (Hindi, English, Hinglish)
2. When asked about dates, exams, or schedules - USE THE REAL DATA PROVIDED ABOVE
3. When asked "aaj konsa din hai" or "today's date" - tell them: ${currentDate}
4. Be specific with exam dates and schedules
5. Be motivational, encouraging, and professional
6. Share practical tips and guidance for SSB preparation

## YOUR EXPERTISE:
- All three defence forces (Army, Navy, Air Force)
- SSB interview process (5-day procedure)
- Officer Like Qualities (OLQs) - 15 qualities
- Physical fitness requirements
- Psychological tests (TAT, WAT, SRT, SD)
- Group Testing (GD, GPE, PGT, HGT, CT, FGT)
- Personal interview preparation
- NDA, CDS, AFCAT, TES, ACC, SSC entries
- Medical standards and procedures`;

    console.log('Sending request to Lovable AI with real-time data...');

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
