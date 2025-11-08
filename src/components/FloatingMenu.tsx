import { useEffect, useRef, useState } from "react";
import {
  Menu, X, Home, Target, BookOpen,
  Link as LinkIcon, Brain, Video, MapPin, Users
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

type Item = { id: string; label: string; icon: JSX.Element };

const ITEMS: Item[] = [
  { id: "hero",              label: "Home",              icon: <Home size={18} /> },
  { id: "what-ssb-demands",  label: "What SSB Demands",  icon: <Target size={18} /> },
  { id: "study-materials",   label: "Study Materials",   icon: <BookOpen size={18} /> },
  { id: "defence-links",     label: "Defence Links",     icon: <LinkIcon size={18} /> },
  { id: "ai-psych-analyzer", label: "AI Psych Analyzer", icon: <Brain size={18} /> },
  { id: "video-resources",   label: "Video Resources",   icon: <Video size={18} /> },
  { id: "board-locations",   label: "Board Locations",   icon: <MapPin size={18} /> },
  { id: "ssb-communities",   label: "SSB Communities",   icon: <Users size={18} /> },
];

// ---- helpers --------------------------------------------------------------

/** Try smooth-scroll to element id; returns true if found */
const smoothScrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
};

/** On first paint or hash change, auto-scroll to #hash if present */
const useHashAutoScroll = () => {
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.replace("#", ""));
    if (!hash) return;
    // try now, or one frame later if DOM mounts slightly later
    if (!smoothScrollTo(hash)) {
      requestAnimationFrame(() => smoothScrollTo(hash));
    }
  }, []);
};

// --------------------------------------------------------------------------

export default function FloatingMenu() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const pendingScrollRef = useRef<string | null>(null);

  useHashAutoScroll();

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
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const goTo = (id: string) => {
    // 1) Try on current page
    const ok = smoothScrollTo(id);
    setOpen(false);
    if (ok) {
      // sync URL hash without scrolling again
      history.replaceState(null, "", `#${id}`);
      return;
    }

    // 2) Not found: navigate to home with hash (or keep same path but set hash)
    console.warn(`Section id="${id}" not found on this page. Navigating...`);
    pendingScrollRef.current = id;

    // If sections are on "/", go there; else just set hash on current path.
    // Adjust this if your sections live on a specific route.
    const target = `/#${id}`;
    if (location.pathname !== "/") {
      navigate(target);
    } else {
      // same route: set hash -> effect below will handle scroll
      navigate(`#${id}`);
    }
  };

  // After navigation or hash change, try pending scroll once DOM is ready
  useEffect(() => {
    if (!pendingScrollRef.current) return;
    const id = pendingScrollRef.current;

    const tryScroll = () => {
      const ok = smoothScrollTo(id);
      if (ok) pendingScrollRef.current = null;
      return ok;
    };

    if (!tryScroll()) {
      requestAnimationFrame(() => tryScroll());
    }
  }, [location]);

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

      {/* Panel */}
      <div
        ref={panelRef}
        className={`fixed right-4 bottom-28 sm:bottom-28 z-[110] w-64 origin-bottom-right
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
                         hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary/60
                         pointer-events-auto"
            >
              {it.icon}
              <span>{it.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* FAB */}
      <button
        ref={btnRef}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(v => !v)}
        className="fixed right-4 bottom-16 sm:bottom-16 z-[120] h-12 w-12 rounded-full
                   bg-primary text-primary-foreground shadow-2xl border border-primary/40
                   grid place-items-center hover:brightness-110 active:scale-95 transition
                   pointer-events-auto"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
    </>
  );
}

