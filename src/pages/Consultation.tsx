import { useState, useMemo } from "react";
import PageLayout from "@/components/PageLayout";
import ComingSoonBanner from "@/components/consultation/ComingSoonBanner";
import SearchFilters from "@/components/consultation/SearchFilters";
import NutritionistCard from "@/components/consultation/NutritionistCard";
import { nutritionists } from "@/data/consultationMockData";
import { Users, TrendingUp, Star, Shield } from "lucide-react";

const stats = [
  { icon: Users, label: "Nutritionists", value: "50+" },
  { icon: TrendingUp, label: "Consultations", value: "10K+" },
  { icon: Star, label: "Avg Rating", value: "4.8" },
  { icon: Shield, label: "Verified Experts", value: "100%" },
];

const Consultation = () => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return nutritionists.filter((n) => {
      const matchesSearch =
        !search ||
        n.name.toLowerCase().includes(search.toLowerCase()) ||
        n.specializations.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
        n.qualification.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        !activeFilter || n.specializations.includes(activeFilter);

      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  return (
    <PageLayout
      title="Online Consultation"
      subtitle="Connect with certified nutritionists for personalized guidance through live video sessions."
    >
      <ComingSoonBanner />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="glass-card rounded-2xl p-4 text-center">
            <s.icon className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <SearchFilters
        search={search}
        onSearchChange={setSearch}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Results */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {filtered.length} nutritionist{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((n) => (
              <NutritionistCard key={n.id} nutritionist={n} />
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-12 text-center">
            <p className="text-muted-foreground">No nutritionists match your search. Try adjusting filters.</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Consultation;
