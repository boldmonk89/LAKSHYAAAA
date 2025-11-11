// src/components/FloatingMenu.tsx
import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  Home,
  Target,
  BookOpen,
  Link as LinkIcon,
  Brain,
  Video,
  MapPin,
  Users,
  Sparkles,
} from "lucide-react";

type Item = { id: string; label: string; icon?: JSX.Element };

const ITEMS: Item[] = [
  { id: "hero",               label: "Home",               icon: <Home size={18} /> },
  { id: "what-ssb-demands",   label: "What SSB Demands",   icon: <Target size={18} /> },
  { id: "study-materials",    label: "Study Materials",    icon: <BookOpen size={18} /> },
  { id: "defence-forces",     label: "Defence Forces",     icon: <LinkIcon size={18} /> },
  { id: "ai-psych-analyzer",  label: "AI PSYCH Analyzer",  icon: <Brain size={18} /> },
  { id: "piq-analyzer",       label: "PIQ Analyzer",       icon: <Target size={18} /> },
  { id: "ai-chatbot",         label: "Major AI Sharma",    icon: <Brain size={18} /> },
  { id: "video-resources",    label: "Video Resources",    icon: <Video size={18} /> },
  { id: "ssb-boards",         label: "SSB Boards",         icon: <MapPin size={18} /> },
  { id: "parents-inspiration", label: "Parents",           icon: <Users size={18} /> },
  { id: "journey-timeline",   label: "Journey",            icon: <Target size={18} /> },
  { id: "communities",        label: "Communities",        icon: <Users size={18} /> },
  { id: "motivation",         label: "Motivation",         icon: <Sparkles size={18} /> },
  { id: "contact",            label: "Contact",            icon: <Home size={18} /> },
];

export default function FloatingMenu() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  // Close on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!open) return;
      const t = e.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(t) &&
        btnRef.current &&
        !btnRef.current.contains(t)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          aria-hidden
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100]"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Panel (above Telegram button area) */}
      <div
        ref={panelRef}
        className={`fixed right-4 bottom-20 sm:bottom-24 z-[110] w-60 origin-bottom-right
          rounded-2xl border border-white/10 bg-black/80 text-white shadow-xl backdrop-blur-md
          transition-all ${open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`}
        role="menu"
        aria-label="Quick navigation"
      >
        <div className="p-2">
          {ITEMS.map((it) => (
            <button
              key={it.id}
              role="menuitem"
              onClick={() => goTo(it.id)}
              className="w-full flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm
                         hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary/60"
            >
              {it.icon}
              <span>{it.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* FAB (place ABOVE Telegram button). If Telegram overlaps, bump z-index. */}
      <button
        ref={btnRef}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="fixed right-4 bottom-4 sm:bottom-6 z-[120] h-12 w-12 rounded-full
                   bg-primary text-black shadow-lg border border-primary/40
                   grid place-items-center hover:brightness-110 active:scale-95 transition"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
    </>
  );
}
