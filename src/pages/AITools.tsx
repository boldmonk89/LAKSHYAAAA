import AIPsychAnalyzer from "@/components/AIPsychAnalyzer";
import PiqAnalyzer from "@/components/PiqAnalyzer";
import AIChatbot from "@/components/AIChatbot";
import VideoResources from "@/components/VideoResources";

const AITools = () => {
  return (
    <div className="pt-20">
      <AIPsychAnalyzer />
      <PiqAnalyzer />
      <AIChatbot />
      <VideoResources />
    </div>
  );
};

export default AITools;
