import { Shield, Brain, Users, Target, Heart, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import backgroundImage from "@/assets/khetarpal-background.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const qualities = [
  {
    icon: Shield,
    title: "Leadership",
    description: "Ability to inspire and guide others towards a common goal",
  },
  {
    icon: Brain,
    title: "Intelligence",
    description: "Quick thinking, problem-solving, and tactical awareness",
  },
  {
    icon: Users,
    title: "Team Spirit",
    description: "Working effectively in groups and fostering cooperation",
  },
  {
    icon: Target,
    title: "Determination",
    description: "Unwavering focus and persistence in achieving objectives",
  },
  {
    icon: Heart,
    title: "Courage",
    description: "Physical and moral bravery in the face of adversity",
  },
  {
    icon: Zap,
    title: "Adaptability",
    description: "Flexibility to handle changing situations effectively",
  },
];

const QualityCard = ({ quality, index }: { quality: typeof qualities[0], index: number }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  
  return (
    <div
      ref={ref}
      className={`scroll-zoom ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <Card className="glass-premium hover:border-primary/50 p-6 transition-all duration-300 hover:scale-105 card-glow h-full">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <quality.icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              {quality.title}
            </h3>
            <p className="text-muted-foreground text-sm">
              {quality.description}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

const WhatSSBDemands = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  
  return (
    <section id="what-ssb-demands" className="relative py-24 px-4 overflow-hidden">
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
          <div className="absolute inset-0 bg-black/70 z-10" />
      <div className="absolute inset-0 shadow-section z-10" />
      

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto">
        <div ref={titleRef} className={`text-center mb-16 scroll-fade-up ${titleVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
            What SSB Demands
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The Officer-Like Qualities (OLQs) that assessors look for in future leaders
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {qualities.map((quality, index) => (
            <QualityCard key={index} quality={quality} index={index} />
          ))}
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
              Excellence is not a skill, it's an attitude
            </p>
            <p className="text-base md:text-lg text-muted-foreground text-center italic">
              उत्कृष्टता एक कौशल नहीं, एक दृष्टिकोण है
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatSSBDemands;
