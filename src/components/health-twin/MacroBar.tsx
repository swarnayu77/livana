import { cn } from "@/lib/utils";

interface MacroBarProps {
  label: string;
  current: number;
  target: number;
  color: string;
  unit?: string;
}

const MacroBar = ({ label, current, target, color, unit = "g" }: MacroBarProps) => {
  const pct = target > 0 ? Math.min((current / target) * 100, 100) : 0;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground font-medium">{label}</span>
        <span className="font-semibold text-foreground tabular-nums">
          {Math.round(current)}<span className="text-muted-foreground font-normal">/{target}{unit}</span>
        </span>
      </div>
      <div className="h-2 bg-muted/40 rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-700 ease-out")}
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
};

export default MacroBar;
