import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks/use-scroll-animation";

const testimonials = [
  { name: "Sarah Chen", role: "Fitness Enthusiast", avatar: "SC", rating: 5, text: "LIVANA completely transformed how I approach nutrition. The AI coach gives me personalized advice that actually fits my lifestyle. I've never felt healthier." },
  { name: "Marcus Johnson", role: "Marathon Runner", avatar: "MJ", rating: 5, text: "The meal plans are incredibly detailed and easy to follow. I've improved my race times significantly since optimizing my nutrition with LIVANA." },
  { name: "Emily Rodriguez", role: "Busy Professional", avatar: "ER", rating: 5, text: "As someone with a hectic schedule, LIVANA makes healthy eating effortless. The recipes are quick, delicious, and perfectly tailored to my goals." },
  { name: "David Park", role: "Weight Loss Journey", avatar: "DP", rating: 5, text: "I lost 30 pounds in 4 months following LIVANA's plans. The progress tracking kept me motivated and the AI coach helped me stay on track." },
  { name: "Lisa Thompson", role: "Yoga Instructor", avatar: "LT", rating: 5, text: "Finally, a nutrition app that understands plant-based diets. The variety of recipes and the nutrient analysis feature are game-changers for my practice." },
  { name: "James Wilson", role: "CrossFit Athlete", avatar: "JW", rating: 5, text: "The macro tracking and meal timing suggestions have taken my performance to the next level. LIVANA is like having a nutritionist in your pocket." },
];

const TestimonialsSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible, getItemStyle } = useStaggerAnimation(testimonials.length, 60);

  return (
    <section className="py-24 lg:py-32">
      <div
        ref={headerRef}
        className={cn(
          "text-center mb-14 transition-all duration-600",
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <p className="text-primary text-[11px] font-semibold uppercase tracking-[0.2em] mb-3">Testimonials</p>
        <h2 className="text-[28px] md:text-[32px] font-bold text-foreground tracking-[-0.025em] mb-4">
          Loved by <span className="text-gradient">Thousands</span>
        </h2>
        <p className="text-muted-foreground text-[15px] leading-relaxed max-w-lg mx-auto">
          See how LIVANA is helping people achieve their health and nutrition goals.
        </p>
      </div>

      <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            className="group p-6 rounded-xl bg-card border border-border hover:border-primary/12 hover:shadow-[0_4px_20px_-8px_hsl(var(--primary)/0.08)] transition-all duration-300"
            style={getItemStyle(i)}
          >
            <Quote className="w-5 h-5 text-primary/10 mb-4" />
            <p className="text-[14px] text-foreground/80 leading-[1.7] mb-6">"{t.text}"</p>
            <div className="flex items-center gap-3 pt-4 border-t border-border/60">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary/6 text-primary text-[10px] font-semibold">{t.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-[13px] font-semibold text-foreground">{t.name}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{t.role}</p>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
