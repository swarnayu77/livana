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
        "py-10 transition-all duration-600",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {proofs.map((proof) => {
          const Icon = proof.icon;
          return (
            <div key={proof.label} className="text-center">
              <div className="w-9 h-9 rounded-lg bg-primary/6 flex items-center justify-center mx-auto mb-2.5">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <p className="text-xl font-bold text-foreground">{proof.value}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">{proof.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SocialProofBanner;
