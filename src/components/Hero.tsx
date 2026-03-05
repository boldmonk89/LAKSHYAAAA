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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);

  const heroImages = [nda3, lakshya2, imaParade, forcesEmblem, youBelongHere, majMohit, imaDehradun];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sound / visibility state
  const [volume, setVolume] = useState(0.6); // 0.0 - 1.0
  const [isVisible, setIsVisible] = useState(false); // video on-screen
  const [userInteracted, setUserInteracted] = useState(false); // user has clicked an unmute/play at least once
  const [isPlayingWithSound, setIsPlayingWithSound] = useState(false); // true when unmuted & playing

  // Carousel
  useEffect(() => {
    const carouselInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(carouselInterval);
  }, [heroImages.length]);

  // IntersectionObserver -> detect if video is on-screen
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.5, // consider "visible" when 50% of video is in view — tweak if needed
      }
    );

    observer.observe(videoEl);

    return () => {
      observer.disconnect();
    };
  }, []);

  // React to visibility changes: attempt to enable sound when visible, mute when not
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Always keep the DOM volume property in sync with state
    v.volume = volume;

    if (isVisible) {
      // We *attempt* to unmute/play only if user has interacted (or attempt anyway — will likely be blocked)
      if (userInteracted) {
        v.muted = false;
        v.volume = volume;
        v.play().then(() => {
          setIsPlayingWithSound(true);
        }).catch((err) => {
          // Play with sound blocked — fallback to muted autoplay
          console.warn("Autoplay with sound blocked:", err);
          v.muted = true;
          setIsPlayingWithSound(false);
        });
      } else {
        // No user gesture yet — try to play (will be muted initially to allow autoplay)
        v.muted = true;
        v.play().catch((err) => {
          // If even muted play fails, log it (rare)
          console.warn("Muted autoplay failed:", err);
        });
        setIsPlayingWithSound(false);
      }
    } else {
      // Off-screen: mute and pause audio to save resources; keep video playing muted for visuals optionally
      try {
        v.muted = true;
        // Optional: pause the video when offscreen to save CPU/bandwidth.
        // If you want to keep visual continuity, comment out the next line:
        // v.pause();
        setIsPlayingWithSound(false);
      } catch (err) {
        console.error("Error muting/pausing video:", err);
      }
    }
  }, [isVisible, userInteracted, volume]);

  // Called when the user taps "Enable sound" — this creates the required gesture
  const handleEnableSound = async () => {
    const v = videoRef.current;
    if (!v) return;
    setUserInteracted(true);
    try {
      v.muted = false;
      v.volume = volume;
      await v.play(); // user gesture allows this to succeed
      setIsPlayingWithSound(true);
    } catch (err) {
      console.error("User gesture play failed:", err);
      // keep muted if play failed
      v.muted = true;
      setIsPlayingWithSound(false);
    }
  };

  // Optional mute toggle after the user has interacted
  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsPlayingWithSound(!v.muted && !v.paused);
  };

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
              muted // start muted to allow autoplay visual
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-10"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>

            {/* Overlay controls - appear when video is visible or when help is needed */}
            <div className="absolute inset-0 z-20 flex items-end justify-center p-6 pointer-events-none">
              <div className="pointer-events-auto w-full max-w-md mx-auto flex items-center justify-between gap-3">
                {/* If the video is on screen and we haven't had a user gesture, show a clear enable-sound CTA */}
                {isVisible && !userInteracted && (
                  <button
                    onClick={handleEnableSound}
                    className="bg-primary px-5 py-3 rounded-full text-white font-semibold shadow-lg hover:scale-105 transition transform"
                    aria-label="Enable sound"
                  >
                    Enable sound
                  </button>
                )}

                {/* If user has interacted, show mute toggle + slider */}
                {userInteracted && (
                  <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-2">
                    <button
                      onClick={toggleMute}
                      className="text-sm px-2 py-1 rounded-md bg-white/6"
                      aria-label={isPlayingWithSound ? "Mute video" : "Unmute video"}
                    >
                      {isPlayingWithSound ? "Mute" : "Unmute"}
                    </button>

                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={volume}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setVolume(val);
                        if (videoRef.current) {
                          videoRef.current.volume = val;
                        }
                      }}
                      className="w-36"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content - Right Side */}
          <div className="relative z-[2] text-center lg:text-left animate-none">
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

            <div className="mb-8">
              <p className="text-base md:text-lg text-foreground/80 font-medium mb-1">
                Your Complete SSB Preparation - Absolutely FREE
              </p>
              <p className="text-sm md:text-base text-muted-foreground">
                Join thousands of aspirants who've turned their dreams into reality
              </p>
            </div>

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
                onClick={() => document.getElementById('ai-psych-analyzer')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Try AI Psych Analyzer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
