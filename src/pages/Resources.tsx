import Navigation from "@/components/Navigation";
import VideoResources from "@/components/VideoResources";
import SSBBoards from "@/components/SSBBoards";
import ParentsInspiration from "@/components/ParentsInspiration";
import JourneyTimeline from "@/components/JourneyTimeline";
import Telegram from "@/components/Telegram";
import Motivation from "@/components/Motivation";
import SSBTipsCarousel from "@/components/SSBTipsCarousel";
import FounderMessage from "@/components/FounderMessage";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";
import { BookOpen, MapPin, Users, Video } from "lucide-react";
import { useEffect } from "react";

const Resources = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen relative z-10">
      <ScrollProgress />
      <ScrollToTop />
      <Navigation />
      
      {/* Hero Section for Resources */}
      <section className="relative pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient glow mb-6">
            SSB Resources & Guidance
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Everything you need for your SSB journey - video tutorials, SSB boards info, 
            inspiring stories, and community support.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <div className="glass-card p-4 rounded-lg flex items-center gap-3">
              <Video className="w-6 h-6 text-primary" />
              <span>Videos</span>
            </div>
            <div className="glass-card p-4 rounded-lg flex items-center gap-3">
              <MapPin className="w-6 h-6 text-primary" />
              <span>SSB Boards</span>
            </div>
            <div className="glass-card p-4 rounded-lg flex items-center gap-3">
              <Users className="w-6 h-6 text-primary" />
              <span>Community</span>
            </div>
            <div className="glass-card p-4 rounded-lg flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-primary" />
              <span>Guidance</span>
            </div>
          </div>
        </div>
      </section>

      <VideoResources />
      <SSBBoards />
      <ParentsInspiration />
      <JourneyTimeline />
      <Telegram />
      <Motivation />
      <SSBTipsCarousel />
      <FounderMessage />
      <Contact />
      <Footer />
    </main>
  );
};

export default Resources;
