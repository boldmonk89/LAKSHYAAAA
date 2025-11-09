import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Brain, Lightbulb, Target, Upload, RefreshCw } from "lucide-react";
import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import backgroundImage from "@/assets/lakshya-background.jpg";
import tat1 from "@/assets/tat-1.jpg";
import tat2 from "@/assets/tat-2.jpg";
import tat3 from "@/assets/tat-3.jpg";
import tat4 from "@/assets/tat-4.jpg";
import tat5 from "@/assets/tat-5.jpg";
import tat6 from "@/assets/tat-6.jpg";
import tat7 from "@/assets/tat-7.jpg";
import tat8 from "@/assets/tat-8.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PsychAnalysis {
  olqsIdentified: string[];
  strengths: string[];
  improvements: string[];
  detailedFeedback: string;
  suggestions: string[];
  howToImprove: string;
}

const tatImages = [tat1, tat2, tat3, tat4, tat5, tat6, tat7, tat8];

const AIPsychAnalyzer = () => {
  const [tatStory, setTatStory] = useState("");
  const [watWord, setWatWord] = useState("");
  const [srtSituation, setSrtSituation] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<PsychAnalysis | null>(null);
  const [activeTest, setActiveTest] = useState<'tat' | 'wat' | 'srt'>('tat');
  const [currentTatImage, setCurrentTatImage] = useState(0);
  const [uploadedTATImage, setUploadedTATImage] = useState<File | null>(null);
  const [uploadedStoryImage, setUploadedStoryImage] = useState<File | null>(null);
  const [analyzeInHindi, setAnalyzeInHindi] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const storyInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();


  const handleTATImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedTATImage(file);
      toast({
        title: "TAT Image Uploaded",
        description: `${file.name} ready for analysis`,
      });
    }
  };

  const handleStoryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedStoryImage(file);
      toast({
        title: "Story Image Uploaded",
        description: `${file.name} ready for analysis`,
      });
    }
  };

  const handleAnalyze = async () => {
    const content = activeTest === 'tat' ? tatStory : activeTest === 'wat' ? watWord : srtSituation;
    
    if (!content.trim() && !uploadedTATImage && !uploadedStoryImage) {
      toast({
        title: "Input Required",
        description: `Please write your ${activeTest.toUpperCase()} response or upload images.`,
        variant: "destructive",
      });
      return;
    }

    // Word count validation
    if (content.trim()) {
      const wordCount = content.trim().split(/\s+/).length;
      if (wordCount > 500) {
        toast({
          title: "Word Limit Exceeded",
          description: "Please keep your response under 500 words.",
          variant: "destructive",
        });
        return;
      }
    }
    
    setIsAnalyzing(true);
    setAnalysis(null);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-psych', {
        body: { 
          testType: activeTest,
          content: content.trim(),
          language: analyzeInHindi ? 'hindi' : 'english'
        }
      });

      if (error) {
        console.error("Error analyzing:", error);
        toast({
          title: "Analysis Failed",
          description: error.message || "Failed to analyze. Please try again.",
          variant: "destructive",
        });
        return;
      }

      if (data?.analysis) {
        setAnalysis(data.analysis);
        toast({
          title: "Analysis Complete!",
          description: "Your response has been analyzed based on SSB OLQs.",
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

  return (
    <section id="ai-psych-analyzer" className="relative py-24 px-4 overflow-hidden">
      {/* Fixed Background Image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      
      {/* Overlay - 90% opacity, 2% blur */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
            AI Psych Analyzer
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get instant AI-powered OLQ analysis for TAT, WAT & SRT tests
          </p>
        </div>

        {/* Test Type Selector */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            onClick={() => setActiveTest('tat')}
            variant={activeTest === 'tat' ? 'default' : 'outline'}
            className={activeTest === 'tat' ? 'bg-primary hover:bg-primary-glow' : ''}
          >
            TAT
          </Button>
          <Button
            onClick={() => setActiveTest('wat')}
            variant={activeTest === 'wat' ? 'default' : 'outline'}
            className={activeTest === 'wat' ? 'bg-primary hover:bg-primary-glow' : ''}
          >
            WAT
          </Button>
          <Button
            onClick={() => setActiveTest('srt')}
            variant={activeTest === 'srt' ? 'default' : 'outline'}
            className={activeTest === 'srt' ? 'bg-primary hover:bg-primary-glow' : ''}
          >
            SRT
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Input */}
          <Card className="glass-premium p-6 card-glow">
            <h3 className="text-2xl font-bold text-gradient mb-4">
              {activeTest === 'tat' && 'TAT Story'}
              {activeTest === 'wat' && 'WAT Response'}
              {activeTest === 'srt' && 'SRT Response'}
            </h3>

            {activeTest === 'tat' ? (
              <Tabs defaultValue="type" className="mb-4">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="type">Type Story</TabsTrigger>
                  <TabsTrigger value="upload">Upload TAT & Story</TabsTrigger>
                </TabsList>
                
                <TabsContent value="type">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <img 
                        src={tatImages[currentTatImage]} 
                        alt="TAT Picture" 
                        className="w-full rounded-lg mb-2"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentTatImage((prev) => (prev + 1) % tatImages.length)}
                      className="w-full mb-4"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      New TAT Image
                    </Button>
                    <Textarea
                      value={tatStory}
                      onChange={(e) => setTatStory(e.target.value)}
                      placeholder="Write a story about this picture (what led to this, what's happening, what will happen next)..."
                      className="bg-background/50 min-h-[200px]"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      {tatStory.split(/\s+/).filter(w => w).length}/500 words
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="upload">
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleTATImageUpload}
                        className="hidden"
                        id="TAT-upload"
                      />
                      <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground mb-4">
                        Upload TAT Image
                      </p>
                      <label htmlFor="TAT-upload">
                        <Button variant="outline" asChild>
                          <span className="cursor-pointer">Choose TAT Image</span>
                        </Button>
                      </label>
                      {uploadedTATImage && (
                        <p className="text-sm text-primary mt-2">
                          Uploaded: {uploadedTATImage.name}
                        </p>
                      )}
                    </div>
                    
                    <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleStoryImageUpload}
                        className="hidden"
                        id="story-upload"
                      />
                      <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground mb-4">
                        Upload Handwritten Story Image
                      </p>
                      <label htmlFor="story-upload">
                        <Button variant="outline" asChild>
                          <span className="cursor-pointer">Choose Story Image</span>
                        </Button>
                      </label>
                      {uploadedStoryImage && (
                        <p className="text-sm text-primary mt-2">
                          Uploaded: {uploadedStoryImage.name}
                        </p>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="mb-4">

                {activeTest === 'wat' && (
                  <div>
                    <p className="text-sm text-yellow-500 mb-3 bg-yellow-500/10 p-3 rounded border border-yellow-500/30">
                      ⚠️ SSB Tip: Write observational sentences (5-6 words max). Never use I, We, They, He, She!
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Example word: <span className="text-primary font-semibold">DISCIPLINE</span><br />
                      ✅ CORRECT: "Discipline builds strong character"<br />
                      ❌ WRONG: "I think discipline is important"
                    </p>
                    <Textarea
                      value={watWord}
                      onChange={(e) => setWatWord(e.target.value)}
                      placeholder="Type your word and observational sentence (e.g., Courage overcomes fear)..."
                      className="bg-background/50 min-h-[150px]"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      {watWord.split(/\s+/).filter(w => w).length} words
                    </p>
                  </div>
                )}

                {activeTest === 'srt' && (
                  <div>
                    <p className="text-sm text-yellow-500 mb-3 bg-yellow-500/10 p-3 rounded border border-yellow-500/30">
                      ⚠️ SSB Tip: Write action-oriented response. Use "I will..." to show initiative!
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Example: <span className="text-primary font-semibold">Friend cheating in exam</span><br />
                      ✅ CORRECT: "I will politely refuse and explain importance of exam ethics"<br />
                      ❌ WRONG: "I will wait and see what happens"
                    </p>
                    <Textarea
                      value={srtSituation}
                      onChange={(e) => setSrtSituation(e.target.value)}
                      placeholder="Type the situation and your response (e.g., I will immediately...)..."
                      className="bg-background/50 min-h-[150px]"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      {srtSituation.split(/\s+/).filter(w => w).length} words
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                id="hindi"
                checked={analyzeInHindi}
                onChange={(e) => setAnalyzeInHindi(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="hindi" className="text-sm text-muted-foreground">
                Analyze in Hindi (हिंदी में विश्लेषण करें)
              </label>
            </div>

            <Button 
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full bg-primary hover:bg-primary-glow shadow-glow transition-all duration-300"
            >
              {isAnalyzing ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Analyze Based on OLQs
                </>
              )}
            </Button>
          </Card>

          {/* Right Side - Analysis */}
          <Card className="glass-premium p-6 card-glow">
            <h3 className="text-2xl font-bold text-foreground mb-4">OLQ Analysis</h3>
            
            {!analysis && !isAnalyzing && (
              <div className="text-center py-12">
                <Brain className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Write your response and click analyze to get detailed OLQ-based feedback
                </p>
              </div>
            )}

            {isAnalyzing && (
              <div className="text-center py-12">
                <Sparkles className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
                <p className="text-muted-foreground">
                  AI is analyzing your response based on SSB OLQs...
                </p>
              </div>
            )}

            {analysis && (
              <div className="space-y-6">
                {/* OLQs Identified */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold text-foreground">OLQs Identified</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {analysis.olqsIdentified.map((olq, idx) => (
                      <span key={idx} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                        {olq}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Strengths */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-green-500" />
                    <h4 className="font-semibold text-foreground">Strengths</h4>
                  </div>
                  <ul className="space-y-2">
                    {analysis.strengths.map((strength, idx) => (
                      <li key={idx} className="text-sm text-foreground/80 flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Areas for Improvement */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    <h4 className="font-semibold text-foreground">Areas for Improvement</h4>
                  </div>
                  <ul className="space-y-2">
                    {analysis.improvements.map((improvement, idx) => (
                      <li key={idx} className="text-sm text-foreground/80 flex items-start gap-2">
                        <span className="text-yellow-500">⚠</span>
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Detailed Feedback */}
                <div className="border-t border-border pt-4">
                  <h4 className="font-semibold text-foreground mb-2">Detailed Feedback</h4>
                  <p className="text-sm text-foreground/80 whitespace-pre-wrap">
                    {analysis.detailedFeedback}
                  </p>
                </div>

                {/* How to Improve */}
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <h4 className="font-semibold text-primary mb-2">💡 How to Make it Perfect</h4>
                  <p className="text-sm text-foreground/80 whitespace-pre-wrap">
                    {analysis.howToImprove}
                  </p>
                </div>

                {/* Suggestions */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Recommendations</h4>
                  <ul className="space-y-2">
                    {analysis.suggestions.map((suggestion, idx) => (
                      <li key={idx} className="text-sm text-foreground/80 flex items-start gap-2">
                        <span className="text-primary">→</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Motivational Line */}
        <div className="mt-8 max-w-3xl mx-auto">
          <div className="glass-premium p-6 rounded-lg border border-primary/30 backdrop-blur-md bg-black/20">
            <p className="text-lg md:text-xl font-semibold text-gradient mb-2 text-center">
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

export default AIPsychAnalyzer;
