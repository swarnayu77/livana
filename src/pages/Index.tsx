import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SocialProofBanner from "@/components/SocialProofBanner";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import GoalsSection from "@/components/GoalsSection";
import MealPlanPreview from "@/components/MealPlanPreview";
import AICoachPreview from "@/components/AICoachPreview";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <PageTransition>
          <div className="max-w-6xl mx-auto px-6">
            <HeroSection />
            <SocialProofBanner />
            <FeaturesSection />
            <HowItWorksSection />
            <GoalsSection />
            <MealPlanPreview />
            <AICoachPreview />
            <TestimonialsSection />
            <FAQSection />
            <CTASection />
          </div>
          <Footer />
        </PageTransition>
      </main>
    </div>
  );
};

export default Index;
