// src/components/FloatingMenu.tsx
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Bot,
  BookOpen,
} from "lucide-react";

type Item = { path: string; label: string; icon: JSX.Element };

const ITEMS: Item[] = [
  { path: "/", label: "Home", icon: <Home size={18} /> },
  { path: "/ai-tools", label: "AI Tools", icon: <Bot size={18} /> },
  { path: "/resources", label: "Resources", icon: <BookOpen size={18} /> },
];

export default function FloatingMenu() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

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

  const goTo = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

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
        className={`fixed right-4 bottom-20 sm:bottom-24 z-[110] w-48 origin-bottom-right
          rounded-2xl border border-white/10 bg-black/80 text-white shadow-xl backdrop-blur-md
          transition-all ${open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`}
        role="menu"
        aria-label="Quick navigation"
      >
        <div className="p-2">
          {ITEMS.map((it) => (
            <button
              key={it.path}
              role="menuitem"
              onClick={() => goTo(it.path)}
              className={`w-full flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm
                         hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary/60
                         ${isActive(it.path) ? "bg-primary/20 text-primary" : ""}`}
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
