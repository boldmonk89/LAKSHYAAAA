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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Carousel state
  const heroImages = [nda3, lakshya2, imaParade, forcesEmblem, youBelongHere, majMohit, imaDehradun];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Create audio - using lakshya intro
    audioRef.current = new Audio("/intro.mp3");
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

    // Handle scroll for video volume
    const handleScroll = () => {
      if (heroRef.current && videoRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        if (heroBottom <= 0) {
          videoRef.current.volume = 0;
        } else {
          videoRef.current.volume = 0.05; // 5% volume
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      clearInterval(carouselInterval);
      window.removeEventListener('scroll', handleScroll);
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
            filter: 'blur(0.5px)',
          }}
        />
      ))}

      <div className="absolute inset-0 bg-black/25 z-20" />
      
      {/* Content Container */}
      <div className="relative z-30 w-full h-full flex items-center justify-between px-8 max-w-[1400px] mx-auto gap-6">
        {/* Left Side - Video */}
        <div className="w-[55%] flex items-center justify-center">
          <video
            ref={videoRef}
            src="/hero-video.mp4"
            autoPlay
            loop
            muted={false}
            playsInline
            className="w-full h-auto rounded-lg shadow-2xl"
            style={{ maxHeight: '85vh', objectFit: 'cover' }}
            onLoadedMetadata={(e) => {
              const video = e.target as HTMLVideoElement;
              video.volume = 0.05; // Set to 5% volume
            }}
          />
        </div>

        {/* Right Side - Content */}
        <div className="w-[45%] text-center">
          {/* Lakshya with golden background */}
          <div className="mb-6">
            <div className="inline-block px-6 py-3 rounded-2xl glass-premium">
              <h1 className="text-5xl md:text-6xl font-bold text-gradient glow mb-2">
                LAKSHYA
              </h1>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-2xl md:text-3xl text-foreground/95 font-bold tracking-wide">
                मनसा वाचा कर्मणा
              </p>
              <p className="text-sm md:text-base text-muted-foreground italic">
                In thought, word, and deed
              </p>
            </div>
            <p className="text-xl md:text-2xl text-foreground/90 font-semibold tracking-wide mt-4">
              Har Haal Me Pana Hai
            </p>
          </div>

          {/* Tagline */}
          <div className="mb-8">
            <p className="text-lg md:text-xl text-foreground/80 font-medium mb-2">
              Your Complete SSB Preparation - Absolutely FREE
            </p>
            <p className="text-sm md:text-base text-muted-foreground">
              Join thousands of aspirants who've turned their dreams into reality
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-glow text-base px-6 py-5 shadow-glow transition-all duration-300 hover:scale-105"
              onClick={() => document.getElementById('study-materials')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Access Study Materials
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-base px-6 py-5 transition-all duration-300 hover:scale-105"
              onClick={() => document.getElementById('ai-psych-analyzer')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Try AI PSYCH Analyzer
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-30">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
