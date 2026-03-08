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
  const { ref: gridRef, isVisible: gridVisible, getItemStyle } = useStaggerAnimation(testimonials.length, 80);

  return (
    <section className="py-20 lg:py-28">
      <div
        ref={headerRef}
        className={cn(
          "text-center mb-14 transition-all duration-700",
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/12 mb-5">
          <Star className="w-3.5 h-3.5 text-primary" />
          <span className="text-primary text-xs font-semibold">Testimonials</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight mb-4">
          Loved by <span className="text-gradient">Thousands</span>
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto">
          See how LIVANA is helping people achieve their health and nutrition goals every day.
        </p>
      </div>

      <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            className="group p-6 rounded-2xl glass-card hover:shadow-lg hover:shadow-primary/6 hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-300"
            style={getItemStyle(i)}
          >
            <Quote className="w-7 h-7 text-primary/15 mb-4 group-hover:text-primary/30 transition-colors duration-300" />
            <p className="text-sm text-foreground/80 leading-relaxed mb-6">"{t.text}"</p>
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <Avatar className="h-9 w-9 group-hover:scale-110 transition-transform duration-300">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{t.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
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
