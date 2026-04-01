import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProgressRing from "@/components/ProgressRing";
import { useCounterAnimation } from "@/hooks/use-counter-animation";

const HeroSection = () => {
  return (
    <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(hsl(var(--primary) / 0.25) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,hsl(var(--background))_80%)]" />
      {/* Ambient */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/4 blur-[140px] pointer-events-none" />

      <div className="relative grid lg:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/6 border border-primary/10 mb-7 animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft" />
            <span className="text-[11px] font-semibold text-primary tracking-wide">AI-Powered Health Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-bold tracking-tight leading-[1.1] mb-5 animate-fade-up delay-100 opacity-0">
            Fuel Your
            <br />
            <span className="text-gradient">Best Self</span>
          </h1>

          <p className="text-[15px] text-muted-foreground max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed animate-fade-up delay-200 opacity-0">
            Transform your health with AI-powered meal plans, smart nutrient analysis, and personalized coaching — designed for your unique goals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 animate-fade-up delay-300 opacity-0">
            <Link to="/auth?mode=signup">
              <Button size="lg" className="rounded-lg text-[13px] px-6 h-11 btn-glow-hover group">
                Start Free Today
                <ArrowRight className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
            <a href="/#features">
              <Button variant="outline" size="lg" className="rounded-lg text-[13px] px-6 h-11">
                See How It Works
              </Button>
            </a>
          </div>

          <HeroStats />
        </div>

        {/* Dashboard preview */}
        <div className="hidden lg:flex items-center justify-center animate-scale-in delay-300 opacity-0">
          <div className="relative">
            <div className="glass-card rounded-2xl p-8 glow-soft">
              <div className="flex flex-col items-center gap-7">
                <ProgressRing value={78} size={140} strokeWidth={8} label="78%" sublabel="Health Score" />
                <div className="flex items-center gap-7">
                  {[
                    { value: 85, label: "Protein", color: "hsl(var(--primary))" },
                    { value: 62, label: "Carbs", color: "hsl(var(--accent))" },
                    { value: 91, label: "Hydration", color: "hsl(152 55% 55%)" },
                  ].map(ring => (
                    <div key={ring.label} className="flex flex-col items-center gap-1.5">
                      <ProgressRing value={ring.value} size={64} strokeWidth={5} color={ring.color} label={String(ring.value)} />
                      <span className="text-[10px] text-muted-foreground font-medium">{ring.label}</span>
                    </div>
                  ))}
                </div>
                <div className="w-full grid grid-cols-2 gap-2.5">
                  {[
                    { value: "1,840", label: "Calories" },
                    { value: "7/8", label: "Glasses" },
                  ].map(stat => (
                    <div key={stat.label} className="px-4 py-2.5 rounded-xl bg-muted/50 text-center">
                      <p className="text-base font-bold text-foreground">{stat.value}</p>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -top-2.5 -right-2.5 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold shadow-md animate-float-subtle">
              ✨ On Track!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HeroStats = () => {
  const users = useCounterAnimation(10, 2000, "+");
  const recipes = useCounterAnimation(500, 1600, "+");
  const rate = useCounterAnimation(95, 1400, "%");

  const stats = [
    { ...users, label: "Active Users" },
    { ...recipes, label: "Recipes" },
    { ...rate, label: "Success Rate" },
  ];

  return (
    <div className="mt-12 pt-6 border-t border-border animate-fade-up delay-400 opacity-0">
      <div className="grid grid-cols-3 gap-6 max-w-sm mx-auto lg:mx-0">
        {stats.map((stat) => (
          <div key={stat.label} ref={stat.ref} className="text-center lg:text-left">
            <p className="text-xl font-bold text-foreground">{stat.display}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
