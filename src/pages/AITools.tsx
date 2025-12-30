import Navigation from "@/components/Navigation";
import AIPsychAnalyzer from "@/components/AIPsychAnalyzer";
import PiqAnalyzer from "@/components/PiqAnalyzer";
import AIChatbot from "@/components/AIChatbot";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";
import { Bot, Brain, FileText } from "lucide-react";
import { useEffect } from "react";

const AITools = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen relative z-10">
      <ScrollProgress />
      <ScrollToTop />
      <Navigation />
      
      {/* Hero Section for AI Tools */}
      <section className="relative pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient glow mb-6">
            AI-Powered SSB Tools
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Advanced AI tools to help you prepare for SSB interviews - analyze your psychology, 
            practice PIQ responses, and get guidance from our AI Major.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <div className="glass-card p-4 rounded-lg flex items-center gap-3">
              <Brain className="w-6 h-6 text-primary" />
              <span>Psych Analyzer</span>
            </div>
            <div className="glass-card p-4 rounded-lg flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              <span>PIQ Analyzer</span>
            </div>
            <div className="glass-card p-4 rounded-lg flex items-center gap-3">
              <Bot className="w-6 h-6 text-primary" />
              <span>AI Chatbot</span>
            </div>
          </div>
        </div>
      </section>

      <AIPsychAnalyzer />
      <PiqAnalyzer />
      <AIChatbot />
      <Footer />
    </main>
  );
};

export default AITools;
