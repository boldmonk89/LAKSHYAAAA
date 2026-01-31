import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";
import { Newspaper, Globe, MapPin, ExternalLink, RefreshCw } from "lucide-react";

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  category: 'national' | 'international';
}

const DailyNews = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'national' | 'international'>('all');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: fetchError } = await supabase.functions.invoke('fetch-news');
      
      if (fetchError) throw fetchError;
      
      if (data?.success && data?.news) {
        setNews(data.news);
        setLastUpdated(new Date());
      } else {
        throw new Error(data?.error || 'Failed to fetch news');
      }
    } catch (err: any) {
      console.error('Error fetching news:', err);
      setError('Unable to load news. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    
    // Auto-refresh every hour
    const interval = setInterval(fetchNews, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredNews = news.filter(item => 
    filter === 'all' || item.category === filter
  );

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '';
    }
  };

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className="relative z-20 py-16 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`scroll-fade-up ${isVisible ? "visible" : ""}`}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Newspaper className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-gradient">
                Daily News Headlines
              </h2>
            </div>
            <p className="text-muted-foreground text-lg mb-2">{today}</p>
            {lastUpdated && (
              <p className="text-sm text-muted-foreground">
                Last updated: {lastUpdated.toLocaleTimeString('en-IN')}
              </p>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className="gap-2"
            >
              <Newspaper className="w-4 h-4" />
              All News
            </Button>
            <Button
              variant={filter === 'national' ? 'default' : 'outline'}
              onClick={() => setFilter('national')}
              className="gap-2"
            >
              <MapPin className="w-4 h-4" />
              National
            </Button>
            <Button
              variant={filter === 'international' ? 'default' : 'outline'}
              onClick={() => setFilter('international')}
              className="gap-2"
            >
              <Globe className="w-4 h-4" />
              International
            </Button>
            <Button
              variant="ghost"
              onClick={fetchNews}
              disabled={loading}
              className="gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {/* News Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="glass-premium p-4">
                  <Skeleton className="h-4 w-20 mb-3" />
                  <Skeleton className="h-5 w-full mb-2" />
                  <Skeleton className="h-5 w-3/4 mb-3" />
                  <Skeleton className="h-3 w-32" />
                </Card>
              ))}
            </div>
          ) : error ? (
            <Card className="glass-premium p-8 text-center">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={fetchNews} variant="outline">
                Try Again
              </Button>
            </Card>
          ) : filteredNews.length === 0 ? (
            <Card className="glass-premium p-8 text-center">
              <p className="text-muted-foreground">No news available for this category.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNews.slice(0, 15).map((item, index) => (
                <Card
                  key={index}
                  className="glass-premium p-4 group cursor-pointer hover:border-primary/50 transition-all duration-300"
                  onClick={() => window.open(item.link, '_blank')}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <Badge 
                      variant={item.category === 'national' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {item.category === 'national' ? (
                        <><MapPin className="w-3 h-3 mr-1" /> National</>
                      ) : (
                        <><Globe className="w-3 h-3 mr-1" /> International</>
                      )}
                    </Badge>
                    <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <h3 className="font-semibold text-foreground mb-3 line-clamp-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-medium">{item.source}</span>
                    <span>{formatDate(item.pubDate)}</span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DailyNews;
