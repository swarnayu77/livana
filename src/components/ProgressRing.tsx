interface ProgressRingProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  label?: string;
  sublabel?: string;
  className?: string;
}

const ProgressRing = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  color = "hsl(var(--primary))",
  trackColor = "hsl(var(--muted))",
  label,
  sublabel,
  className = "",
}: ProgressRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(value / max, 1);
  const offset = circumference - percentage * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="progress-ring">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="progress-ring-track"
          stroke={trackColor}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="progress-ring-fill animate-ring-fill"
          stroke={color}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            ["--ring-circumference" as string]: circumference,
            ["--ring-offset" as string]: offset,
          }}
        />
      </svg>
      {(label || sublabel) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {label && <span className="text-lg font-bold text-foreground leading-none">{label}</span>}
          {sublabel && <span className="text-[10px] text-muted-foreground mt-1">{sublabel}</span>}
        </div>
      )}
    </div>
  );
};

export default ProgressRing;
