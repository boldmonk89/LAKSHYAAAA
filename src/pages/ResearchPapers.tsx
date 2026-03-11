import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sampleResearchPapers } from "@/data/defenceArticles";
import { FileText, Download, ArrowLeft, Upload, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ScrollProgress from "@/components/ScrollProgress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CommunityPaper {
  id: string;
  title: string;
  author_name: string;
  year: number;
  summary: string | null;
  file_path: string;
  tags: string[];
  created_at: string;
}

const ResearchPapers = () => {
  const [communityPapers, setCommunityPapers] = useState<CommunityPaper[]>([]);
  const [uploading, setUploading] = useState(false);
  const [summarizing, setSummarizing] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [paperTitle, setPaperTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchCommunityPapers();
    // Trigger daily paper generation (idempotent - won't duplicate)
    supabase.functions.invoke("generate-daily-paper", {}).catch(console.error);
  }, []);

  const fetchCommunityPapers = async () => {
    const { data } = await supabase
      .from("research_papers")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setCommunityPapers(data as CommunityPaper[]);
  };

  const getPublicUrl = (path: string) => {
    const { data } = supabase.storage.from("research-papers").getPublicUrl(path);
    return data.publicUrl;
  };

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const handleUpload = async () => {
    if (!selectedFile || !authorName.trim() || !paperTitle.trim()) {
      toast.error("Please fill in all fields and select a file");
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Please sign in to upload a research paper");
      return;
    }

    setUploading(true);
    try {
      // Upload file to storage
      const fileName = `${Date.now()}-${selectedFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from("research-papers")
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;

      // Try to get AI summary
      setSummarizing(true);
      let summary = null;
      let tags: string[] = [];

      try {
        const text = await readFileAsText(selectedFile);
        const { data: summaryData, error: fnError } = await supabase.functions.invoke("summarize-paper", {
          body: { text },
        });

        if (!fnError && summaryData && !summaryData.error) {
          summary = summaryData.summary || null;
          tags = summaryData.tags || [];
        }
      } catch (e) {
        console.warn("Summary generation failed, saving without summary:", e);
      }
      setSummarizing(false);

      // Save to database
      const { error: dbError } = await supabase.from("research_papers").insert({
        user_id: user.id,
        title: paperTitle.trim(),
        author_name: authorName.trim(),
        file_path: fileName,
        summary,
        tags,
      });

      if (dbError) throw dbError;

      toast.success("Research paper uploaded successfully!");
      setPaperTitle("");
      setAuthorName("");
      setSelectedFile(null);
      // Reset file input
      const fileInput = document.getElementById("paper-upload") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      fetchCommunityPapers();
    } catch (e: any) {
      console.error("Upload error:", e);
      toast.error(e.message || "Failed to upload paper");
    } finally {
      setUploading(false);
      setSummarizing(false);
    }
  };

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

      {/* Hero */}
      <section className="py-16 px-4 border-b border-border/20">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4 font-medium">Academic Research</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Research <span className="text-gradient">Papers</span></h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Original research papers on defence strategy, maritime security, and military technology. Upload yours and get an AI-generated summary.
          </p>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-10 px-4 border-b border-border/20">
        <div className="container mx-auto max-w-3xl">
          <Card className="glass-premium border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Upload className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold">Upload Your Research Paper</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Upload your paper and our AI will automatically generate a summary for the community to read.
              </p>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Paper Title"
                    value={paperTitle}
                    onChange={(e) => setPaperTitle(e.target.value)}
                    className="bg-background/50"
                  />
                  <Input
                    placeholder="Author Name"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="bg-background/50"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <Input
                    id="paper-upload"
                    type="file"
                    accept=".pdf,.docx,.doc,.txt"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    className="bg-background/50 flex-1"
                  />
                  <Button
                    onClick={handleUpload}
                    disabled={uploading || !selectedFile || !authorName.trim() || !paperTitle.trim()}
                    className="bg-primary hover:bg-primary-glow"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {summarizing ? "Summarizing..." : "Uploading..."}
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" /> Upload
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Our Research Papers */}
      <section className="py-12 px-4 border-b border-border/20">
        <div className="container mx-auto max-w-3xl">
          <h3 className="text-xs uppercase tracking-[0.2em] text-primary mb-8 font-medium">Lakshya Research</h3>
          <div className="space-y-6">
            {sampleResearchPapers.map((paper) => (
              <Card key={paper.id} className="glass-premium border-border/30">
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
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex gap-2 flex-wrap">
                          {paper.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                          ))}
                        </div>
                        {paper.pdfUrl !== "#" ? (
                          <a href={paper.pdfUrl} download>
                            <Button variant="outline" size="sm" className="text-xs">
                              <Download className="w-3 h-3 mr-1" /> Download
                            </Button>
                          </a>
                        ) : (
                          <Button variant="outline" size="sm" className="text-xs" disabled>
                            Coming Soon
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Papers */}
      {communityPapers.length > 0 && (
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-3xl">
            <h3 className="text-xs uppercase tracking-[0.2em] text-primary mb-8 font-medium">Community Research</h3>
            <div className="space-y-6">
              {communityPapers.map((paper) => (
                <Card key={paper.id} className="glass-premium border-border/30">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-accent-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-1">{paper.title}</h3>
                        <p className="text-xs text-muted-foreground mb-3">
                          Author: {paper.author_name} &nbsp;|&nbsp; Year: {paper.year}
                        </p>
                        {paper.summary && (
                          <div className="mb-4 p-4 rounded-lg bg-muted/30 border border-border/20">
                            <div className="flex items-center gap-1.5 mb-2">
                              <Sparkles className="w-3.5 h-3.5 text-primary" />
                              <span className="text-[10px] uppercase tracking-wider text-primary font-medium">AI Summary</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{paper.summary}</p>
                          </div>
                        )}
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex gap-2 flex-wrap">
                            {paper.tags?.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                            ))}
                          </div>
                          <a href={getPublicUrl(paper.file_path)} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm" className="text-xs">
                              <Download className="w-3 h-3 mr-1" /> Download
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="py-8 px-4 border-t border-border/30 text-center">
        <p className="text-xs text-muted-foreground">© 2026 Lakshya Defence Analysis. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default ResearchPapers;
