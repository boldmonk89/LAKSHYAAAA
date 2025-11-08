import { useEffect, useState } from "react";
import ndaImg from "@/assets/nda-new.jpg";
import passoutImg from "@/assets/passout-new.jpg";
import lakshyaImg from "@/assets/lakshya-new.jpg";
import imaImg from "@/assets/ima-new.jpg";

const images = [ndaImg, passoutImg, lakshyaImg, imaImg];

const ParallaxBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const totalHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrollPct = totalHeight > 0 ? scrollY / totalHeight : 0;
  const imageIndex = Math.min(
    Math.floor(scrollPct * images.length),
    images.length - 1
  );
  const parallaxOffset = scrollY * 0.5;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div className="absolute inset-0">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              i === imageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ transform: `translateY(${parallaxOffset * 0.2}px)` }}
          />
        ))}
        {/* Gentle darken so text stays readable, but can't block clicks */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
    </div>
  );
};

export default ParallaxBackground;

