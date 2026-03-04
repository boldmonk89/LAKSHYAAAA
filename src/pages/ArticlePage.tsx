import { useParams, Link } from "react-router-dom";
import { sampleArticles, categories } from "@/data/defenceArticles";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowLeft, ExternalLink } from "lucide-react";
import ScrollProgress from "@/components/ScrollProgress";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ArticlePage = () => {
  const { slug } = useParams();
  const article = sampleArticles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <Link to="/analysis" className="text-primary hover:underline">← Back to Analysis</Link>
        </div>
      </main>
    );
  }

  const category = categories.find((c) => c.id === article.category);

  return (
    <main className="min-h-screen bg-background">
      <ScrollProgress />
      
      {/* Nav */}
      <header className="border-b border-border/50 glass-strong sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/analysis" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <span className="text-xs text-muted-foreground">{category?.label}</span>
        </div>
      </header>

      {/* Article Header */}
      <section className="py-16 px-4 border-b border-border/20">
        <div className="container mx-auto max-w-3xl">
          <Badge variant="outline" className="mb-4 border-primary/40 text-primary text-xs">{category?.label}</Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">{article.title}</h1>
          <p className="text-lg text-muted-foreground mb-8">{article.excerpt}</p>
          
          <div className="flex items-center gap-4 pb-6 border-b border-border/20">
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold">
              L
            </div>
            <div>
              <p className="text-sm font-medium">{article.author}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{new Date(article.publishDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readingTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <article className="prose prose-invert prose-sm max-w-none
            prose-headings:text-foreground prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
            prose-strong:text-foreground
            prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-blockquote:italic prose-blockquote:bg-muted/30 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
            prose-ul:text-muted-foreground prose-ol:text-muted-foreground
            prose-li:mb-1
            prose-table:text-sm
            prose-th:text-foreground prose-th:bg-muted/50 prose-th:px-4 prose-th:py-2 prose-th:text-left
            prose-td:text-muted-foreground prose-td:px-4 prose-td:py-2 prose-td:border-b prose-td:border-border/30
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
          </article>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-12 pt-6 border-t border-border/20">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>

          {/* Sources */}
          {article.sources.length > 0 && (
            <div className="mt-8 p-6 bg-muted/30 rounded-lg border border-border/30">
              <h3 className="text-sm font-bold mb-4 uppercase tracking-wider">Sources & References</h3>
              <ul className="space-y-2">
                {article.sources.map((source, i) => (
                  <li key={i}>
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Author Bio */}
          <div className="mt-8 p-6 bg-card/50 rounded-lg border border-border/30 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold text-xl flex-shrink-0">
              L
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">{article.author}</p>
              <p className="text-xs text-muted-foreground">{article.authorBio}</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-border/30 text-center">
        <Link to="/analysis" className="text-sm text-primary hover:underline">← More Analysis</Link>
      </footer>
    </main>
  );
};

export default ArticlePage;
