import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Play } from "lucide-react";
import backgroundImage from "@/assets/nda-background.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const videos = [
  {
    title: "Screening Test",
    description: "Complete guide to OIR and PPDT",
    videoId: "NCe0TC9bDiE",
    thumbnail: "https://img.youtube.com/vi/NCe0TC9bDiE/maxresdefault.jpg",
    duration: "Live Session"
  },
  {
    title: "Psychology Test",
    description: "TAT, WAT, SRT, and SD explained",
    videoId: "-9nYV78MpAk",
    thumbnail: "https://img.youtube.com/vi/-9nYV78MpAk/maxresdefault.jpg",
    duration: "Detailed Guide"
  },
  {
    title: "Interview",
    description: "Personal interview tips and strategies",
    videoId: "WZecSmzMCfs",
    thumbnail: "https://img.youtube.com/vi/WZecSmzMCfs/maxresdefault.jpg",
    duration: "Expert Insights"
  },
  {
    title: "GTO Tasks",
    description: "Group testing officer outdoor tasks",
    videoId: "VdgWEqxWojQ",
    thumbnail: "https://img.youtube.com/vi/VdgWEqxWojQ/maxresdefault.jpg",
    duration: "Practical Demo"
  },
  {
    title: "Sample TAT Stories",
    description: "TAT story examples and analysis",
    videoId: "BTEM0BeT9nU",
    thumbnail: "https://img.youtube.com/vi/BTEM0BeT9nU/maxresdefault.jpg",
    duration: "Channel"
  },
];

const VideoCard = ({ video, index }: { video: typeof videos[0], index: number }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  
  return (
    <div
      ref={ref}
      className={`scroll-zoom ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <Card 
        className="glass-premium overflow-hidden transition-all duration-300 hover:scale-105 card-glow group"
      >
        {/* Video Embed - Always Embedded */}
        <div className="relative aspect-video overflow-hidden bg-black/50">
          {isPlaying ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="relative w-full h-full cursor-pointer" onClick={() => setIsPlaying(true)}>
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/60">
                <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center backdrop-blur-sm">
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Video Info */}
        <div className="p-5">
          <h3 className="text-xl font-bold text-foreground mb-2">
            {video.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {video.description}
          </p>
          <span className="text-xs text-primary font-medium px-3 py-1 bg-primary/10 rounded-full inline-block">
            {video.duration}
          </span>
        </div>
      </Card>
    </div>
  );
};

const VideoResources = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section id="video-resources" className="relative py-24 px-4 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.75,
          filter: 'blur(8px)',
        }}
      />
      
      {/* Overlay - 10% opacity */}
      

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto">
        <div ref={titleRef} className={`text-center mb-16 scroll-fade-up ${titleVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
            Video Resources
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Expert-curated video content covering all SSB stages
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <VideoCard key={index} video={video} index={index} />
          ))}
        </div>

        {/* Motivational Line */}
        <div ref={(el) => {
          if (el && !el.dataset.observed) {
            el.dataset.observed = 'true';
            const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  entry.target.classList.add('visible');
                }
              });
            }, { threshold: 0.2 });
            observer.observe(el);
          }
        }} className="scroll-fade-up mt-8 max-w-3xl mx-auto">
          <div className="glass-premium p-6 rounded-lg border border-primary/30 backdrop-blur-md bg-black/20">
            <p className="text-lg md:text-xl font-semibold text-foreground mb-2 text-center">
              Learn from those who succeeded, apply what you learned
            </p>
            <p className="text-base md:text-lg text-muted-foreground text-center italic">
              जो सफल हुए उनसे सीखो, जो सीखा उसे लागू करो
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoResources;
