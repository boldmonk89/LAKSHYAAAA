import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Shield, Brain, Users, MessageCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Tip {
  id: number;
  stage: string;
  icon: React.ReactNode;
  title: string;
  dos: string[];
  donts: string[];
}

const tips: Tip[] = [
  {
    id: 1,
    stage: "Screening Test",
    icon: <Shield className="w-8 h-8" />,
    title: "OIR & PPDT Stage",
    dos: [
      "Practice time management - complete OIR in 30 minutes",
      "Write clear, logical stories with positive protagonist",
      "Listen to others during group discussion"
    ],
    donts: [
      "Don't write negative or depressing stories",
      "Don't dominate or stay silent in group",
      "Don't panic if you miss some questions"
    ]
  },
  {
    id: 2,
    stage: "Psychology Test",
    icon: <Brain className="w-8 h-8" />,
    title: "TAT, WAT & SRT",
    dos: [
      "Write natural, spontaneous responses",
      "Show positive attitude and problem-solving",
      "Be consistent across all tests"
    ],
    donts: [
      "Don't try to fake or memorize responses",
      "Don't write unrealistic or filmy stories",
      "Don't overthink - first response is best"
    ]
  },
  {
    id: 3,
    stage: "Group Testing",
    icon: <Users className="w-8 h-8" />,
    title: "GTO Tasks",
    dos: [
      "Participate actively in all tasks",
      "Show teamwork and leadership qualities",
      "Think creatively for group planning"
    ],
    donts: [
      "Don't be over-aggressive or passive",
      "Don't criticize others' ideas directly",
      "Don't give up on difficult obstacles"
    ]
  },
  {
    id: 4,
    stage: "Interview",
    icon: <MessageCircle className="w-8 h-8" />,
    title: "Personal Interview",
    dos: [
      "Be honest and confident in answers",
      "Know your PIQ form thoroughly",
      "Show awareness of current affairs"
    ],
    donts: [
      "Don't lie or exaggerate achievements",
      "Don't say 'I don't know' too quickly",
      "Don't show nervousness or arrogance"
    ]
  },
  {
    id: 5,
    stage: "Conference",
    icon: <CheckCircle className="w-8 h-8" />,
    title: "Final Round",
    dos: [
      "Maintain composure and confidence",
      "Answer questions clearly and honestly",
      "Show consistency with previous responses"
    ],
    donts: [
      "Don't change your stance suddenly",
      "Don't argue with the assessors",
      "Don't show overconfidence or desperation"
    ]
  }
];

const SSBTipsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tips.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + tips.length) % tips.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % tips.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const currentTip = tips[currentIndex];

  return (
    <section
      ref={sectionRef}
      id="ssb-tips"
      className={`relative py-20 px-4 scroll-fade-up ${isVisible ? 'visible' : ''}`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none z-0" />
      
      <div className="relative z-20 container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">SSB Interview Tips</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Master each stage with these essential dos and don'ts
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Card */}
          <div className="glass rounded-2xl p-8 md:p-12 min-h-[500px] flex flex-col border border-primary/20">
            {/* Stage Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                {currentTip.icon}
              </div>
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">
                  {currentTip.stage}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  {currentTip.title}
                </h3>
              </div>
            </div>

            {/* Tips Grid */}
            <div className="grid md:grid-cols-2 gap-8 flex-grow">
              {/* Dos */}
              <div>
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-foreground">Do's</span>
                </h4>
                <ul className="space-y-3">
                  {currentTip.dos.map((item, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-foreground/80"
                    >
                      <span className="text-green-500 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Don'ts */}
              <div>
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="text-red-500">✗</span>
                  <span className="text-foreground">Don'ts</span>
                </h4>
                <ul className="space-y-3">
                  {currentTip.donts.map((item, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-foreground/80"
                    >
                      <span className="text-red-500 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10 z-20"
            onClick={goToPrevious}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10 z-20"
            onClick={goToNext}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {tips.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Auto-play indicator */}
        <div className="text-center mt-4">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {isAutoPlaying ? "⏸ Pause auto-play" : "▶ Resume auto-play"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default SSBTipsCarousel;
