import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Play, Youtube, ExternalLink } from "lucide-react";
import backgroundImage from "@/assets/nda-background.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { invokeWithRetry } from "@/hooks/useRetryFetch";
import { Badge } from "@/components/ui/badge";

interface ChannelVideo {
  title: string;
  videoId: string;
  thumbnail: string;
  pubDate: string;
  description: string;
}

const staticVideos = [
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

const VideoCard = ({ video, index }: { video: typeof staticVideos[0], index: number }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  
  return (
    <div ref={ref} className={`scroll-zoom ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${index * 0.1}s` }}>
      <Card className="glass-premium overflow-hidden transition-all duration-300 hover:scale-105 card-glow group">
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
              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/60">
                <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center backdrop-blur-sm">
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="text-xl font-bold text-foreground mb-2">{video.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{video.description}</p>
          <span className="text-xs text-primary font-medium px-3 py-1 bg-primary/10 rounded-full inline-block">{video.duration}</span>
        </div>
      </Card>
    </div>
  );
};

const ChannelVideoCard = ({ video, index }: { video: ChannelVideo, index: number }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch { return ''; }
  };

  return (
    <div ref={ref} className={`scroll-zoom ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${index * 0.1}s` }}>
      <Card className="glass-premium overflow-hidden transition-all duration-300 hover:scale-105 card-glow group">
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
              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/60">
                <div className="w-16 h-16 rounded-full bg-destructive/80 flex items-center justify-center backdrop-blur-sm">
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-[10px]">
              <Youtube className="w-3 h-3 mr-1" /> Career247
            </Badge>
            <span className="text-xs text-muted-foreground">{formatDate(video.pubDate)}</span>
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">{video.title}</h3>
        </div>
      </Card>
    </div>
  );
};

const VideoResources = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const [channelVideos, setChannelVideos] = useState<ChannelVideo[]>([]);

  useEffect(() => {
    const fetchChannelVideos = async () => {
      try {
        const { data, error } = await invokeWithRetry<any>('fetch-youtube-videos', {}, { maxRetries: 2, retryDelay: 2000 });
        if (!error && data?.success && data?.videos) {
          setChannelVideos(data.videos);
        }
      } catch (err) {
        console.error('Error fetching channel videos:', err);
      }
    };
    fetchChannelVideos();
  }, []);

  return (
    <section id="video-resources" className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.75, filter: 'blur(8px)' }} />
      <div className="absolute inset-0 bg-black/20 z-10" />

      <div className="relative z-20 max-w-7xl mx-auto">
        <div ref={titleRef} className={`text-center mb-16 scroll-fade-up ${titleVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-3 text-gradient glow">Video Resources</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Expert-curated video content covering all SSB stages</p>
        </div>

        {/* SSB Guide Videos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staticVideos.map((video, index) => (
            <VideoCard key={index} video={video} index={index} />
          ))}
        </div>

        {/* Channel Videos */}
        {channelVideos.length > 0 && (
          <div className="mt-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Latest from <span className="text-gradient">Career247</span>
              </h3>
              <a
                href="https://youtube.com/@career247official"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Youtube className="w-4 h-4" /> Subscribe to Channel <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {channelVideos.slice(0, 6).map((video, index) => (
                <ChannelVideoCard key={video.videoId} video={video} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Motivational Line */}
        <div ref={(el) => {
          if (el && !el.dataset.observed) {
            el.dataset.observed = 'true';
            const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
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
