interface MotivationalLineProps {
  english: string;
  hindi: string;
}

const MotivationalLine = ({ english, hindi }: MotivationalLineProps) => {
  return (
    <div className="mt-8 max-w-3xl mx-auto">
      <div className="glass-premium p-6 rounded-lg border border-primary/30 backdrop-blur-md bg-black/20">
        <p className="text-lg md:text-xl font-semibold text-foreground mb-2 text-center">
          {english}
        </p>
        <p className="text-base md:text-lg text-muted-foreground text-center italic">
          {hindi}
        </p>
      </div>
    </div>
  );
};

export default MotivationalLine;
