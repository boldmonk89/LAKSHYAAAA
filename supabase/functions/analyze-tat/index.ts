import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { story, imageData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Analyzing TAT story with Gemini...");

    const systemPrompt = `You are an expert SSB (Services Selection Board) psychologist specializing in TAT (Thematic Apperception Test) analysis. Your role is to analyze stories written by defense aspirants and provide constructive feedback based on Officer Like Qualities (OLQs).

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
            text: story ? `Please analyze this TAT story: ${story}` : "Please analyze the TAT story shown in this image."
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
        content: `Please analyze this TAT story: ${story}`
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages,
        temperature: 0.7,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please contact support." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "Failed to analyze story" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const analysisText = data.choices?.[0]?.message?.content;
    
    if (!analysisText) {
      throw new Error("No analysis received from AI");
    }

    console.log("Analysis completed successfully");
    
    // Parse the JSON response
    const analysis = JSON.parse(analysisText);

    return new Response(
      JSON.stringify({ analysis }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in analyze-tat function:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
