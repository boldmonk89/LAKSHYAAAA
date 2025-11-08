import SiteIntroOnce from "@/components/SiteIntroOnce";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WhatSSBDemands from "@/components/WhatSSBDemands";
import StudyMaterials from "@/components/StudyMaterials";
import ParentsInspiration from "@/components/ParentsInspiration";
import DefenceForces from "@/components/DefenceForces";
import JourneyTimeline from "@/components/JourneyTimeline";
import AIPsychAnalyzer from "@/components/AIPsychAnalyzer";
import VideoResources from "@/components/VideoResources";
import SSBBoards from "@/components/SSBBoards";
import Telegram from "@/components/Telegram";
import Motivation from "@/components/Motivation";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import SSBTipsCarousel from "@/components/SSBTipsCarousel";
import TelegramFAB from "@/components/TelegramFAB";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";



const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <ScrollToTop />
      <Navigation />

      {/* 🔊 Plays ~10s on each load; if autoplay is blocked, shows a tiny consent bar */}
      <SiteIntroOnce ms={15000} tryAutoplayFirst />

      <Hero />
      <WhatSSBDemands />
      <StudyMaterials />
      <DefenceForces />
      <AIPsychAnalyzer />
      <VideoResources />
      <SSBBoards />
      <ParentsInspiration />
      <JourneyTimeline />
      <Telegram />
      <Motivation />
      <Contact />
      <SSBTipsCarousel />
      <Footer />
      <TelegramFAB />
    </main>
  );
};

export default Index;


