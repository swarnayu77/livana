import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface InsightCardProps {
  icon: LucideIcon;
  text: string;
  type: "positive" | "warning" | "info";
}

const InsightCard = ({ icon: Icon, text, type }: InsightCardProps) => {
  return (
    <div className={cn(
      "flex items-start gap-3 p-3.5 rounded-xl border transition-all duration-200 hover:scale-[1.01]",
      type === "positive" && "bg-primary/5 border-primary/15",
      type === "warning" && "bg-amber-500/5 border-amber-500/15",
      type === "info" && "bg-blue-500/5 border-blue-500/15",
    )}>
      <div className={cn(
        "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5",
        type === "positive" && "bg-primary/15 text-primary",
        type === "warning" && "bg-amber-500/15 text-amber-500",
        type === "info" && "bg-blue-500/15 text-blue-500",
      )}>
        <Icon className="w-3.5 h-3.5" />
      </div>
      <p className="text-sm text-foreground leading-relaxed">{text}</p>
    </div>
  );
};

export default InsightCard;
