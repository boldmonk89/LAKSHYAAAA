import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, BookOpen, Award, TrendingUp, PlusCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import backgroundImage from "@/assets/nda-building.jpg";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author_name: string;
  category: string;
  likes: number;
  created_at: string;
  reply_count?: number;
}

const categories = [
  { name: "Experiences", icon: BookOpen, description: "Share your SSB experiences" },
  { name: "Preparation Tips", icon: TrendingUp, description: "Study strategies and advice" },
  { name: "Questions", icon: MessageSquare, description: "Ask anything about SSB" },
  { name: "Success Stories", icon: Award, description: "Celebrate your achievements" },
];

const Forum = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check auth
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('forum_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create a post",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }
    navigate('/forum');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <section id="forum" className="relative py-24 px-4 overflow-hidden">
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
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto">
        <div ref={titleRef} className={`text-center mb-12 scroll-fade-up ${titleVisible ? 'visible' : ''}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-10 h-10 text-primary" />
            <h2 className="text-4xl md:text-6xl font-bold text-gradient">
              Community Forum
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Connect with fellow defense aspirants. Share experiences, ask questions, and learn together.
          </p>
          <Button 
            size="lg"
            onClick={handleCreatePost}
            className="bg-primary hover:bg-primary-glow shadow-glow transition-all duration-300 hover:scale-105"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Create New Post
          </Button>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {categories.map((category, index) => (
            <div
              key={index}
              ref={(el) => {
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
              }}
              className="scroll-zoom"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className="glass-premium p-6 card-glow hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Recent Posts */}
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
        }} className="scroll-fade-up">
          <h3 className="text-3xl font-bold text-foreground mb-6 text-center">Recent Discussions</h3>
          
          {loading ? (
            <div className="text-center text-muted-foreground">Loading discussions...</div>
          ) : posts.length === 0 ? (
            <Card className="glass-premium p-12 text-center">
              <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl text-muted-foreground mb-4">No posts yet. Be the first to start a discussion!</p>
              <Button onClick={handleCreatePost} className="bg-primary hover:bg-primary-glow">
                Create First Post
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <div
                  key={post.id}
                  ref={(el) => {
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
                  }}
                  className="scroll-zoom"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className="glass-premium p-6 card-glow hover:scale-105 transition-all duration-300 cursor-pointer h-full">
                    <div className="mb-3">
                      <span className="text-xs font-semibold text-primary bg-primary/20 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {post.content}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>by {post.author_name}</span>
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          )}

          {posts.length > 0 && (
            <div className="text-center mt-8">
              <Button 
                variant="outline"
                size="lg"
                onClick={() => navigate('/forum')}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                View All Discussions
              </Button>
            </div>
          )}
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
              Together we rise, together we serve
            </p>
            <p className="text-base md:text-lg text-muted-foreground text-center italic">
              साथ मिलकर हम उठते हैं, साथ मिलकर हम सेवा करते हैं
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Forum;
