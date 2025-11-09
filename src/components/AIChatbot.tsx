import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Bot, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Namaste! I'm Major AI Sharma. Ask me anything about defence forces, SSB preparation, Officer Like Qualities, or any general questions. मैं आपकी मदद के लिए यहां हूं!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { message: input }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: "assistant",
        content: data.response
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to get response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-chatbot" className="relative py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="relative z-20 container mx-auto max-w-4xl">
        <Card className="border-2 border-primary/20 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Bot className="w-8 h-8 text-primary" />
              <div>
                <div className="font-bold">Major AI Sharma</div>
                <div className="text-sm font-normal text-muted-foreground">
                  Your AI Defence Career Advisor
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4 mb-4 h-[400px] overflow-y-auto pr-2">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.role === "assistant" ? "" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === "assistant"
                        ? "bg-primary/10"
                        : "bg-accent/10"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <Bot className="w-5 h-5 text-primary" />
                    ) : (
                      <User className="w-5 h-5 text-accent" />
                    )}
                  </div>
                  <div
                    className={`flex-1 p-4 rounded-lg ${
                      message.role === "assistant"
                        ? "bg-secondary/50"
                        : "bg-primary/10"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary animate-pulse" />
                  </div>
                  <div className="flex-1 p-4 rounded-lg bg-secondary/50">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about defence forces, SSB, OLQs, or general questions..."
                className="min-h-[80px]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <Button
                type="submit"
                size="icon"
                className="h-[80px] w-[80px]"
                disabled={isLoading || !input.trim()}
              >
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AIChatbot;
