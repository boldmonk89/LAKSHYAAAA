import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, MessageSquare, ThumbsUp, Send } from "lucide-react";
import backgroundImage from "@/assets/nda-building.jpg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author_name: string;
  category: string;
  likes: number;
  created_at: string;
  user_id: string;
}

const categories = ["Experiences", "Preparation Tips", "Questions", "Success Stories"];

const ForumPage = () => {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewPost, setShowNewPost] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check auth
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('forum_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error",
        description: "Failed to load posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('forum_posts')
        .insert({
          user_id: user.id,
          author_name: user.user_metadata?.name || user.email?.split('@')[0] || 'Anonymous',
          title: title.trim(),
          content: content.trim(),
          category,
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your post has been created",
      });

      setTitle("");
      setContent("");
      setCategory("");
      setShowNewPost(false);
      fetchPosts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create post",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.75,
          filter: 'blur(8px)',
        }}
      />
      <div className="fixed inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="relative z-20 min-h-screen py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-foreground hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <Button
              onClick={() => setShowNewPost(!showNewPost)}
              className="bg-primary hover:bg-primary-glow"
            >
              {showNewPost ? "Cancel" : "Create New Post"}
            </Button>
          </div>

          {/* New Post Form */}
          {showNewPost && (
            <Card className="glass-premium p-6 mb-8 card-glow">
              <h3 className="text-2xl font-bold text-foreground mb-4">Create New Post</h3>
              <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What's your post about?"
                    className="bg-background/50"
                    maxLength={200}
                  />
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Share your thoughts, experiences, or questions..."
                    className="bg-background/50 min-h-[200px]"
                    maxLength={2000}
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary-glow">
                  <Send className="w-4 h-4 mr-2" />
                  Post to Forum
                </Button>
              </form>
            </Card>
          )}

          {/* Posts List */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gradient">All Discussions</h2>
            
            {loading ? (
              <Card className="glass-premium p-12 text-center">
                <p className="text-muted-foreground">Loading posts...</p>
              </Card>
            ) : posts.length === 0 ? (
              <Card className="glass-premium p-12 text-center">
                <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-xl text-muted-foreground">No posts yet. Be the first to start a discussion!</p>
              </Card>
            ) : (
              posts.map((post) => (
                <Card key={post.id} className="glass-premium p-6 card-glow hover:scale-[1.02] transition-all duration-300">
                  <div className="mb-3">
                    <span className="text-xs font-semibold text-primary bg-primary/20 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {post.title}
                  </h3>
                  <p className="text-foreground/80 mb-4 whitespace-pre-wrap">
                    {post.content}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="font-medium text-primary">{post.author_name}</span>
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
