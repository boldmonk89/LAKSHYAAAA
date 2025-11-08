import { useEffect, useState } from 'react';
import ndaImg from '@/assets/nda-new.jpg';
import passoutImg from '@/assets/passout-new.jpg';
import lakshyaImg from '@/assets/lakshya-new.jpg';
import imaImg from '@/assets/ima-new.jpg';

const images = [ndaImg, passoutImg, lakshyaImg, imaImg];

const ParallaxBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate which image to show based on scroll position
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercentage = totalHeight > 0 ? scrollY / totalHeight : 0;
  const imageIndex = Math.min(Math.floor(scrollPercentage * images.length), images.length - 1);
  
  // Parallax offset - moves slower than scroll
  const parallaxOffset = scrollY * 0.5;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {images.map((img, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: imageIndex === index ? 0.9 : 0,
            filter: 'blur(2px)',
            transform: `translateY(${parallaxOffset}px)`,
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  );
};

export default ParallaxBackground;
