import SiteIntroOnce from "@/components/SiteIntroOnce";
import Hero from "@/components/Hero";
import WhatSSBDemands from "@/components/WhatSSBDemands";
import StudyMaterials from "@/components/StudyMaterials";
import DefenceForces from "@/components/DefenceForces";
import Motivation from "@/components/Motivation";
import SSBTipsCarousel from "@/components/SSBTipsCarousel";
import FounderMessage from "@/components/FounderMessage";
import AIPsychAnalyzer from "@/components/AIPsychAnalyzer";
import PiqAnalyzer from "@/components/PiqAnalyzer";
import AIChatbot from "@/components/AIChatbot";
import VideoResources from "@/components/VideoResources";
import SSBBoards from "@/components/SSBBoards";
import ParentsInspiration from "@/components/ParentsInspiration";
import JourneyTimeline from "@/components/JourneyTimeline";
import Telegram from "@/components/Telegram";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import TelegramFAB from "@/components/TelegramFAB";
import HelicopterAnimation from "@/components/HelicopterAnimation";

const Index = () => {
  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <ScrollToTop />
      <HelicopterAnimation />
      <SiteIntroOnce ms={15000} tryAutoplayFirst />
      <Hero />
      <WhatSSBDemands />
      <StudyMaterials />
      <DefenceForces />
      <Motivation />
      <SSBTipsCarousel />
      <FounderMessage />
      <AIPsychAnalyzer />
      <PiqAnalyzer />
      <AIChatbot />
      <VideoResources />
      <SSBBoards />
      <ParentsInspiration />
      <JourneyTimeline />
      <Telegram />
      <Contact />
      <Footer />
      <TelegramFAB />
    </main>
  );
};

export default Index;
