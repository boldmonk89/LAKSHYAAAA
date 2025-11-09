import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useParallax } from "@/hooks/useParallax";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Lightbulb, Target, Brain, Heart, Shield, Star } from "lucide-react";
import ndaBackground from "@/assets/nda-background.jpg";
import Autoplay from "embla-carousel-autoplay";
const tips = [
  {
    icon: Lightbulb,
    title: "Stay Confident",
    description: "Confidence is key in SSB. Believe in yourself and showcase your true personality without pretending to be someone else.",
  },
  {
    icon: Target,
    title: "Be Task-Oriented",
    description: "Focus on completing tasks efficiently. Show leadership by taking initiative and helping your team achieve goals.",
  },
  {
    icon: Brain,
    title: "Think Logically",
    description: "Use logical reasoning in GTO tasks and psychological tests. Don't overthink - your first instinct is often correct.",
  },
  {
    icon: Heart,
    title: "Be Genuine",
    description: "Honesty and authenticity matter more than giving 'perfect' answers. Assessors can identify pretense easily.",
  },
  {
    icon: Shield,
    title: "Stay Composed",
    description: "Maintain your composure under pressure. SSB tests your mental strength and ability to handle stress gracefully.",
  },
  {
    icon: Star,
    title: "Practice OIR",
    description: "Officer Intelligence Rating requires consistent practice. Solve reasoning questions daily to improve your speed and accuracy.",
  },
];

const SSBTipsCarousel = () => {
  const { ref, isVisible } = useScrollAnimation();
  const parallaxY = useParallax(0.3);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${parallaxY}px)` }}
      >
        <img
          src={ndaBackground}
          alt="SSB Background"
          className="w-full h-full object-cover opacity-20"
          style={{ filter: "blur(4px)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Expert SSB Tips
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Proven strategies and insights to help you succeed in your SSB interview
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
             plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {tips.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="glass-card border-primary/20 h-full hover:border-primary/40 transition-all duration-300 hover:scale-105">
                        <CardContent className="flex flex-col items-center text-center p-6 h-full">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                            <Icon className="w-8 h-8 text-primary" />
                          </div>
                          <h3 className="text-xl font-semibold mb-3 text-foreground">
                            {tip.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {tip.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="bg-primary/20 hover:bg-primary/30 border-primary/40" />
            <CarouselNext className="bg-primary/20 hover:bg-primary/30 border-primary/40" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default SSBTipsCarousel;
