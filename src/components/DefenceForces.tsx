import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import armyInsignia from "@/assets/army-insignia.png";
import airforceInsignia from "@/assets/airforce-insignia.png";
import navyInsignia from "@/assets/navy-insignia.png";

type DefenceLink = {
  name: string;
  insignia: string;
  link: string;
  motto: string;
};

const defenceLinks: DefenceLink[] = [
  {
    name: "Indian Army",
    insignia: armyInsignia,
    link: "https://www.joinindianarmy.nic.in/Default.aspx?id=736&lg=eng&",
    motto: "सेवा परमो धर्मः",
  },
  {
    name: "Indian Air Force",
    insignia: airforceInsignia,
    link: "https://indianairforce.nic.in/",
    motto: "नभः स्पृशं दीप्तम्",
  },
  {
    name: "Indian Navy",
    insignia: navyInsignia,
    link: "https://www.joinindiannavy.gov.in/en/account/login?state=hs&st=UUhbbXlZckR6U21HQ293WHU2SWlDQT09",
    motto: "शं नो वरुणः",
  },
];

const DefenceForces: React.FC = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="defence-forces" className="relative isolate z-10 py-24 overflow-hidden">
      <div className="container relative z-[1] mx-auto px-4">
        {/* Title */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transform transition-all duration-700 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient glow">
            Defence Forces Links
          </h2>
          <p className="text-lg text-foreground/90 max-w-2xl mx-auto">
            Official portals to join the Indian Armed Forces
          </p>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto`}
        >
          {defenceLinks.map((force, index) => {
            // stagger using transitionDelay (works with transition utilities)
            const delayMs = index * 100;
            return (
              <a
                key={force.name}
                href={force.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${force.name} portal`}
                className={`group relative glass-premium rounded-xl p-6 md:p-8 overflow-hidden transform transition-all duration-500
                  ${cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                  hover:scale-[1.03]`}
                style={{ transitionDelay: `${delayMs}ms` }}
              >
                {/* Insignia */}
                <div className="flex justify-center mb-5">
                  <div className="w-24 h-24 md:w-40 md:h-40 flex items-center justify-center p-3 rounded-full bg-white/8 group-hover:bg-white/18 transition-colors backdrop-blur-sm">
                    <img
                      src={force.insignia}
                      alt={`${force.name} Insignia`}
                      loading="lazy"
                      className="w-full h-full object-contain filter drop-shadow-lg"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-gradient">{force.name}</h3>
                  <p className="text-sm text-foreground/80 italic">{force.motto}</p>

                  <div className="mt-4">
                    <span className="inline-flex items-center gap-2 font-semibold text-primary group-hover:text-primary-glow transition-colors text-base md:text-lg">
                      Visit Portal
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 md:h-5 md:w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 rounded-xl pointer-events-none border-2 border-transparent group-hover:border-primary/80 transition-all duration-300" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DefenceForces;
