import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const navItems = [
    { label: "Home", id: "hero" },
    { label: "What SSB Demands", id: "what-ssb-demands" },
    { label: "Study Materials", id: "study-materials" },
    { label: "Defence Forces", id: "defence-forces" },
    { label: "AI PSYCH Analyzer", id: "ai-psych-analyzer" },
    { label: "PIQ Analyzer", id: "piq-analyzer" },
    { label: "Major AI Sharma", id: "ai-chatbot" },
    { label: "Video Resources", id: "video-resources" },
    { label: "SSB Boards", id: "ssb-boards" },
    { label: "Parents", id: "parents-inspiration" },
    { label: "Journey", id: "journey-timeline" },
    { label: "Communities", id: "communities" },
    { label: "Motivation", id: "motivation" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-premium shadow-xl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gradient">LAKSHYA</h1>
          </div>

          {/* Desktop Navigation - Scrollable */}
          <div className="hidden md:flex items-center overflow-x-auto scrollbar-hide max-w-3xl">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => scrollToSection(item.id)}
                  className="text-foreground/80 hover:text-primary hover:bg-primary/10 transition-colors whitespace-nowrap flex-shrink-0"
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-foreground/80 hover:text-primary hover:bg-primary/10 justify-start"
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
