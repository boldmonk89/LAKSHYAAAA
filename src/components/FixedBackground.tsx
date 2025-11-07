import lakshyaBg from "@/assets/lakshya.jpg"; // main default background image

const FixedBackground = () => {
  return (
    <div
      className="fixed inset-0 -z-10 bg-cover bg-center"
      style={{
        backgroundImage: `url(${lakshyaBg})`,
        opacity: 0.9,           // 90% opacity
        filter: "blur(2px)",    // 2px blur
      }}
    />
  );
};

export default FixedBackground;

