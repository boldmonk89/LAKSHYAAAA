import { Card } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useParallax } from "@/hooks/useParallax";
import backgroundImage from "@/assets/ima-dehradun.jpg";
import officerMom1 from "@/assets/officer-mom-1.jpg";
import officerMom2 from "@/assets/officer-mom-2.webp";
import officerMom3 from "@/assets/officer-mom-3.jpg";
import officerParents from "@/assets/officer-parents.jpg";

const photos = [
  { src: officerMom1, alt: "Officer with proud mother" },
  { src: officerMom2, alt: "Officer celebrating with mother" },
  { src: officerMom3, alt: "Emotional moment with mother" },
  { src: officerParents, alt: "Officer with proud parents" },
];

const ParentsInspiration = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: parallaxRef, offset } = useParallax(0.3);

  return (
    <section ref={parallaxRef} id="parents-inspiration" className="relative py-24 px-4 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.75,
          filter: 'blur(8px)',
          transform: `translateY(${offset}px)`,
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto">
        <div ref={titleRef} className={`text-center mb-16 scroll-fade-up ${titleVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-3 text-gradient glow">
            They're Waiting For You
          </h2>
          <p className="text-2xl md:text-3xl text-foreground/90 font-semibold mb-4">
            Your mother and father are also waiting for you like this in the future
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            The proudest moment for any parent - seeing their child serve the nation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {photos.map((photo, index) => {
            const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
            
            return (
              <div
                key={index}
                ref={ref}
                className={`scroll-zoom ${isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <Card className="glass-card overflow-hidden transition-all duration-300 hover:scale-105 card-glow">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={photo.src} 
                      alt={photo.alt}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center animate-fade-in">
          <p className="text-xl md:text-2xl font-bold text-gradient mb-4">
            Make them proud. Serve the nation.
          </p>
          <p className="text-lg text-foreground/80">
            Every officer's journey starts with a dream and ends with pride
          </p>
        </div>
      </div>
    </section>
  );
};

export default ParentsInspiration;
