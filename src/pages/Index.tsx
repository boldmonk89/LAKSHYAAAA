import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WhatSSBDemands from "@/components/WhatSSBDemands";
import StudyMaterials from "@/components/StudyMaterials";
import AIPsychAnalyzer from "@/components/AIPsychAnalyzer";
import VideoResources from "@/components/VideoResources";
import SSBBoards from "@/components/SSBBoards";
import Telegram from "@/components/Telegram";
import Motivation from "@/components/Motivation";
import Contact from "@/components/Contact";
import Loader from "@/components/Loader";
import TelegramFAB from "@/components/TelegramFAB";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Minimum 2 seconds loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <WhatSSBDemands />
      <StudyMaterials />
      <AIPsychAnalyzer />
      <VideoResources />
      <SSBBoards />
      <Telegram />
      <Motivation />
      <Contact />
      <TelegramFAB />
    </main>
  );
};

export default Index;
