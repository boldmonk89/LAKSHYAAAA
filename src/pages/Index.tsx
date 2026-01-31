import SiteIntroOnce from "@/components/SiteIntroOnce";
import Hero from "@/components/Hero";
import WhatSSBDemands from "@/components/WhatSSBDemands";
import StudyMaterials from "@/components/StudyMaterials";
import DefenceForces from "@/components/DefenceForces";
import Motivation from "@/components/Motivation";
import SSBTipsCarousel from "@/components/SSBTipsCarousel";
import AIPsychAnalyzer from "@/components/AIPsychAnalyzer";
import PiqAnalyzer from "@/components/PiqAnalyzer";
import AIChatbot from "@/components/AIChatbot";
import WhatsAppCommunity from "@/components/WhatsAppCommunity";
import DailyNews from "@/components/DailyNews";
import VideoResources from "@/components/VideoResources";
import SSBBoards from "@/components/SSBBoards";
import ParentsInspiration from "@/components/ParentsInspiration";
import JourneyTimeline from "@/components/JourneyTimeline";
import Telegram from "@/components/Telegram";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <ScrollToTop />
      <SiteIntroOnce ms={15000} tryAutoplayFirst />
      <Hero />
      <WhatSSBDemands />
      <StudyMaterials />
      <AIPsychAnalyzer />
      <PiqAnalyzer />
      <AIChatbot />
      <WhatsAppCommunity />
      <DailyNews />
      <DefenceForces />
      <Motivation />
      <VideoResources />
      <SSBBoards />
      <ParentsInspiration />
      <JourneyTimeline />
      <Telegram />
      <SSBTipsCarousel />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
