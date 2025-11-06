import { Button } from "@/components/ui/button";
import heroImage from "@/assets/lakshya-hero.jpg";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Create audio
    audioRef.current = new Audio("/lakshya-theme.mp3");
    audioRef.current.loop = false;
    audioRef.current.volume = 0.5;
    
    // Play for 5 seconds then stop
    const playAudio = async () => {
      try {
        await audioRef.current?.play();
        setIsPlaying(true);
        
        // Stop after 5 seconds
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
          }
        }, 5000);
      } catch (error) {
        console.log("Audio autoplay blocked:", error);
      }
    };

    playAudio();

    // Cleanup
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <section ref={heroRef} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image with Blur and Opacity */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.8,
          filter: 'blur(5px)',
        }}
      />
      
      {/* Dark Overlay - reduced */}
      <div className="absolute inset-0 bg-black/25 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        {/* Lakshya with golden background */}
        <div className="mb-8">
          <div className="inline-block px-8 py-4 rounded-2xl glass-premium">
            <h1 className="text-6xl md:text-8xl font-bold text-gradient glow mb-2">
              LAKSHYA
            </h1>
          </div>
          <div className="mt-6 space-y-2">
            <p className="text-3xl md:text-4xl text-foreground/95 font-bold tracking-wide">
              मनसा वाचा कर्मणा
            </p>
            <p className="text-sm md:text-base text-muted-foreground italic">
              In thought, word, and deed
            </p>
          </div>
          <p className="text-2xl md:text-3xl text-foreground/90 font-semibold tracking-wide mt-6">
            Har Haal Me Pana Hai
          </p>
        </div>

        {/* Tagline */}
        <div className="mb-12">
          <p className="text-xl md:text-2xl text-foreground/80 font-medium mb-2">
            Your Complete SSB Preparation - Absolutely FREE
          </p>
          <p className="text-base md:text-lg text-muted-foreground">
            Join thousands of aspirants who've turned their dreams into reality
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary-glow text-lg px-8 py-6 shadow-glow transition-all duration-300 hover:scale-105"
            onClick={() => document.getElementById('study-materials')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Access Study Materials
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6 transition-all duration-300 hover:scale-105"
            onClick={() => document.getElementById('ai-psych-analyzer')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Try AI PSYCH Analyzer
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-primary rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
