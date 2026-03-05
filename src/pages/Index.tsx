import { useState, useEffect } from "react";
import AppSidebar from "@/components/AppSidebar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import GoalsSection from "@/components/GoalsSection";
import MealPlanPreview from "@/components/MealPlanPreview";
import AICoachPreview from "@/components/AICoachPreview";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  const [sidebarWidth, setSidebarWidth] = useState(208);

  useEffect(() => {
    const check = () => {
      const sidebar = document.querySelector('aside');
      if (sidebar) setSidebarWidth(sidebar.offsetWidth);
    };
    check();
    const observer = new MutationObserver(check);
    const sidebar = document.querySelector('aside');
    if (sidebar) observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
    window.addEventListener('resize', check);
    return () => { observer.disconnect(); window.removeEventListener('resize', check); };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main
        className="transition-all duration-300 ease-out"
        style={{ marginLeft: sidebarWidth }}
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <HeroSection />
          <FeaturesSection />
          <GoalsSection />
          <MealPlanPreview />
          <AICoachPreview />
          <CTASection />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Index;
