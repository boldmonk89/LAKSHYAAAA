import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const TelegramFAB = () => {
  const telegramLink = "https://t.me/lakshyaaontop";

  return (
    <Button
      onClick={() => window.open(telegramLink, '_blank')}
      className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-primary hover:bg-primary-glow shadow-glow transition-all duration-300 hover:scale-110 animate-pulse"
      size="icon"
      aria-label="Join Telegram Channel"
    >
      <Send className="w-6 h-6" />
    </Button>
  );
};

export default TelegramFAB;
