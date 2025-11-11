import { useEffect, useState } from "react";

const HelicopterAnimation = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide after animation completes (3 seconds)
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      <div className="helicopter-flight">
        <div className="text-6xl">🚁</div>
      </div>
      <style>{`
        @keyframes helicopterFly {
          0% {
            transform: translateY(100vh) translateX(-50%) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-20vh) translateX(-50%) rotate(0deg);
            opacity: 0;
          }
        }

        .helicopter-flight {
          position: absolute;
          left: 50%;
          bottom: 0;
          animation: helicopterFly 3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HelicopterAnimation;
