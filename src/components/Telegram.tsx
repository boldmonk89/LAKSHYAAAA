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
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#0088cc] rounded-full mb-4">
                  <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.121.099.155.232.171.325.016.093.036.305.02.471z"/>
                  </svg>
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
