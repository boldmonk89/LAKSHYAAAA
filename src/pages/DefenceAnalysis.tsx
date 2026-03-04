import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sampleArticles, categories, authorProfile, type Article } from "@/data/defenceArticles";
import { Globe, Anchor, Shield, Cpu, MapPin, Clock, ArrowRight, ChevronRight } from "lucide-react";
import ScrollProgress from "@/components/ScrollProgress";

const iconMap: Record<string, any> = { Globe, Anchor, Shield, Cpu, MapPin };

const DefenceAnalysis = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredArticles = activeCategory
    ? sampleArticles.filter((a) => a.category === activeCategory)
    : sampleArticles;

  const featuredArticles = sampleArticles.filter((a) => a.featured);

  return (
    <main className="min-h-screen bg-background">
      <ScrollProgress />
      
      {/* Header */}
      <header className="border-b border-border/50 glass-strong sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
            ← Back to Home
          </Link>
          <h1 className="text-lg font-bold text-gradient">Lakshya Defence Analysis</h1>
          <Link to="/research" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Research Papers
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-4 border-b border-border/30">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4 font-medium">Strategic Research & Analysis</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Defence <span className="text-gradient">Analysis</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            In-depth military strategy, maritime security research, and geopolitical analysis 
            from a defence enthusiast's perspective.
          </p>
        </div>
      </section>

      {/* Author */}
      <section className="py-8 px-4 border-b border-border/20">
        <div className="container mx-auto max-w-4xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold text-lg">
            L
          </div>
          <div>
            <p className="font-semibold text-sm">{authorProfile.name}</p>
            <p className="text-xs text-muted-foreground">{authorProfile.bio}</p>
          </div>
        </div>
      </section>

      {/* Featured */}
      {featuredArticles.length > 0 && (
        <section className="py-12 px-4 border-b border-border/20">
          <div className="container mx-auto max-w-5xl">
            <h3 className="text-xs uppercase tracking-[0.2em] text-primary mb-8 font-medium">Featured Analysis</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredArticles.map((article) => (
                <Link key={article.id} to={`/analysis/${article.slug}`}>
                  <Card className="group border-primary/20 hover:border-primary/50 transition-all duration-300 h-full bg-card/50">
                    <CardContent className="p-6">
                      <Badge variant="outline" className="mb-3 text-xs border-primary/40 text-primary">
                        {categories.find((c) => c.id === article.category)?.label}
                      </Badge>
                      <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                        {article.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {article.readingTime} min read
                        </span>
                        <span>{new Date(article.publishDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-8 px-4 border-b border-border/20">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${!activeCategory ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
            >
              All
            </button>
            {categories.map((cat) => {
              const Icon = iconMap[cat.icon];
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${activeCategory === cat.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
                >
                  {Icon && <Icon className="w-3 h-3" />}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-6">
            {filteredArticles.map((article) => (
              <Link key={article.id} to={`/analysis/${article.slug}`}>
                <article className="group border-b border-border/20 pb-6 hover:border-primary/30 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-[10px] border-border/50">
                          {categories.find((c) => c.id === article.category)?.label}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(article.publishDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{article.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {article.readingTime} min
                        </span>
                        <span className="text-xs text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/30 text-center">
        <p className="text-xs text-muted-foreground">© 2026 Lakshya Defence Analysis. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default DefenceAnalysis;
