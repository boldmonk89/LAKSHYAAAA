import SiteIntroOnce from "@/components/SiteIntroOnce";
import Hero from "@/components/Hero";
import WhatSSBDemands from "@/components/WhatSSBDemands";
import StudyMaterials from "@/components/StudyMaterials";
import DefenceForces from "@/components/DefenceForces";
import Motivation from "@/components/Motivation";
import SSBTipsCarousel from "@/components/SSBTipsCarousel";
import FounderMessage from "@/components/FounderMessage";
import HelicopterAnimation from "@/components/HelicopterAnimation";

const Home = () => {
  return (
    <>
      <HelicopterAnimation />
      <SiteIntroOnce ms={15000} tryAutoplayFirst />
      <Hero />
      <WhatSSBDemands />
      <StudyMaterials />
      <DefenceForces />
      <Motivation />
      <SSBTipsCarousel />
      <FounderMessage />
    </>
  );
};

export default Home;
