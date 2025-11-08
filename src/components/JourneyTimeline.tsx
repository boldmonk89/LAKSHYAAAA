import { Card } from "@/components/ui/card";
import { CheckCircle2, BookOpen, Users, Stethoscope, Trophy, GraduationCap, Medal } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useParallax } from "@/hooks/useParallax";
import backgroundImage from "@/assets/nda-building.jpg";

const timelineSteps = [
  {
    icon: BookOpen,
    title: "Written Examination",
    subtitle: "NDA/CDS/AFCAT",
    description: "Clear the written exam conducted by UPSC/Air Force. Prepare thoroughly for Mathematics, English, and General Knowledge.",
    duration: "6 months preparation",
    color: "from-blue-500/20 to-blue-600/20",
  },
  {
    icon: Users,
    title: "SSB Interview",
    subtitle: "5 Days Assessment",
    description: "Stage 1: Screening (OIR & PPDT). Stage 2: Psychology Tests, GTO Tasks, Personal Interview, and Conference.",
    duration: "5 days",
    color: "from-purple-500/20 to-purple-600/20",
  },
  {
    icon: Stethoscope,
    title: "Medical Examination",
    subtitle: "Fitness Assessment",
    description: "Comprehensive medical tests to ensure physical and mental fitness for armed forces service.",
    duration: "3-4 days",
    color: "from-green-500/20 to-green-600/20",
  },
  {
    icon: Trophy,
    title: "Merit List & Selection",
    subtitle: "Final Results",
    description: "Based on written exam score, SSB marks, and medical fitness. Merit list published by UPSC.",
    duration: "2-3 months wait",
    color: "from-yellow-500/20 to-yellow-600/20",
  },
  {
    icon: GraduationCap,
    title: "Training Academy",
    subtitle: "IMA/OTA/NDA/AFA/INA",
    description: "Rigorous military training including academics, physical fitness, drill, and leadership development.",
    duration: "1-4 years",
    color: "from-orange-500/20 to-orange-600/20",
  },
  {
    icon: Medal,
    title: "Passing Out Parade",
    subtitle: "Commission as Officer",
    description: "Receive your commission and join as Lieutenant/Flying Officer/Sub Lieutenant to serve the nation.",
    duration: "Lifelong honor",
    color: "from-red-500/20 to-red-600/20",
  },
];

const TimelineStep = ({ step, index, isLast }: { step: typeof timelineSteps[0], index: number, isLast: boolean }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const isEven = index % 2 === 0;
  
  return (
    <div
      ref={ref}
      className={`relative flex items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col scroll-fade-up ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      {/* Content Card */}
      <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'} text-center`}>
        <Card className={`glass-card p-6 transition-all duration-300 hover:scale-105 card-glow bg-gradient-to-br ${step.color}`}>
          <div className={`flex items-start gap-4 ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} flex-col md:items-start items-center`}>
            <div className="p-4 bg-primary/20 rounded-lg">
              <step.icon className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-foreground mb-1">
                {step.title}
              </h3>
              <p className="text-sm text-primary font-semibold mb-3">
                {step.subtitle}
              </p>
              <p className="text-foreground/80 text-sm mb-3">
                {step.description}
              </p>
              <div className="inline-block px-3 py-1 bg-primary/10 rounded-full">
                <span className="text-xs text-primary font-medium">
                  {step.duration}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Timeline Dot */}
      <div className="relative z-10 flex-shrink-0">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-glow">
          <CheckCircle2 className="w-8 h-8 text-primary-foreground" />
        </div>
      </div>

      {/* Spacer for alignment */}
      <div className="flex-1 hidden md:block" />

      {/* Vertical Line */}
      {!isLast && (
        <div className="absolute left-1/2 top-16 w-0.5 h-full bg-gradient-to-b from-primary to-primary/20 -translate-x-1/2 hidden md:block" />
      )}
    </div>
  );
};

const JourneyTimeline = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: parallaxRef, offset } = useParallax(0.3);

  return (
    <section ref={parallaxRef} id="journey-timeline" className="relative py-24 px-4 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.75,
          filter: 'blur(8px)',
          transform: `translateY(${offset}px)`,
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/15 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto">
        <div ref={titleRef} className={`text-center mb-20 scroll-fade-up ${titleVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
            Your Journey to Commission
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From aspiring candidate to commissioned officer - the complete roadmap
          </p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {timelineSteps.map((step, index) => (
            <TimelineStep 
              key={index} 
              step={step} 
              index={index}
              isLast={index === timelineSteps.length - 1}
            />
          ))}
        </div>

        <div className="mt-20 text-center animate-fade-in">
          <p className="text-2xl md:text-3xl font-bold text-gradient mb-4">
            The journey is challenging, but the reward is eternal glory
          </p>
          <p className="text-lg text-foreground/80">
            Start your preparation today with LAKSHYA
          </p>
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;
