import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import armyInsignia from "@/assets/army-insignia.png";
import airforceInsignia from "@/assets/airforce-insignia.png";
import navyInsignia from "@/assets/navy-insignia.png";

const defenceLinks = [
  {
    name: "Indian Army",
    insignia: armyInsignia,
    link: "https://www.joinindianarmy.nic.in/Default.aspx?id=736&lg=eng&",
    motto: "सेवा परमो धर्मः"
  },
  {
    name: "Indian Air Force",
    insignia: airforceInsignia,
    link: "https://indianairforce.nic.in/",
    motto: "नभः स्पृशं दीप्तम्"
  },
  {
    name: "Indian Navy",
    insignia: navyInsignia,
    link: "https://www.joinindiannavy.gov.in/en/account/login?state=hs&st=UUhbbXlZckR6U21HQ293WHU2SWlDQT09",
    motto: "शं नो वरुणः"
  }
];

const DefenceForces = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="defence-forces" className="relative isolate z-10 py-24 overflow-hidden">
      {/* Light glass overlay to keep text readable */}
      <div className="absolute inset-0 -z-10 pointer-events-none glass" />
      
      <div className="container relative z-[1] mx-auto px-4">
        <div
          ref={titleRef}
          className={`text-center mb-16 scroll-fade-up ${titleVisible ? "visible" : ""}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient glow">
            Defence Forces Links
          </h2>
          <p className="text-lg text-foreground/90 max-w-2xl mx-auto">
            Official portals to join the Indian Armed Forces
          </p>
        </div>

        <div
          ref={cardsRef}
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto scroll-scale ${
            cardsVisible ? "visible" : ""
          }`}
        >
          {defenceLinks.map((force, index) => (
            <a
              key={force.name}
              href={force.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative glass-premium rounded-xl p-8 hover:scale-105 transition-all duration-300 hover:shadow-glow"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Insignia */}
              <div className="flex justify-center mb-6">
                <div className="w-40 h-40 flex items-center justify-center p-4 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors backdrop-blur-sm">
                  <img
                    src={force.insignia}
                    alt={`${force.name} Insignia`}
                    className="w-full h-full object-contain filter drop-shadow-lg"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2 text-gradient">
                  {force.name}
                </h3>
                <p className="text-sm text-foreground/80 italic">
                  {force.motto}
                </p>
                <div className="mt-4 text-primary group-hover:text-primary-glow transition-colors font-semibold">
                  Visit Portal →
                </div>
              </div>

              {/* Hover effect border */}
              <div className="absolute inset-0 rounded-xl border-2 border-primary/0 group-hover:border-primary/50 transition-all duration-300" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DefenceForces;
