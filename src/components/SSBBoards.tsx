import { Card } from "@/components/ui/card";
import { MapPin, Hotel } from "lucide-react";
import SSBMap from "./SSBMap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import backgroundImage from "@/assets/soldiers-celebration.jpg";

const armyBoards = [
  {
    location: "Allahabad",
    boards: [
      { name: "11 SSB", batch: "35XXX" },
      { name: "14 SSB", batch: "71XXX" },
      { name: "18 SSB", batch: "38XXX" },
      { name: "19 SSB", batch: "39XXX" },
      { name: "34 SSB", batch: "46XXX" },
    ],
    stays: [
      "Dharmshala inside SSB – ₹200/head, 600m from centre (Best option; call letter mandatory before check-in)",
      "Hotel Veenit – ₹250/night",
      "Dormitory by Ex-Army Officer – ₹1000/night, includes free drop facility in the morning",
    ]
  },
  {
    location: "Bhopal",
    boards: [
      { name: "20 SSB", batch: "40XXX" },
      { name: "21 SSB", batch: "72XXX" },
      { name: "22 SSB", batch: "42XXX" },
    ],
    stays: [
      "Jain Dharmshala – ₹200/head, 800m from centre, ₹50 for dinner; opposite Gufa Mandir",
      "Dev Begas Sainik Aramgrah – Contact: 96859 62886, Address: Sardar Vallabh Bhai Patel Polytechnic Chouraha, 45 Bunglows, North TT Nagar, Bhopal – 462003",
    ]
  },
  {
    location: "Bengaluru",
    boards: [
      { name: "17 SSB", batch: "63XXX" },
      { name: "24 SSB", batch: "68XXX" },
    ],
    stays: [
      "Sri Sri Ravishankar Bal Mandir – ₹150/day, 31km from centre, Location: Kanakapura Rd, opposite Art of Living Ashram",
      "Hotel Townhall – ₹650/head",
    ]
  },
  {
    location: "Jalandhar",
    boards: [
      { name: "31 SSB", batch: "81XXX" },
      { name: "32 SSB", batch: "92XXX" },
    ],
    stays: [
      "Sodhi PG – ₹100/night, Address: H.No.43, Modern Estate, near Pinky Tent House, Dakoha, Rama Mandir, Jalandhar, Contact: 9872738031, 8437388717",
      "Comfort PG – ₹700 (single), ₹900 (3-person room), 1 km from centre",
      "Babri Dharmshala (SSB Stay) – Dormitory & PG, 27-B Beant Nagar, Contact: 9465331052",
    ]
  },
];

const airForceBoards = [
  {
    location: "Varanasi",
    boards: [{ name: "4 AFSB", batch: "" }],
    stays: ["Om Inn Hotel Residency – ₹700/head", "IRCTC Dormitory – Budget stay"]
  },
  {
    location: "Gandhinagar",
    boards: [{ name: "3 AFSB", batch: "" }],
    stays: ["Kadva Patidar Samaj – Pocket-friendly", "Youth Hostel – ₹135/head"]
  },
  {
    location: "Guwahati",
    boards: [{ name: "5 AFSB", batch: "" }],
    stays: ["Royal Arunanchalee Guest House"]
  },
  {
    location: "Mysore",
    boards: [{ name: "2 AFSB", batch: "" }],
    stays: ["Ginger Mysore – 800m from centre", "Shreyas Residency – ₹650/head"]
  },
  {
    location: "Dehradun",
    boards: [{ name: "1 AFSB", batch: "" }],
    stays: ["Dolphin Guest House – ₹1000/person, 10m from centre", "Doon Valley Homestay"]
  },
];

const navyBoards = [
  {
    location: "Coimbatore",
    boards: [{ name: "NSB (INS Agrani)", batch: "" }],
    stays: ["Closest airport: Coimbatore International Airport"]
  },
  {
    location: "Bhopal",
    boards: [{ name: "NSB", batch: "" }],
    stays: ["Inside 21 SSB complex, 5km from Bhopal Junction"]
  },
  {
    location: "Bengaluru",
    boards: [{ name: "NSB", batch: "" }],
    stays: ["Cubbon Road, accessible by Kempegowda International Airport"]
  },
  {
    location: "Visakhapatnam",
    boards: [{ name: "NSB (INS Kalinga)", batch: "" }],
    stays: ["Near Visakhapatnam Railway Station"]
  },
  {
    location: "Kolkata",
    boards: [{ name: "NSB", batch: "" }],
    stays: ["Gurudwara Bara Sikh Sangat – ₹300/day (Food included)"]
  },
];

const BoardSection = ({ location, boards, stays, address }: { location: string, boards: any[], stays: string[], address?: string }) => (
  <div className="mb-6">
    <h3 className="text-lg font-bold text-foreground mb-2">{location}</h3>
    
    {/* Board Numbers */}
    <div className="mb-2 space-y-0.5">
      {boards.filter(b => b.batch).map((b, i) => (
        <div key={i} className="text-xs text-foreground/90">
          {b.name} - {b.batch}
        </div>
      ))}
      {boards.filter(b => !b.batch).map((b, i) => (
        <div key={i} className="text-xs text-foreground/90">
          {b.name}
        </div>
      ))}
    </div>

    {/* Address */}
    {address && (
      <div className="mb-1.5">
        <span className="text-xs text-muted-foreground">Address: </span>
        <span className="text-xs text-foreground/80">{address}</span>
      </div>
    )}

    {/* Stays */}
    <div>
      <span className="text-xs text-muted-foreground">Stay: </span>
      <span className="text-xs text-foreground/80">{stays.join(', ')}</span>
    </div>
  </div>
);

