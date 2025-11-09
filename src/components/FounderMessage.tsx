import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useParallax } from "@/hooks/useParallax";
import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";
import batchPhoto from "@/assets/ssb-batch-photo.jpg";
import ndaPainting from "@/assets/nda-painting.jpg";

const FounderMessage = () => {
  const { ref, isVisible } = useScrollAnimation();
  const parallaxY = useParallax(0.2);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${parallaxY}px)` }}
      >
        <img
          src={ndaPainting}
          alt="NDA Background"
          className="w-full h-full object-cover opacity-15"
          style={{ filter: "blur(3px)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/98 to-background" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Message from the Founder
          </h2>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="glass-card border-primary/20 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              {/* Batch Photo */}
              <div className="flex items-center justify-center">
                <div className="relative group">
                  <img
                    src={batchPhoto}
                    alt="32 SSB Jalandhar Batch"
                    className="rounded-lg shadow-2xl transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                </div>
              </div>

              {/* Message Content */}
              <div className="flex flex-col justify-center space-y-6">
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/30" />
                  <blockquote className="text-xl md:text-2xl font-semibold italic text-foreground pl-8 mb-6">
                    "Some goals are worthy enough, it is even glorious to fail."
                  </blockquote>
                </div>

                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p className="text-lg">
                    I created this platform with a singular mission: <span className="text-foreground font-semibold">to help aspiring officers achieve their dreams of serving the nation.</span>
                  </p>
                  
                  <p>
                    Though I didn't make it to NDA myself, my journey through the SSB process taught me invaluable lessons. Every setback, every challenge, and every moment of preparation has been channeled into building this resource for you.
                  </p>

                  <p>
                    This website is <span className="text-primary font-semibold">completely free</span>. No hidden costs, no premium tiers—just genuine support for your journey. You don't need to look anywhere else; everything you need to prepare for SSB is right here.
                  </p>

                  <p className="text-foreground font-medium">
                    My goal wasn't just personal success—it was to ensure that future warriors like you don't have to struggle alone. If my experience can light your path to the uniform, then my journey was worth every step.
                  </p>

                  <div className="pt-4 border-t border-primary/20">
                    <p className="text-sm text-muted-foreground italic">
                      - Chest No. 21, 32 SSB Jalandhar (SCN), Batch MNDA 92454
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FounderMessage;
