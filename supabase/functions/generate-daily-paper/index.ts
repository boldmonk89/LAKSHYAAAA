import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Step 1: Delete papers older than 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const { data: oldPapers } = await supabase
      .from("research_papers")
      .select("id, file_path")
      .lt("created_at", thirtyDaysAgo.toISOString())
      .eq("author_name", "Lakshya AI Research");

    if (oldPapers && oldPapers.length > 0) {
      // Delete files from storage
      const filePaths = oldPapers.map(p => p.file_path);
      await supabase.storage.from("research-papers").remove(filePaths);
      
      // Delete from database
      const ids = oldPapers.map(p => p.id);
      await supabase.from("research_papers").delete().in("id", ids);
      console.log(`Cleaned up ${oldPapers.length} old papers`);
    }

    // Step 2: Check if we already generated a paper today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const { data: existingToday } = await supabase
      .from("research_papers")
      .select("id")
      .eq("author_name", "Lakshya AI Research")
      .gte("created_at", today.toISOString())
      .lt("created_at", tomorrow.toISOString());

    if (existingToday && existingToday.length > 0) {
      return new Response(
        JSON.stringify({ success: true, message: "Paper already generated today" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Step 3: Generate research paper using AI
    const dateStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a defence research analyst at Lakshya Defence Analysis. Write a detailed research paper (1500-2500 words) on a current affairs topic relevant to defence, military strategy, geopolitics, or national security. The paper should be well-structured with:
- Title
- Abstract (100-150 words)
- Introduction
- Analysis sections with subheadings
- Strategic implications
- Conclusion
- Key takeaways (bullet points)

Focus on topics like: India's defence modernization, global military conflicts, maritime security, Indo-Pacific strategy, border security, defence technology, geopolitical shifts, military exercises, defence procurement, cybersecurity threats, space warfare, nuclear deterrence, etc.

Pick a DIFFERENT topic each day. Today's date is ${dateStr}. Make it relevant to recent global events.`
          },
          {
            role: "user",
            content: `Write today's research paper (${dateStr}). Pick a trending defence/geopolitics topic from recent global developments.`
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "create_research_paper",
              description: "Create a structured research paper",
              parameters: {
                type: "object",
                properties: {
                  title: { type: "string", description: "Paper title" },
                  abstract: { type: "string", description: "100-150 word abstract" },
                  content: { type: "string", description: "Full paper content in markdown" },
                  tags: {
                    type: "array",
                    items: { type: "string" },
                    description: "3-5 relevant tags"
                  }
                },
                required: ["title", "abstract", "content", "tags"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "create_research_paper" } }
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, will retry later" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required" }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      throw new Error(`AI gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall) {
      throw new Error("No tool call in AI response");
    }

    const paper = JSON.parse(toolCall.function.arguments);

    // Step 4: Create text file content
    const fileContent = `# ${paper.title}\n\n## Abstract\n${paper.abstract}\n\n${paper.content}`;
    const fileName = `ai-daily/${dateStr.replace(/\s/g, '-').toLowerCase()}-${Date.now()}.md`;

    // Upload to storage
    const encoder = new TextEncoder();
    const { error: uploadError } = await supabase.storage
      .from("research-papers")
      .upload(fileName, encoder.encode(fileContent), {
        contentType: "text/markdown"
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw uploadError;
    }

    // Step 5: Save to database
    // Use a fixed system user ID for AI-generated papers
    const AI_USER_ID = "00000000-0000-0000-0000-000000000000";
    
    const { error: dbError } = await supabase.from("research_papers").insert({
      user_id: AI_USER_ID,
      title: paper.title,
      author_name: "Lakshya AI Research",
      file_path: fileName,
      summary: paper.abstract,
      tags: paper.tags,
    });

    if (dbError) {
      console.error("DB error:", dbError);
      throw dbError;
    }

    console.log(`Generated paper: ${paper.title}`);

    return new Response(
      JSON.stringify({ success: true, title: paper.title }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error generating paper:", error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
