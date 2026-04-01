import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is Livana really free to start?",
    answer: "Yes! You can sign up and access core features like meal tracking, AI food search, and daily insights completely free. Premium plans unlock advanced analytics and coaching.",
  },
  {
    question: "How accurate is the AI food analysis?",
    answer: "Our AI analyzes thousands of food items with high accuracy, estimating calories, macros, and micronutrients from simple descriptions like '2 eggs with toast and butter'.",
  },
  {
    question: "Can I customize my nutrition targets?",
    answer: "Absolutely. During onboarding, we calculate personalized targets based on your body stats, goals, and activity level. You can adjust them anytime from your profile.",
  },
  {
    question: "Does Livana support dietary restrictions?",
    answer: "Yes — we support vegetarian, vegan, keto, paleo, gluten-free, and more. Our meal plans and recipe suggestions adapt to your dietary preferences and allergies.",
  },
  {
    question: "How does the AI Coach work?",
    answer: "The AI Coach is your 24/7 nutrition companion. Ask it anything — from meal suggestions to understanding your macros — and get instant, personalized guidance.",
  },
];

const FAQSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  return (
    <section className="py-20 lg:py-28">
      <div
        ref={headerRef}
        className={cn(
          "text-center mb-10 transition-all duration-600",
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <p className="text-primary text-[11px] font-semibold uppercase tracking-[0.18em] mb-2.5">FAQ</p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-3">
          Common Questions
        </h2>
        <p className="text-muted-foreground text-[14px] max-w-md mx-auto leading-relaxed">
          Everything you need to know about getting started with Livana.
        </p>
      </div>

      <div
        ref={contentRef}
        className={cn(
          "max-w-2xl mx-auto transition-all duration-600 delay-100",
          contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-card border border-border rounded-xl px-5 data-[state=open]:border-primary/15 transition-colors duration-200"
            >
              <AccordionTrigger className="text-[13px] font-semibold text-foreground hover:text-primary transition-colors py-4 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[13px] text-muted-foreground leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
