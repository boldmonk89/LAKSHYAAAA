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
      <div className="absolute inset-0 bg-black/15 z-10" />

     
    </section>
  );
};

export default Contact;
