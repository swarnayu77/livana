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
        "py-12 transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
    >
      <div className="glass-card rounded-2xl p-8 md:p-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {proofs.map((proof) => {
            const Icon = proof.icon;
            return (
              <div key={proof.label} className="text-center group">
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/12 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-5 h-5 text-primary stroke-[1.5]" />
                </div>
                <p className="text-2xl font-bold text-foreground mb-0.5">{proof.value}</p>
                <p className="text-[11px] text-muted-foreground uppercase tracking-widest">{proof.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SocialProofBanner;
