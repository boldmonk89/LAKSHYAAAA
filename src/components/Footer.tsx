import { Mail, Instagram, Send } from "lucide-react";
import backgroundImage from "@/assets/soldiers-celebration.jpg";

const Footer = () => {
  return (
    <footer className="relative py-12 px-4 overflow-hidden">
      {/* Fixed Background - visible through footer */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Email */}
          <div className="text-center">
            <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gradient mb-2">Email</h3>
            <a 
              href="mailto:tejasraghav251@gmail.com"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              tejasraghav251@gmail.com
            </a>
          </div>

          {/* Instagram */}
          <div className="text-center">
            <Instagram className="w-8 h-8 text-pink-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gradient mb-2">Instagram</h3>
            <a 
              href="https://www.instagram.com/tejasraghavvv/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-pink-500 transition-colors"
            >
              @tejasraghavvv
            </a>
          </div>

          {/* Telegram */}
          <div className="text-center">
            <Send className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gradient mb-2">Telegram</h3>
            <a 
              href="https://t.me/scorchiee"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-blue-400 transition-colors"
            >
              @scorchiee
            </a>
          </div>
        </div>

        <div className="border-t border-primary/20 pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 SSB Preparation Hub. Made with dedication for aspiring officers.
          </p>
          <p className="text-center text-xs text-muted-foreground mt-2 italic">
            सेवा, सम्मान, साहस - Service, Honor, Courage
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
