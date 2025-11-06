import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, AlertCircle, Upload, Image as ImageIcon, RefreshCw } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import backgroundImage from "@/assets/lakshya-background.jpg";
import tat1 from "@/assets/tat-1.jpg";
import tat2 from "@/assets/tat-2.jpg";
import tat3 from "@/assets/tat-3.jpg";
import tat4 from "@/assets/tat-4.jpg";
import tat5 from "@/assets/tat-5.jpg";
import tat6 from "@/assets/tat-6.jpg";
import tat7 from "@/assets/tat-7.jpg";
import tat8 from "@/assets/tat-8.jpg";

const tatImages = [tat1, tat2, tat3, tat4, tat5, tat6, tat7, tat8];

interface TATAnalysis {
  overallScore: number;
  olqsIdentified: string[];
  strengths: string[];
  improvements: string[];
  detailedAnalysis: string;
  positiveThemes: string[];
  negativeThemes: string[];
  recommendation: string;
}

const TATAnalyzer = () => {
  const [story, setStory] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<TATAnalysis | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedStory, setUploadedStory] = useState<string | null>(null);
  const [currentTatImage, setCurrentTatImage] = useState(tatImages[0]);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!story.trim() && !uploadedStory) {
      toast({
        title: "Story Required",
        description: "Please write or upload your TAT story first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    setAnalysis(null);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-tat', {
        body: { 
          story: story.trim(),
          imageData: uploadedStory
        }
      });

      if (error) {
        console.error("Error analyzing story:", error);
        toast({
          title: "Analysis Failed",
          description: error.message || "Failed to analyze your story. Please try again.",
          variant: "destructive",
        });
        return;
      }

      if (data?.analysis) {
        setAnalysis(data.analysis);
        toast({
          title: "Analysis Complete!",
          description: "Your TAT story has been analyzed successfully.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'tat' | 'story') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'tat') {
          setUploadedImage(reader.result as string);
        } else {
          setUploadedStory(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const getRandomTatImage = () => {
    const randomIndex = Math.floor(Math.random() * tatImages.length);
    setCurrentTatImage(tatImages[randomIndex]);
  };

  return (
    <section id="tat-analyzer" className="relative py-24 px-4 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.75,
          filter: 'blur(8px)',
        }}
      />
      
      {/* Overlay - 10% opacity */}
      <div className="absolute inset-0 bg-black/10 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto">
        <div ref={(el) => {
          if (el && !el.dataset.observed) {
            el.dataset.observed = 'true';
            const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  entry.target.classList.add('visible');
                }
              });
            }, { threshold: 0.2 });
            observer.observe(el);
          }
        }} className="text-center mb-16 scroll-fade-up">
          <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
            AI TAT Story Analyzer
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Most students struggle with TAT and can't afford heavy coaching. Get instant AI-powered feedback on your stories.
          </p>
        </div>

        {/* TAT Test Section */}
        <Card ref={(el) => {
          if (el && !el.dataset.observed) {
            el.dataset.observed = 'true';
            const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  entry.target.classList.add('visible');
                }
              });
            }, { threshold: 0.2 });
            observer.observe(el);
          }
        }} className="glass-premium p-8 card-glow scroll-scale mb-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold text-foreground">
                  TAT Practice Test
                </h3>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={getRandomTatImage}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                New Picture
              </Button>
            </div>
            
            <div className="mb-6">
              <img 
                src={uploadedImage || currentTatImage} 
                alt="TAT Picture" 
                className="w-full max-h-96 object-contain rounded-lg border border-border"
              />
              <div className="mt-4">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'tat')}
                    className="hidden"
                  />
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Your Own TAT Picture
                    </span>
                  </Button>
                </label>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Write your story below (type or upload handwritten)
            </p>
            
            <Textarea 
              placeholder="Example: A young boy is looking at soldiers marching. He dreams of becoming an officer. He studies hard and prepares for NDA. Despite challenges, he never gives up. Finally, he clears the exam and joins the academy..."
              className="min-h-[200px] bg-background/50 border-border focus:border-primary resize-none"
              value={story}
              onChange={(e) => setStory(e.target.value)}
            />

            <div className="mt-4">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'story')}
                  className="hidden"
                />
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
                  <span>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Handwritten Story
                  </span>
                </Button>
              </label>
              {uploadedStory && (
                <div className="mt-4">
                  <img src={uploadedStory} alt="Uploaded Story" className="w-full rounded-lg border border-border" />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3 mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-foreground/80">
              <p className="font-semibold mb-1">AI will analyze:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• OLQ traits displayed (Leadership, Courage, etc.)</li>
                <li>• Story structure & coherence</li>
                <li>• Positive vs negative themes</li>
                <li>• Suggestions for improvement</li>
              </ul>
            </div>
          </div>

          <Button 
            className="w-full bg-primary hover:bg-primary-glow shadow-glow transition-all duration-300 hover:scale-105"
            onClick={handleAnalyze}
            disabled={(!story.trim() && !uploadedStory) || isAnalyzing}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {isAnalyzing ? "Analyzing..." : "Analyze with AI"}
          </Button>

          <p className="text-center text-xs text-muted-foreground mt-4">
            Free • Unlimited Usage • Powered by Google Gemini
          </p>
        </Card>

        {/* Analysis Results */}
        {analysis && (
          <Card className="glass-premium p-8 card-glow mt-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gradient">Analysis Results</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Overall Score:</span>
                  <span className="text-3xl font-bold text-primary">{analysis.overallScore}/10</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* OLQs Identified */}
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  OLQs Demonstrated
                </h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.olqsIdentified.map((olq, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-primary/20 border border-primary/40 rounded-full text-sm font-medium text-foreground"
                    >
                      {olq}
                    </span>
                  ))}
                </div>
              </div>

              {/* Strengths */}
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3">✓ Strengths</h4>
                <ul className="space-y-2">
                  {analysis.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2 text-foreground/80">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Areas for Improvement */}
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3">→ Areas for Improvement</h4>
                <ul className="space-y-2">
                  {analysis.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-2 text-foreground/80">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Detailed Analysis */}
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3">Detailed Analysis</h4>
                <p className="text-foreground/80 leading-relaxed">{analysis.detailedAnalysis}</p>
              </div>

              {/* Themes */}
              <div className="grid md:grid-cols-2 gap-6">
                {analysis.positiveThemes.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">Positive Themes</h4>
                    <ul className="space-y-2">
                      {analysis.positiveThemes.map((theme, index) => (
                        <li key={index} className="flex items-start gap-2 text-foreground/80">
                          <span className="text-green-500">✓</span>
                          {theme}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {analysis.negativeThemes.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">Areas to Watch</h4>
                    <ul className="space-y-2">
                      {analysis.negativeThemes.map((theme, index) => (
                        <li key={index} className="flex items-start gap-2 text-foreground/80">
                          <span className="text-yellow-500">!</span>
                          {theme}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Recommendation */}
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <h4 className="text-lg font-semibold text-foreground mb-2">Recommendation</h4>
                <p className="text-foreground/80">{analysis.recommendation}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Motivational Line */}
        <div ref={(el) => {
          if (el && !el.dataset.observed) {
            el.dataset.observed = 'true';
            const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  entry.target.classList.add('visible');
                }
              });
            }, { threshold: 0.2 });
            observer.observe(el);
          }
        }} className="scroll-fade-up mt-8 max-w-3xl mx-auto">
          <div className="glass-premium p-6 rounded-lg border border-primary/30 backdrop-blur-md bg-black/20">
            <p className="text-lg md:text-xl font-semibold text-foreground mb-2 text-center">
              Your story reveals your character, practice makes it perfect
            </p>
            <p className="text-base md:text-lg text-muted-foreground text-center italic">
              आपकी कहानी आपके चरित्र को प्रकट करती है, अभ्यास इसे परिपूर्ण बनाता है
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TATAnalyzer;
