import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Shield, Star, Award, Users } from "lucide-react";

const proofs = [
  { icon: Users, value: "10+", label: "Active Users" },
  { icon: Star, value: "4.9/5", label: "User Rating" },
  { icon: Award, value: "50M+", label: "Meals Tracked" },
  { icon: Shield, value: "100%", label: "Data Secure" },
];

const SocialProofBanner = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className={cn(
        "py-12 transition-all duration-600",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <div className="p-6 rounded-2xl bg-card/50 border border-border/60">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {proofs.map((proof) => {
            const Icon = proof.icon;
            return (
              <div key={proof.label} className="text-center group">
                <div className="w-10 h-10 rounded-xl bg-primary/6 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/10 transition-colors duration-200">
                  <Icon className="w-4.5 h-4.5 text-primary" />
                </div>
                <p className="text-xl font-bold text-foreground tracking-tight">{proof.value}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.12em] mt-1">{proof.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SocialProofBanner;