const SSBBoards = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: mapRef, isVisible: mapVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: armyRef, isVisible: armyVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: airRef, isVisible: airVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: navyRef, isVisible: navyVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="ssb-boards" className="relative py-24 px-4 overflow-hidden">
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

      <div className="relative z-20 max-w-7xl mx-auto">
        <div ref={titleRef} className={`text-center mb-16 scroll-fade-up ${titleVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
            SSB Board Locations
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            All SSB/AFSB/NSB boards across India with stay options
          </p>
        </div>

        {/* Google Map */}
        <div ref={mapRef} className={`mb-16 scroll-scale ${mapVisible ? 'visible' : ''}`}>
          <SSBMap />
        </div>

        {/* 3 Column Layout - Army Left, Air Force Center, Navy Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Army Boards - LEFT */}
          <div ref={armyRef} className={`scroll-slide-left ${armyVisible ? 'visible' : ''}`}>
            <Card className="glass-premium p-6 card-glow h-full">
              <h2 className="text-xl font-bold text-primary mb-4">Army Boards</h2>
              
              <div className="space-y-4 text-xs">
                <BoardSection 
                  location="Allahabad"
                  boards={armyBoards[0].boards}
                  address="Civil Lines, Allahabad, UP"
                  stays={["Army Guest House, Railway Retiring Rooms"]}
                />
                
                <BoardSection 
                  location="Bhopal"
                  boards={armyBoards[1].boards}
                  address="Bairagarh, Bhopal, MP"
                  stays={["MP Tourism hotels, Budget hotels"]}
                />
                
                <BoardSection 
                  location="Bengaluru"
                  boards={armyBoards[2].boards}
                  address="Koramangala, Bengaluru"
                  stays={["Hotels in Majestic, YMCA"]}
                />
                
                <BoardSection 
                  location="Jalandhar"
                  boards={armyBoards[3].boards}
                  address="Cantt Area, Jalandhar"
                  stays={["Guest houses in Fancy Bazar"]}
                />
              </div>
            </Card>
          </div>

          {/* Air Force Boards - CENTER */}
          <div ref={airRef} className={`scroll-scale ${airVisible ? 'visible' : ''}`}>
            <Card className="glass-premium p-6 card-glow h-full">
              <h2 className="text-xl font-bold text-primary mb-4">Air Force Boards</h2>
              
              <div className="space-y-4 text-xs">
                <BoardSection 
                  location="1 AFSB - Dehradun"
                  boards={[{ name: "1 AFSB", batch: "" }]}
                  address="Clement Town, Dehradun"
                  stays={["Hotels in Rajpur Road"]}
                />
                
                <BoardSection 
                  location="2 AFSB - Mysore"
                  boards={[{ name: "2 AFSB", batch: "" }]}
                  address="Mysore, Karnataka"
                  stays={["KSTDC hotels, Budget lodges"]}
                />
                
                <BoardSection 
                  location="3 AFSB - Gandhinagar"
                  boards={[{ name: "3 AFSB", batch: "" }]}
                  address="Gandhinagar, Gujarat"
                  stays={["Hotels in Sector 16"]}
                />
                
                <BoardSection 
                  location="4 AFSB - Varanasi"
                  boards={[{ name: "4 AFSB", batch: "" }]}
                  address="Varanasi Cantt, UP"
                  stays={["Hotels near Cantt area"]}
                />
                
                <BoardSection 
                  location="5 AFSB - Guwahati"
                  boards={[{ name: "5 AFSB", batch: "" }]}
                  address="Guwahati, Assam"
                  stays={["Hotels in Paltan Bazar"]}
                />
              </div>
            </Card>
          </div>

          {/* Navy Boards - RIGHT */}
          <div ref={navyRef} className={`scroll-slide-right ${navyVisible ? 'visible' : ''}`}>
            <Card className="glass-premium p-6 card-glow h-full">
              <h2 className="text-xl font-bold text-primary mb-4">Navy Boards</h2>
              
              <div className="space-y-4 text-xs">
                <BoardSection 
                  location="NSB - Coimbatore"
                  boards={[{ name: "NSB", batch: "" }]}
                  address="Coimbatore, Tamil Nadu"
                  stays={["Hotels near RS Puram, YWCA"]}
                />
                
                <BoardSection 
                  location="12 SSB - Bangalore"
                  boards={[{ name: "12 SSB", batch: "" }]}
                  address="Bangalore, Karnataka"
                  stays={["Hotels in Majestic, YMCA"]}
                />
                
                <BoardSection 
                  location="33 SSB - Bhopal"
                  boards={[{ name: "33 SSB", batch: "" }]}
                  address="Bhopal, MP"
                  stays={["MP Tourism, Railway Rooms"]}
                />
                
                <BoardSection 
                  location="NSB - Kolkata"
                  boards={[{ name: "NSB", batch: "" }]}
                  address="Kolkata, West Bengal"
                  stays={["Hotels in Park Street"]}
                />
                
                <BoardSection 
                  location="NSB - Visakhapatnam"
                  boards={[{ name: "NSB", batch: "" }]}
                  address="Visakhapatnam, AP"
                  stays={["Hotels near Beach Road"]}
                />
              </div>
            </Card>
          </div>
        </div>

        {/* Motivational Line */}
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
        }} className="scroll-fade-up mt-8 max-w-3xl mx-auto">
          <div className="glass-premium p-6 rounded-lg border border-primary/30 backdrop-blur-md bg-black/20">
            <p className="text-lg md:text-xl font-semibold text-foreground mb-2 text-center">
              Know your destination, plan your journey wisely
            </p>
            <p className="text-base md:text-lg text-muted-foreground text-center italic">
              अपनी मंजिल को जानो, अपनी यात्रा की बुद्धिमानी से योजना बनाओ
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SSBBoards;
