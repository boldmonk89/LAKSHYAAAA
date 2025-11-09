import { Button } from "@/components/ui/button";
import nda3 from "@/assets/nda-3.jpg";
import lakshya2 from "@/assets/lakshya-2.jpg";
import imaParade from "@/assets/ima-parade.jpeg";
import forcesEmblem from "@/assets/forces-emblem.jpeg";
import youBelongHere from "@/assets/you-belong-here.jpeg";
import majMohit from "@/assets/maj-mohit-sharma.jpeg";
import imaDehradun from "@/assets/ima-dehradun-3.jpg";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Carousel state
  const heroImages = [nda3, lakshya2, imaParade, forcesEmblem, youBelongHere, majMohit, imaDehradun];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
        }, 15000);
      } catch (error) {
        console.log("Audio autoplay blocked:", error);
      }
    };

    playAudio();

    // Image carousel - change every 5 seconds
    const carouselInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);


    // Cleanup
    return () => {
      clearInterval(carouselInterval);
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [heroImages.length]);

  return (
    <section ref={heroRef} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
  {/* Background Image Carousel */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 z-10 transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: currentImageIndex === index ? 0.8 : 0,
            filter: 'blur(1.5px)',
          }}
        />
      ))}

       <div className="absolute inset-0 bg-black/25 z-20" />
      
      {/* Content */}
      <div className="relative z-30 text-center px-4 max-w-5xl mx-auto">
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
