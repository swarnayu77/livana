import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  accent?: boolean;
  className?: string;
}

const MetricCard = ({
  icon: Icon,
  label,
  value,
  subtitle,
  trend,
  trendValue,
  accent,
  className,
}: MetricCardProps) => {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group relative overflow-hidden",
        accent && "border-primary/20",
        className
      )}
    >
      {accent && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      )}
      <div className="flex items-center justify-between">
        <div className={cn(
          "w-9 h-9 rounded-xl flex items-center justify-center transition-colors",
          accent ? "bg-primary/15 text-primary" : "bg-muted/60 text-muted-foreground"
        )}>
          <Icon className="w-4.5 h-4.5" />
        </div>
        {trend && trendValue && (
          <span className={cn(
            "text-[11px] font-semibold px-2 py-0.5 rounded-full",
            trend === "up" && "bg-primary/10 text-primary",
            trend === "down" && "bg-destructive/10 text-destructive",
            trend === "neutral" && "bg-muted/50 text-muted-foreground"
          )}>
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
          </span>
        )}
      </div>
      <div>
        <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">{label}</p>
        <p className="text-2xl font-bold font-heading text-foreground leading-tight mt-0.5">{value}</p>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
};

export default MetricCard;
