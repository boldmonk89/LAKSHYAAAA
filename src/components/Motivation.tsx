import { Quote } from "lucide-react";
import backgroundImage from "@/assets/khetarpal-background.jpg";

const quotes = [
  {
    text: "The brave may not live forever, but the cautious do not live at all.",
    author: "Field Marshal Sam Manekshaw"
  },
  {
    text: "Either I will come back after hoisting the tricolor, or I will come back wrapped in it, but I will be back for sure.",
    author: "Captain Vikram Batra, PVC"
  },
  {
    text: "Some goals are so worthy, it's glorious even to fail.",
    author: "Captain Manoj Kumar Pandey, PVC"
  },
];

const Motivation = () => {
  return (
    <section id="motivation" className="relative py-24 px-4 overflow-hidden">
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
      
      {/* Overlay - reduced darkness */}
       <div className="absolute inset-0 bg-black/40 z-10" />
      
      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto">
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
        }} className="text-center mb-16 scroll-fade-up">
          <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
            Words That Inspire
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {quotes.map((quote, index) => (
            <div 
              key={index}
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
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative p-8 glass-premium rounded-lg hover:border-primary/50 transition-all duration-300 hover:scale-105">
                <Quote className="w-12 h-12 text-primary/20 absolute top-4 right-4" />
                <p className="text-lg text-foreground/90 mb-4 italic relative z-10">
                  "{quote.text}"
                </p>
                <p className="text-sm text-primary font-semibold">
                  — {quote.author}
                </p>
              </div>
            </div>
          ))}
        </div>

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
        }} className="mt-16 text-center max-w-3xl mx-auto scroll-fade-up">
          <p className="text-2xl md:text-3xl font-bold text-gradient mb-4">
            Your journey to serve the nation starts here.
          </p>
          <p className="text-lg text-muted-foreground">
            Prepare with dedication. Practice with discipline. Succeed with honor.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Motivation;
