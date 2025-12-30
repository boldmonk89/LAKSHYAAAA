import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Bot, User, Mic, Volume2, VolumeX } from "lucide-react";
import { toast } from "sonner";
import { invokeWithRetry } from "@/hooks/useRetryFetch";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Namaste! Main Major AI Sharma hoon. Aap mujhse defence forces, SSB preparation, Officer Like Qualities ya koi bhi sawaal pooch sakte hain. Main aapki madad ke liye yahan hoon!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const scrollToBottom = () => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const speakText = async (text: string) => {
    try {
      setIsSpeaking(true);
      
      // Stop any currently playing audio
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }

      const { data, error } = await invokeWithRetry<{ audioContent: string }>(
        "text-to-speech",
        { text, voice: "nova" },
        {
          maxRetries: 3,
          retryDelay: 2000,
          onRetry: (attempt) => {
            toast.info(`Voice service waking up... Retry ${attempt}/3`);
          }
        }
      );

      if (error) throw error;
      if (!data?.audioContent) throw new Error('No audio content received');

      // Use data URI for base64 audio - browser handles decoding natively
      const audioUrl = `data:audio/mpeg;base64,${data.audioContent}`;
      const audio = new Audio(audioUrl);
      currentAudioRef.current = audio;
      
      audio.onended = () => {
        setIsSpeaking(false);
        currentAudioRef.current = null;
      };
      
      audio.onerror = () => {
        setIsSpeaking(false);
        currentAudioRef.current = null;
        toast.error("Audio playback failed");
      };
      
      await audio.play();
    } catch (error) {
      console.error("Error speaking text:", error);
      setIsSpeaking(false);
      toast.error("Voice service unavailable. Try again.");
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        
        reader.onloadend = async () => {
          const base64Audio = (reader.result as string).split(',')[1];
          
          try {
            toast.info("Transcribing audio...");
            const { data, error } = await invokeWithRetry<{ text: string }>(
              "voice-to-text",
              { audio: base64Audio },
              {
                maxRetries: 3,
                retryDelay: 2000,
                onRetry: (attempt) => {
                  toast.info(`Voice service waking up... Retry ${attempt}/3`);
                }
              }
            );

            if (error) throw error;
            if (!data?.text) throw new Error('No transcription received');
            
            setInput(data.text);
            toast.success("Voice recorded successfully!");
          } catch (error) {
            console.error("Error transcribing audio:", error);
            toast.error("Failed to transcribe audio. Try again.");
          }
        };
        
        reader.readAsDataURL(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast.success("Recording started...");
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast.error("Microphone access denied");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await invokeWithRetry<{ response: string }>(
        "ai-chat",
        { messages: [...messages, userMessage] },
        {
          maxRetries: 3,
          retryDelay: 3000,
          onRetry: (attempt) => {
            toast.info(`Backend waking up... Retry ${attempt}/3`);
          }
        }
      );

      if (error) {
        throw error;
      }

      if (!data || !data.response) {
        throw new Error('Empty response from AI');
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      
      // Auto-speak response if enabled
      if (autoSpeak) {
        await speakText(data.response);
      }
    } catch (error: any) {
      console.error("Error:", error);
      const errorMessage = error?.message || "Failed to get response";
      
      if (errorMessage.includes('Rate limit')) {
        toast.error("Too many requests. Please wait a moment.");
      } else {
        toast.error("Failed to get response. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-chatbot" className="relative py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="relative z-20 container mx-auto max-w-4xl">
        <Card className="border-2 border-primary/20">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Bot className="w-8 h-8 text-primary" />
                <div>
                  <div className="font-bold">Major AI Sharma</div>
                  <div className="text-sm font-normal text-muted-foreground">
                    Your AI Defence Career Advisor
                  </div>
                </div>
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setAutoSpeak(!autoSpeak)}
                className="h-10 w-10"
              >
                {autoSpeak ? (
                  <Volume2 className="h-5 w-5 text-primary" />
                ) : (
                  <VolumeX className="h-5 w-5 text-muted-foreground" />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div ref={listRef} className="space-y-4 mb-4 h-[400px] overflow-y-auto pr-2">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${message.role === "assistant" ? "" : "flex-row-reverse"}`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === "assistant" ? "bg-primary/10" : "bg-accent/10"
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
                      message.role === "assistant" ? "bg-secondary/50" : "bg-primary/10"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
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
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about defence forces, SSB, OLQs, or general questions..."
                className="min-h-[80px]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  size="icon"
                  className="h-[36px] w-[80px]"
                  variant={isRecording ? "destructive" : "secondary"}
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isLoading}
                >
                  <Mic className={`w-5 h-5 ${isRecording ? 'animate-pulse' : ''}`} />
                </Button>
                <Button 
                  type="submit" 
                  size="icon" 
                  className="h-[36px] w-[80px]" 
                  disabled={isLoading || !input.trim()}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AIChatbot;
