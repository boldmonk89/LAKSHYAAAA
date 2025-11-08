import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, ExternalLink } from "lucide-react";
import backgroundImage from "@/assets/soldiers-celebration.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";


const StudyMaterials = () => {
  const driveLink = "https://drive.google.com/drive/folders/1aCjXkJd8czDgnR75Fx6yUlNfuAnwbJO1?usp=sharing";
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: card1Ref, isVisible: card1Visible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: card2Ref, isVisible: card2Visible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section id="study-materials" className="relative py-24 px-4 overflow-hidden">
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
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto">
        <div ref={titleRef} className={`text-center mb-16 scroll-fade-up ${titleVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
            Study Materials
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive resources for all stages of SSB preparation - Completely FREE
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Materials Card */}
          <div ref={card1Ref} className={`scroll-slide-left ${card1Visible ? 'visible' : ''}`}>
            <Card className="glass-premium p-8 card-glow h-full">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Complete Material Library
                  </h3>
                  <p className="text-muted-foreground">
                    Access PDFs, notes, practice tests, and previous year questions
                  </p>
                </div>
              </div>

              <ul className="space-y-3 mb-8 text-foreground/80">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  OIR Tests & Solutions
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Psychology Test Guides (TAT, WAT, SRT)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  GTO Task Preparation
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Interview Preparation Notes
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Current Affairs & General Knowledge
                </li>
              </ul>

              <Button 
              className="w-full bg-primary hover:bg-primary-glow shadow-glow transition-all duration-300 hover:scale-105 group"
              onClick={() => window.open(driveLink, '_blank')}
            >
              <Download className="w-4 h-4 mr-2 animate-bounce group-hover:animate-none transition-all" />
              Access Google Drive
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </Card>
          </div>

          {/* Features Card */}
          <div ref={card2Ref} className={`scroll-slide-right ${card2Visible ? 'visible' : ''}`}>
            <Card className="glass-premium p-8 card-glow h-full">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                What's Included?
              </h3>
              
              <div className="space-y-6">
                <div className="border-l-2 border-primary pl-4">
                  <h4 className="font-semibold text-foreground mb-1">Screening Tests</h4>
                  <p className="text-sm text-muted-foreground">OIR & PPDT practice materials</p>
                </div>
                
                <div className="border-l-2 border-primary pl-4">
                  <h4 className="font-semibold text-foreground mb-1">Psychological Tests</h4>
                  <p className="text-sm text-muted-foreground">TAT, WAT, SRT, SD with examples</p>
                </div>
                
                <div className="border-l-2 border-primary pl-4">
                  <h4 className="font-semibold text-foreground mb-1">GTO Tasks</h4>
                  <p className="text-sm text-muted-foreground">Complete guide for all outdoor tasks</p>
                </div>
                
                <div className="border-l-2 border-primary pl-4">
                  <h4 className="font-semibold text-foreground mb-1">Interview Prep</h4>
                  <p className="text-sm text-muted-foreground">Common questions & answer strategies</p>
                </div>
                
                <div className="border-l-2 border-primary pl-4">
                  <h4 className="font-semibold text-foreground mb-1">Conference</h4>
                  <p className="text-sm text-muted-foreground">Tips for final assessment</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

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
              Knowledge is power, preparation is the key
            </p>
            <p className="text-base md:text-lg text-muted-foreground text-center italic">
              ज्ञान शक्ति है, तैयारी कुंजी है
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudyMaterials;



