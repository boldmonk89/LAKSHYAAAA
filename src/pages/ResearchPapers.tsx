import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sampleResearchPapers } from "@/data/defenceArticles";
import { FileText, Download, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollProgress from "@/components/ScrollProgress";

const ResearchPapers = () => {
  return (
    <main className="min-h-screen bg-background">
      <ScrollProgress />
      
      <header className="border-b border-border/50 glass-strong sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/analysis" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Defence Analysis
          </Link>
          <h1 className="text-lg font-bold text-gradient">Research Papers</h1>
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Home
          </Link>
        </div>
      </header>

      <section className="py-16 px-4 border-b border-border/20">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4 font-medium">Academic Research</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Research <span className="text-gradient">Papers</span></h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Original research papers on defence strategy, maritime security, and military technology.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-3xl space-y-6">
          {sampleResearchPapers.map((paper) => (
            <Card key={paper.id} className="border-border/30 bg-card/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">{paper.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      Author: {paper.author} &nbsp;|&nbsp; Year: {paper.year}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">{paper.abstract}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {paper.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                        ))}
                      </div>
                      <Button variant="outline" size="sm" className="text-xs" disabled={paper.pdfUrl === "#"}>
                        <Download className="w-3 h-3 mr-1" />
                        {paper.pdfUrl === "#" ? "Coming Soon" : "Download PDF"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-border/30 text-center">
        <p className="text-xs text-muted-foreground">© 2026 Lakshya Defence Analysis. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default ResearchPapers;
