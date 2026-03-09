import { cn } from "@/lib/utils";

interface HealthScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  className?: string;
  color?: string;
}

const HealthScoreRing = ({
  score,
  size = 160,
  strokeWidth = 10,
  label,
  sublabel,
  className,
  color,
}: HealthScoreRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(score / 100, 1);
  const offset = circumference - percentage * circumference;

  const getColor = () => {
    if (color) return color;
    if (score >= 75) return "hsl(var(--primary))";
    if (score >= 50) return "hsl(45 100% 50%)";
    return "hsl(0 80% 55%)";
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      {/* Glow */}
      <div
        className="absolute rounded-full blur-2xl opacity-30 animate-pulse"
        style={{
          width: size * 0.7,
          height: size * 0.7,
          backgroundColor: getColor(),
        }}
      />
      <svg width={size} height={size} className="drop-shadow-lg -rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeLinecap="round"
          opacity={0.3}
        />
        {/* Fill */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          stroke={getColor()}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold font-heading text-foreground leading-none">
          {label ?? score}
        </span>
        {sublabel && <span className="text-[11px] text-muted-foreground mt-1">{sublabel}</span>}
      </div>
    </div>
  );
};

export default HealthScoreRing;
