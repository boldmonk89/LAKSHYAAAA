const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  category: 'national' | 'international';
}

// RSS feed sources
const RSS_FEEDS = [
  { url: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms', source: 'Times of India', category: 'national' as const },
  { url: 'https://feeds.feedburner.com/ndtvnews-india-news', source: 'NDTV India', category: 'national' as const },
  { url: 'https://feeds.bbci.co.uk/news/world/rss.xml', source: 'BBC World', category: 'international' as const },
  { url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml', source: 'NY Times', category: 'international' as const },
];

function parseRSSItem(item: string, source: string, category: 'national' | 'international'): NewsItem | null {
  try {
    const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/s);
    const linkMatch = item.match(/<link><!\[CDATA\[(.*?)\]\]><\/link>|<link>(.*?)<\/link>/s);
    const pubDateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/s);
    
    const title = titleMatch ? (titleMatch[1] || titleMatch[2])?.trim() : null;
    const link = linkMatch ? (linkMatch[1] || linkMatch[2])?.trim() : null;
    const pubDate = pubDateMatch ? pubDateMatch[1]?.trim() : new Date().toISOString();
    
    if (!title || !link) return null;
    
    return {
      title: title.replace(/<[^>]*>/g, '').trim(),
      link,
      pubDate,
      source,
      category,
    };
  } catch {
    return null;
  }
}

function parseRSS(xml: string, source: string, category: 'national' | 'international'): NewsItem[] {
  const items: NewsItem[] = [];
  const itemMatches = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];
  
  for (const itemXml of itemMatches.slice(0, 10)) { // Limit to 10 items per source
    const parsed = parseRSSItem(itemXml, source, category);
    if (parsed) {
      items.push(parsed);
    }
  }
  
  return items;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const allNews: NewsItem[] = [];
    
    // Fetch from all RSS feeds in parallel
    const feedPromises = RSS_FEEDS.map(async (feed) => {
      try {
        const response = await fetch(feed.url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)',
          },
        });
        
        if (!response.ok) {
          console.log(`Failed to fetch ${feed.source}: ${response.status}`);
          return [];
        }
        
        const xml = await response.text();
        return parseRSS(xml, feed.source, feed.category);
      } catch (error) {
        console.error(`Error fetching ${feed.source}:`, error);
        return [];
      }
    });
    
    const results = await Promise.all(feedPromises);
    results.forEach(items => allNews.push(...items));
    
    // Sort by date (newest first)
    allNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    
    // Group by date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayNews = allNews.filter(item => {
      const itemDate = new Date(item.pubDate);
      itemDate.setHours(0, 0, 0, 0);
      return itemDate.getTime() === today.getTime();
    });
    
    // If no news from today, show latest news
    const newsToShow = todayNews.length > 0 ? todayNews : allNews.slice(0, 20);
    
    return new Response(
      JSON.stringify({
        success: true,
        date: today.toISOString(),
        news: newsToShow,
        total: newsToShow.length,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching news:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to fetch news' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
