import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Lightbulb, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const PiqAnalyzer = () => {
  const [piqDescription, setPiqDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdf(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!piqDescription.trim() && !image && !pdf) {
      toast.error("Please provide a PIQ description, upload an image, or upload a PDF");
      return;
    }

    setIsAnalyzing(true);
    try {
      let imageData = null;
      let pdfData = null;
      
      if (image) {
        const reader = new FileReader();
        imageData = await new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(image);
        });
      }

      if (pdf) {
        const reader = new FileReader();
        pdfData = await new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(pdf);
        });
      }

      const { data, error } = await supabase.functions.invoke('analyze-piq', {
        body: {
          description: piqDescription,
          image: imageData,
          pdf: pdfData
        }
      });

      if (error) throw error;

      setAnalysis(data.analysis);
      toast.success("PIQ analysis complete!");
    } catch (error) {
      console.error('Error:', error);
      toast.error("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section id="piq-analyzer" className="relative py-20 px-4 bg-gradient-to-b from-secondary/20 to-background">
      <div className="relative z-20 container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            PIQ Analyzer
          </h2>
          <p className="text-lg text-muted-foreground">
            Get AI-powered suggestions to improve your Picture Interpretation Quality
          </p>
        </div>

        <Card className="border-2 border-primary/20 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-6 h-6" />
              Improve Your PIQ Skills
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Describe your PIQ or upload an image
              </label>
              <Textarea
                value={piqDescription}
                onChange={(e) => setPiqDescription(e.target.value)}
                placeholder="Describe what you see in the picture or what story you would write..."
                className="min-h-[120px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Upload PIQ image (optional)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="piq-upload"
                />
                <label htmlFor="piq-upload">
                  <Button type="button" variant="outline" asChild>
                    <span className="cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                    </span>
                  </Button>
                </label>
                {image && (
                  <span className="text-sm text-muted-foreground">
                    {image.name}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Or upload PIQ PDF (2 pages)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfUpload}
                  className="hidden"
                  id="piq-pdf-upload"
                />
                <label htmlFor="piq-pdf-upload">
                  <Button type="button" variant="outline" asChild>
                    <span className="cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload PDF
                    </span>
                  </Button>
                </label>
                {pdf && (
                  <span className="text-sm text-muted-foreground">
                    {pdf.name}
                  </span>
                )}
              </div>
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Analyze PIQ
                </>
              )}
            </Button>

            {analysis && (
              <div className="mt-6 p-6 bg-secondary/50 rounded-lg space-y-4">
                <h3 className="font-bold text-lg">Analysis Results</h3>
                
                <div>
                  <h4 className="font-semibold text-primary mb-2">Strengths:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {analysis.strengths?.map((strength: string, idx: number) => (
                      <li key={idx} className="text-sm">{strength}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-accent mb-2">Areas to Improve:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {analysis.improvements?.map((improvement: string, idx: number) => (
                      <li key={idx} className="text-sm">{improvement}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-primary mb-2">Suggestions:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {analysis.suggestions?.map((suggestion: string, idx: number) => (
                      <li key={idx} className="text-sm">{suggestion}</li>
                    ))}
                  </ul>
                </div>

                {analysis.howToImprove && (
                  <div className="mt-4 p-4 bg-primary/10 rounded border border-primary/20">
                    <h4 className="font-semibold mb-2">How to Improve:</h4>
                    <p className="text-sm">{analysis.howToImprove}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PiqAnalyzer;
