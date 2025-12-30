import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WhatSSBDemands from "@/components/WhatSSBDemands";
import StudyMaterials from "@/components/StudyMaterials";
import DefenceForces from "@/components/DefenceForces";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";
import HelicopterAnimation from "@/components/HelicopterAnimation";
import SiteIntroOnce from "@/components/SiteIntroOnce";

const Home = () => {
  return (
    <main className="min-h-screen relative z-10">
      <HelicopterAnimation />
      <ScrollProgress />
      <ScrollToTop />
      <Navigation />
      <SiteIntroOnce ms={15000} tryAutoplayFirst />
      <Hero />
      <WhatSSBDemands />
      <StudyMaterials />
      <DefenceForces />
      <Footer />
    </main>
  );
};

export default Home;
