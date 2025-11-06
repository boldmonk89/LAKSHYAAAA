import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Brain, Lightbulb, Target } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import backgroundImage from "@/assets/lakshya-background.jpg";
import tat1 from "@/assets/tat-1.jpg";

interface PsychAnalysis {
  olqsIdentified: string[];
  strengths: string[];
  improvements: string[];
  detailedFeedback: string;
  suggestions: string[];
  howToImprove: string;
}

const AIPsychAnalyzer = () => {
  const [tatStory, setTatStory] = useState("");
  const [watWord, setWatWord] = useState("");
  const [srtSituation, setSrtSituation] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<PsychAnalysis | null>(null);
  const [activeTest, setActiveTest] = useState<'tat' | 'wat' | 'srt'>('tat');
  const { toast } = useToast();

  const handleAnalyze = async () => {
    const content = activeTest === 'tat' ? tatStory : activeTest === 'wat' ? watWord : srtSituation;
    
    if (!content.trim()) {
      toast({
        title: "Input Required",
        description: `Please write your ${activeTest.toUpperCase()} response first.`,
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    setAnalysis(null);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-psych', {
        body: { 
          testType: activeTest,
          content: content.trim()
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
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {activeTest === 'tat' && 'Write Your TAT Story'}
              {activeTest === 'wat' && 'Write WAT Responses'}
              {activeTest === 'srt' && 'Write SRT Response'}
            </h3>

            {activeTest === 'tat' && (
              <div className="mb-4">
                <img 
                  src={tat1} 
                  alt="TAT Picture" 
                  className="w-full rounded-lg mb-4"
                />
                <Textarea
                  value={tatStory}
                  onChange={(e) => setTatStory(e.target.value)}
                  placeholder="Write a story about this picture (what led to this, what's happening, what will happen next)..."
                  className="bg-background/50 min-h-[200px]"
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {tatStory.length}/500 characters
                </p>
              </div>
            )}

            {activeTest === 'wat' && (
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-3">
                  Example word: <span className="text-primary font-semibold">DISCIPLINE</span>
                </p>
                <Textarea
                  value={watWord}
                  onChange={(e) => setWatWord(e.target.value)}
                  placeholder="Write your sentence using the word (e.g., Discipline is the foundation of success in armed forces)..."
                  className="bg-background/50 min-h-[150px]"
                  maxLength={200}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {watWord.length}/200 characters
                </p>
              </div>
            )}

            {activeTest === 'srt' && (
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-3">
                  Example situation: <span className="text-primary font-semibold">You find your friend cheating in exam</span>
                </p>
                <Textarea
                  value={srtSituation}
                  onChange={(e) => setSrtSituation(e.target.value)}
                  placeholder="Write how you would react to this situation..."
                  className="bg-background/50 min-h-[150px]"
                  maxLength={300}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {srtSituation.length}/300 characters
                </p>
              </div>
            )}

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

export default AIPsychAnalyzer;
