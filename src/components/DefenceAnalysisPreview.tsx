import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sampleArticles, categories } from "@/data/defenceArticles";
import { Clock, ArrowRight, Shield } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const DefenceAnalysisPreview = () => {
  const { ref, isVisible } = useScrollAnimation();
  const latestArticles = sampleArticles.slice(0, 3);
  const featured = sampleArticles.find((a) => a.featured);

  return (
    <section ref={ref} id="defence-analysis" className={`relative z-10 py-20 px-4 scroll-fade-up ${isVisible ? "visible" : ""}`}>
      <div className="container mx-auto max-w-5xl relative z-20">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium">New</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-3 text-gradient glow">
            Defence Analysis
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            In-depth military strategy, maritime security, and geopolitical analysis.
          </p>
        </div>

        {/* Featured */}
        {featured && (
          <Link to={`/analysis/${featured.slug}`} className="block mb-8">
            <Card className="group border-primary/30 hover:border-primary/60 transition-all bg-card/50">
              <CardContent className="p-6 md:p-8">
                <Badge className="mb-3 bg-primary/20 text-primary border-primary/40 text-[10px]">Featured</Badge>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{featured.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{featured.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {featured.readingTime} min</span>
                  <span>•</span>
                  <span>{new Date(featured.publishDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                  <span className="ml-auto text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read Analysis <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        )}

        {/* Latest */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {latestArticles.filter(a => a.id !== featured?.id).slice(0, 3).map((article) => (
            <Link key={article.id} to={`/analysis/${article.slug}`}>
              <Card className="group border-border/30 hover:border-primary/40 transition-all h-full bg-card/30">
                <CardContent className="p-5">
                  <Badge variant="outline" className="mb-2 text-[10px] border-border/50">
                    {categories.find((c) => c.id === article.category)?.label}
                  </Badge>
                  <h4 className="text-sm font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">{article.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center gap-2 mt-3 text-[10px] text-muted-foreground">
                    <Clock className="w-3 h-3" /> {article.readingTime} min
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link to="/analysis" className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium">
            View All Analysis <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DefenceAnalysisPreview;
