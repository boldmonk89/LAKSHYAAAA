import { useEffect, useRef, useState } from "react";
import clip from "@/assets/intro.mp3";

type Props = {
  /** milliseconds to play (default 5000) */
  ms?: number;
  /** try autoplay on load; if blocked, show consent bar */
  tryAutoplayFirst?: boolean;
};

export default function SiteIntroOnce({
  ms = 10000,
  tryAutoplayFirst = true,
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const stopTimer = useRef<number | null>(null);
  const [needConsent, setNeedConsent] = useState(false);

  const stopAudio = () => {
    const a = audioRef.current;
    if (!a) return;
    a.pause();
    a.currentTime = 0;
    a.volume = 1;
  };

  const playFor = async () => {
    const a = (audioRef.current ??= new Audio(clip));
    a.currentTime = 0;
    a.volume = 1;
    await a.play(); // throws NotAllowedError if autoplay blocked
    stopTimer.current = window.setTimeout(() => {
      stopAudio();
      setNeedConsent(false);
    }, ms);
  };

  useEffect(() => {
    let id: number | null = null;

    const start = async () => {
      if (!tryAutoplayFirst) {
        setNeedConsent(true);
        return;
      }
      try {
        await playFor();
      } catch {
        // Autoplay blocked → ask for one click
        setNeedConsent(true);
      }
    };

    // run right after paint
    id = window.setTimeout(start, 0);

    return () => {
      if (id) window.clearTimeout(id);
      if (stopTimer.current) window.clearTimeout(stopTimer.current);
      stopAudio();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!needConsent) return null;

  // Minimal consent UI (shows only if autoplay blocked)
  return (
    <div className="fixed inset-x-0 bottom-4 mx-auto w-[min(92%,520px)] rounded-xl border border-primary/30 bg-black/70 backdrop-blur-md p-4 shadow-2xl z-[9999] text-white">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm">
          <div className="font-semibold">Play sound?</div>
          <div>We’ll play ~10 seconds, then stop.</div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setNeedConsent(false)}
            className="px-3 py-2 rounded-lg border"
          >
            Not now
          </button>
          <button
            onClick={async () => {
              try {
                await playFor();
              } catch {
                setNeedConsent(false);
              }
            }}
            className="px-3 py-2 rounded-lg border bg-black text-white"
          >
            Play
          </button>
        </div>
      </div>
    </div>
    );
}



