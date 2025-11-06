import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, Instagram, Mail } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import backgroundImage from "@/assets/contact-background.jpg";

const ContactCard = ({ children, index }: { children: React.ReactNode, index: number }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  
  return (
    <div
      ref={ref}
      className={`scroll-zoom ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      {children}
    </div>
  );
};

const Contact = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  return (
    <section id="contact" className="relative py-24 px-4 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.8,
          filter: 'blur(5px)',
        }}
      />
      
      {/* Overlay - 10% opacity */}
      <div className="absolute inset-0 bg-black/10 z-10" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <div ref={titleRef} className={`text-center mb-16 scroll-fade-up ${titleVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions? Need guidance? We're here to help you on your SSB journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Email */}
          <ContactCard index={0}>
            <Card className="glass-premium p-8 card-glow hover:scale-105 transition-all duration-300 group">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/30 shadow-lg group-hover:shadow-primary/30 transition-all">
                  <Mail className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary">Email</h3>
                <p className="text-sm text-muted-foreground">
                  Send us your queries via Gmail
                </p>
                <p className="text-foreground/90 font-mono text-sm">
                  tejasraghav251@gmail.com
                </p>
                <Button
                  className="w-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 shadow-glow transition-all duration-300"
                  onClick={() => window.location.href = "mailto:tejasraghav251@gmail.com"}
                >
                  Connect
                </Button>
              </div>
            </Card>
          </ContactCard>

          {/* Instagram */}
          <ContactCard index={1}>
            <Card className="glass-premium p-8 card-glow hover:scale-105 transition-all duration-300 group">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center border border-pink-500/30 shadow-lg group-hover:shadow-pink-500/30 transition-all">
                  <Instagram className="w-10 h-10 text-pink-500" />
                </div>
                <h3 className="text-2xl font-bold text-pink-500">Instagram</h3>
                <p className="text-foreground/90 font-mono text-sm">
                  @tejasraghavvv
                </p>
                <Button
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 shadow-glow transition-all duration-300"
                  onClick={() => window.open("https://www.instagram.com/tejasraghavvv/?hl=en", "_blank")}
                >
                  Connect
                </Button>
              </div>
            </Card>
          </ContactCard>

          {/* Telegram */}
          <ContactCard index={2}>
            <Card className="glass-premium p-8 card-glow hover:scale-105 transition-all duration-300 group">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400/20 to-blue-500/20 flex items-center justify-center border border-blue-400/30 shadow-lg group-hover:shadow-blue-400/30 transition-all">
                  <Send className="w-10 h-10 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-blue-400">Telegram</h3>
                <p className="text-foreground/90 font-mono text-sm">
                  @scorchiee
                </p>
                <Button
                  className="w-full bg-gradient-to-r from-blue-400 to-blue-500 hover:opacity-90 shadow-glow transition-all duration-300"
                  onClick={() => window.open("https://t.me/scorchiee", "_blank")}
                >
                  Connect
                </Button>
              </div>
            </Card>
          </ContactCard>
        </div>
      </div>
    </section>
  );
};

export default Contact;
