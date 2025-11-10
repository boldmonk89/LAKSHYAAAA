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
   // Unmute and set video volume after mount
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 0.5;
    }

    // Scroll detection to mute video when out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
         if (entry.isIntersecting) {
            videoRef.current.muted = false;
            videoRef.current.volume = 0.5;
          } else {
            videoRef.current.volume = 0;
            videoRef.current.muted = true;
          }
        }
      },
      { threshold: 0.3 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

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
      observer.disconnect();
    };
  }, [heroImages.length]);

  return (
    <section ref={heroRef} id="hero" className="relative z-20 min-h-screen flex items-center overflow-hidden pt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Video - Left Side */}
          <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden bg-background">
            <video
              ref={videoRef}
              autoPlay
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-10"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Content - Right Side */}
          <div className="relative z-[2] text-center lg:text-left animate-none">
            {/* Lakshya with golden background */}
            <div className="mb-6">
              <div className="inline-block px-6 py-3 rounded-2xl glass-premium">
                <h1 className="text-4xl md:text-5xl font-bold text-gradient glow mb-1">
                  LAKSHYA
                </h1>
              </div>
              <div className="mt-4 space-y-1">
                <p className="text-xl md:text-2xl text-foreground/95 font-bold tracking-wide">
                  मनसा वाचा कर्मणा
                </p>
                <p className="text-xs md:text-sm text-muted-foreground italic">
                  In thought, word, and deed
                </p>
              </div>
              <p className="text-lg md:text-xl text-foreground/90 font-semibold tracking-wide mt-4">
                Har Haal Me Pana Hai
              </p>
            </div>

            {/* Tagline */}
            <div className="mb-8">
              <p className="text-base md:text-lg text-foreground/80 font-medium mb-1">
                Your Complete SSB Preparation - Absolutely FREE
              </p>
              <p className="text-sm md:text-base text-muted-foreground">
                Join thousands of aspirants who've turned their dreams into reality
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center lg:items-start">
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
                onClick={() => document.getElementById('tat-analyzer')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Try AI TAT Analyzer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

