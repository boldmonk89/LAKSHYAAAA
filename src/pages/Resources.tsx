import SSBBoards from "@/components/SSBBoards";
import ParentsInspiration from "@/components/ParentsInspiration";
import JourneyTimeline from "@/components/JourneyTimeline";
import Telegram from "@/components/Telegram";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Resources = () => {
  return (
    <div className="pt-20">
      <SSBBoards />
      <ParentsInspiration />
      <JourneyTimeline />
      <Telegram />
      <Contact />
      <Footer />
    </div>
  );
};

export default Resources;
