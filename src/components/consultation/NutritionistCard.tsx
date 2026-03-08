import { Link } from "react-router-dom";
import { Star, BadgeCheck, Globe, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Nutritionist } from "@/data/consultationMockData";

const NutritionistCard = ({ nutritionist }: { nutritionist: Nutritionist }) => {
  const n = nutritionist;

  return (
    <div className="glass-card rounded-2xl p-5 hover:border-primary/30 transition-all duration-300 group">
      <div className="flex gap-4">
        {/* Photo */}
        <div className="relative shrink-0">
          <img
            src={n.photo}
            alt={n.name}
            className="w-20 h-20 rounded-2xl object-cover"
          />
          {n.verified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-2 border-background">
              <BadgeCheck className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                {n.name}
              </h3>
              <p className="text-xs text-muted-foreground">{n.qualification}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Star className="w-3.5 h-3.5 text-primary fill-primary" />
              <span className="text-sm font-semibold text-foreground">{n.rating}</span>
              <span className="text-xs text-muted-foreground">({n.reviewCount})</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {n.specializations.slice(0, 3).map((s) => (
              <Badge key={s} variant="secondary" className="text-[10px] px-2 py-0.5 rounded-full">
                {s}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {n.yearsExperience} yrs
            </span>
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3" /> {n.languages.join(", ")}
            </span>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-3 line-clamp-2 leading-relaxed">{n.bio}</p>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
        <div>
          <span className="text-lg font-bold text-foreground">${n.price}</span>
          <span className="text-xs text-muted-foreground"> / session</span>
        </div>
        <Link to={`/consultation/${n.id}`}>
          <Button size="sm" className="rounded-full px-5 text-xs">
            Book Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NutritionistCard;
