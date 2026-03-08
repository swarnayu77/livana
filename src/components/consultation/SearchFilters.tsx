import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { specializations } from "@/data/consultationMockData";

type Props = {
  search: string;
  onSearchChange: (v: string) => void;
  activeFilter: string | null;
  onFilterChange: (v: string | null) => void;
};

const SearchFilters = ({ search, onSearchChange, activeFilter, onFilterChange }: Props) => {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or expertise..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-11 h-12 rounded-xl bg-secondary/30 border-border/50 focus:border-primary"
        />
        <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg">
          <SlidersHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={activeFilter === null ? "default" : "secondary"}
          className="cursor-pointer rounded-full px-3 py-1.5 text-xs transition-all hover:scale-105"
          onClick={() => onFilterChange(null)}
        >
          All
        </Badge>
        {specializations.map((s) => (
          <Badge
            key={s}
            variant={activeFilter === s ? "default" : "secondary"}
            className="cursor-pointer rounded-full px-3 py-1.5 text-xs transition-all hover:scale-105"
            onClick={() => onFilterChange(activeFilter === s ? null : s)}
          >
            {s}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default SearchFilters;
