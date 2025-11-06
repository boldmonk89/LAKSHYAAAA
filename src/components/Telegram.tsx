import { Button } from "@/components/ui/button";
import { Send, Users, MessageCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import backgroundImage from "@/assets/nda-building.jpg";

const Telegram = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const telegramLink = "https://t.me/lakshyaaontop";

  return (
    <section id="telegram" className="relative py-24 px-4 overflow-hidden">
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
        <div ref={titleRef} className={`text-center mb-12 scroll-fade-up ${titleVisible ? 'visible' : ''}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Send className="w-10 h-10 text-primary" />
            <h2 className="text-4xl md:text-6xl font-bold text-gradient">
              Join Our Community
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Connect with fellow defense aspirants on Telegram. Share experiences, ask questions, and learn together.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div
            ref={(el) => {
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
            }}
            className="scroll-zoom"
          >
            <div className="glass-premium p-8 md:p-12 card-glow text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-4">
                  <MessageCircle className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  LAKSHYA Telegram Channel
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Join thousands of aspirants preparing for SSB together
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 justify-center text-foreground/80">
                  <Users className="w-5 h-5 text-primary" />
                  <span>Active community discussions</span>
                </div>
                <div className="flex items-center gap-3 justify-center text-foreground/80">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <span>Quick doubt resolution</span>
                </div>
                <div className="flex items-center gap-3 justify-center text-foreground/80">
                  <Send className="w-5 h-5 text-primary" />
                  <span>Daily updates & tips</span>
                </div>
              </div>

              <Button 
                size="lg"
                onClick={() => window.open(telegramLink, '_blank')}
                className="bg-primary hover:bg-primary-glow shadow-glow transition-all duration-300 hover:scale-105"
              >
                <Send className="w-5 h-5 mr-2" />
                Join Telegram Channel
              </Button>
            </div>
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
              Together we rise, together we serve
            </p>
            <p className="text-base md:text-lg text-muted-foreground text-center italic">
              साथ मिलकर हम उठते हैं, साथ मिलकर हम सेवा करते हैं
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Telegram;
