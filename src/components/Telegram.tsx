import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Youtube } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import backgroundImage from "@/assets/cadets-celebration.jpg";

const telegramIcon = (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.693-1.653-1.124-2.678-1.8-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.121.099.154.232.17.326.016.094.036.308.02.476z"/>
  </svg>
);

const telegramCommunities = [
  { name: "The SSB Edge", link: "https://t.me/TheSSBEdge" },
  { name: "Rocha Vlogs Community", link: "https://t.me/rocha_vlogs_community" },
  { name: "Maj Gen Yash Mor", link: "https://t.me/majgenyashmor" },
  { name: "Pehla Kadam SSB", link: "https://t.me/Pehlakadamssb" },
  { name: "Indian Defence Buddy", link: "https://t.me/indiandefencebuddy7" },
];

const youtubeChannels = [
  { name: "The Journey Extraordinary", link: "https://t.me/TheJourneyExtraordinary" },
  { name: "CDS Journey", link: "https://t.me/cdsjourney" },
  { name: "Danish Sir Defence Wallah", link: "https://t.me/danishsir_defencewallah" },
  { name: "Defence Wallah CDS", link: "https://t.me/Defencewallahcds" },
  { name: "Defence Wallah", link: "https://t.me/defencewallahe" },
  { name: "Learn with Sumit", link: "https://t.me/learnwithsumit" },
  { name: "Indian Defence Buddy Yt", link: "https://youtube.com/@indiandefencebuddy?si=NVriUw7WKe0pMIMj" },
  { name: "SSB Future Officers", link:"https://t.me/SSBFutureOfficer2020" },
];

const Telegram = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    // 👇 ID changed to "communities" + scroll offset so fixed navbar content hide na ho
    <section id="communities" className="relative py-24 px-4 overflow-hidden scroll-mt-24 md:scroll-mt-28">
      {/* Fixed Background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto">
        <div ref={titleRef} className={`text-center mb-16 scroll-fade-up ${titleVisible ? "visible" : ""}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-3 text-gradient glow">
            Join SSB Various Communities for Discussion
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with fellow aspirants, gather information, practice together, and find companions for your SSB journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Telegram Discussion Groups */}
          <div ref={leftRef} className={`scroll-slide-left ${leftVisible ? "visible" : ""}`}>
            <Card className="glass-premium p-6 card-glow h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#0088cc] flex items-center justify-center">
                  {telegramIcon}
                </div>
                <h3 className="text-2xl font-bold text-gradient">SSB Discussion Groups</h3>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                Join these communities to discuss strategies, share experiences, and practice with fellow aspirants
              </p>

              <div className="space-y-3">
                {telegramCommunities.map((community, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="w-full justify-start text-left hover:bg-[#0088cc]/10 hover:border-[#0088cc] transition-all"
                    onClick={() => window.open(community.link, "_blank")}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#0088cc] flex items-center justify-center mr-3 flex-shrink-0">
                      {telegramIcon}
                    </div>
                    <span className="text-sm">{community.name}</span>
                  </Button>
                ))}
              </div>
            </Card>
          </div>

          {/* Right - YouTube Channels on Telegram */}
          <div ref={rightRef} className={`scroll-slide-right ${rightVisible ? "visible" : ""}`}>
            <Card className="glass-premium p-6 card-glow h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                  <Youtube className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gradient">YouTube Channels on Telegram</h3>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                Access curated written preparation material from top YouTube educators
              </p>

              <div className="space-y-3">
                {youtubeChannels.map((channel, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="w-full justify-start text-left hover:bg-red-600/10 hover:border-red-600 transition-all"
                    onClick={() => window.open(channel.link, "_blank")}
                  >
                    <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center mr-3 flex-shrink-0">
                      <Youtube className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm">{channel.name}</span>
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Motivational Line */}
        <div className="mt-8 max-w-3xl mx-auto">
          <div className="glass-premium p-6 rounded-lg border border-primary/30 backdrop-blur-md bg-black/20">
            <p className="text-lg md:text-xl font-semibold text-gradient mb-2 text-center">
              Together we grow, together we succeed
            </p>
            <p className="text-base md:text-lg text-muted-foreground text-center italic">
              साथ मिलकर हम बढ़ते हैं, साथ मिलकर हम सफल होते हैं
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Telegram;

