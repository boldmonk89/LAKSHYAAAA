const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const CHANNEL_ID = "UC7BlGXgaOjnKGphm_HCRxhA";
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

interface YouTubeVideo {
  title: string;
  videoId: string;
  thumbnail: string;
  pubDate: string;
  description: string;
}

function parseYouTubeRSS(xml: string): YouTubeVideo[] {
  const videos: YouTubeVideo[] = [];
  const entries = xml.match(/<entry>([\s\S]*?)<\/entry>/g) || [];

  for (const entry of entries.slice(0, 15)) {
    try {
      const titleMatch = entry.match(/<title>(.*?)<\/title>/);
      const videoIdMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
      const pubDateMatch = entry.match(/<published>(.*?)<\/published>/);
      const descMatch = entry.match(/<media:description>([\s\S]*?)<\/media:description>/);

      const title = titleMatch?.[1]?.trim();
      const videoId = videoIdMatch?.[1]?.trim();
      const pubDate = pubDateMatch?.[1]?.trim();

      if (title && videoId) {
        videos.push({
          title: title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"'),
          videoId,
          thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          pubDate: pubDate || new Date().toISOString(),
          description: descMatch?.[1]?.trim().slice(0, 200) || '',
        });
      }
    } catch {
      continue;
    }
  }

  return videos;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const response = await fetch(RSS_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Bot/1.0)' },
    });

    if (!response.ok) {
      throw new Error(`YouTube RSS fetch failed: ${response.status}`);
    }

    const xml = await response.text();
    const videos = parseYouTubeRSS(xml);

    return new Response(
      JSON.stringify({ success: true, videos, total: videos.length }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Failed to fetch videos' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
