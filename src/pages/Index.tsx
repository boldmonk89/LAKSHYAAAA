import SiteIntroOnce from "@/components/SiteIntroOnce";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WhatSSBDemands from "@/components/WhatSSBDemands";
import StudyMaterials from "@/components/StudyMaterials";
import DefenceForces from "@/components/DefenceForces";
import AIPsychAnalyzer from "@/components/AIPsychAnalyzer";
import VideoResources from "@/components/VideoResources";
import SSBBoards from "@/components/SSBBoards";
import Telegram from "@/components/Telegram";
import Motivation from "@/components/Motivation";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import TelegramFAB from "@/components/TelegramFAB";

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
      <Navigation />

      {/* 🔊 Plays ~5s on each load; if autoplay is blocked, shows a tiny consent bar */}
      <SiteIntroOnce ms={5000} tryAutoplayFirst />

      <Hero />
      <WhatSSBDemands />
      <StudyMaterials />
      <DefenceForces />
      <AIPsychAnalyzer />
      <VideoResources />
      <SSBBoards />
      <Telegram />
      <Motivation />
      <Contact />
      <Footer />
      <TelegramFAB />
    </main>
  );
};

export default Index;


