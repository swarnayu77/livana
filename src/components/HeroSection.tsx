import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProgressRing from "@/components/ProgressRing";
import { useCounterAnimation } from "@/hooks/use-counter-animation";

const HeroSection = () => {
  return (
    <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(hsl(var(--primary) / 0.2) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,hsl(var(--background))_75%)]" />
      {/* Ambient */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[160px] pointer-events-none" />

      <div className="relative grid lg:grid-cols-2 gap-20 items-center">
        {/* Text */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/6 border border-primary/8 mb-8 animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft" />
            <span className="text-[11px] font-medium text-primary tracking-wide">AI-Powered Health Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-[3.25rem] lg:text-[3.5rem] font-bold tracking-[-0.035em] leading-[1.08] mb-6 animate-fade-up delay-100 opacity-0">
            Fuel Your
            <br />
            <span className="text-gradient">Best Self</span>
          </h1>

          <p className="text-[15px] md:text-base text-muted-foreground max-w-[440px] mx-auto lg:mx-0 mb-10 leading-[1.7] animate-fade-up delay-200 opacity-0">
            Transform your health with AI-powered meal plans, smart nutrient analysis, and personalized coaching — designed for your unique goals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 animate-fade-up delay-300 opacity-0">
            <Link to="/auth?mode=signup">
              <Button size="lg" className="rounded-lg text-[13px] px-7 h-11 font-medium btn-glow-hover group">
                Start Free Today
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
            <a href="/#features">
              <Button variant="outline" size="lg" className="rounded-lg text-[13px] px-7 h-11 font-medium">
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
                <div className="flex items-center gap-8">
                  {[
                    { value: 85, label: "Protein", color: "hsl(var(--primary))" },
                    { value: 62, label: "Carbs", color: "hsl(var(--accent))" },
                    { value: 91, label: "Hydration", color: "hsl(152 55% 55%)" },
                  ].map(ring => (
                    <div key={ring.label} className="flex flex-col items-center gap-2">
                      <ProgressRing value={ring.value} size={64} strokeWidth={5} color={ring.color} label={String(ring.value)} />
                      <span className="text-[10px] text-muted-foreground font-medium tracking-wide">{ring.label}</span>
                    </div>
                  ))}
                </div>
                <div className="w-full grid grid-cols-2 gap-3">
                  {[
                    { value: "1,840", label: "Calories" },
                    { value: "7/8", label: "Glasses" },
                  ].map(stat => (
                    <div key={stat.label} className="px-4 py-3 rounded-xl bg-muted/40 text-center">
                      <p className="text-base font-bold text-foreground">{stat.value}</p>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-[0.1em] mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold shadow-lg animate-float-subtle">
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
    <div className="mt-14 pt-8 border-t border-border/60 animate-fade-up delay-400 opacity-0">
      <div className="grid grid-cols-3 gap-8 max-w-sm mx-auto lg:mx-0">
        {stats.map((stat) => (
          <div key={stat.label} ref={stat.ref} className="text-center lg:text-left">
            <p className="text-2xl font-bold text-foreground tracking-tight">{stat.display}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.12em] mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
