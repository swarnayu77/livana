import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutGrid, 
  Utensils, 
  Bot, 
  Target, 
  ChefHat, 
  TrendingUp, 
  FlaskConical,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import livanaLogo from "@/assets/livana-logo-new.png";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: "Features", href: "/#features", icon: LayoutGrid },
  { label: "Meal Plans", href: "/meal-plans", icon: Utensils },
  { label: "AI Coach", href: "/coach", icon: Bot },
  { label: "Goals", href: "/goals", icon: Target },
  { label: "Recipes", href: "/recipes", icon: ChefHat },
  { label: "Progress", href: "/progress", icon: TrendingUp },
  { label: "Nutrients", href: "/nutrient-analysis", icon: FlaskConical },
];

const AppSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      return location.pathname === "/" && location.hash === href.slice(1);
    }
    return location.pathname === href;
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-gradient-sidebar border-r border-sidebar-border transition-all duration-300 ease-out",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="flex items-center h-20 px-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src={livanaLogo} 
            alt="LIVANA" 
            className={cn(
              "transition-all duration-300 group-hover:scale-105",
              isCollapsed ? "h-8 w-8" : "h-10 w-10"
            )} 
          />
          {!isCollapsed && (
            <span className="text-xl font-display font-bold tracking-tight text-gradient animate-fade-in">
              LIVANA
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return item.href.startsWith("/#") ? (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium",
                active 
                  ? "active bg-sidebar-accent text-primary" 
                  : "text-sidebar-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5 flex-shrink-0", active && "text-primary")} />
              {!isCollapsed && <span>{item.label}</span>}
            </a>
          ) : (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium",
                active 
                  ? "active bg-sidebar-accent text-primary" 
                  : "text-sidebar-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5 flex-shrink-0", active && "text-primary")} />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer - Auth CTAs */}
      <div className={cn(
        "p-4 border-t border-sidebar-border space-y-2",
        isCollapsed && "px-2"
      )}>
        {!isCollapsed ? (
          <>
            <Link to="/auth" className="block">
              <Button variant="ghost" size="sm" className="w-full justify-start text-sidebar-foreground hover:text-foreground">
                Sign In
              </Button>
            </Link>
            <Link to="/auth?mode=signup" className="block">
              <Button variant="hero" size="sm" className="w-full">
                <Sparkles className="h-4 w-4 mr-2" />
                Get Started
              </Button>
            </Link>
          </>
        ) : (
          <Link to="/auth?mode=signup">
            <Button variant="hero" size="icon" className="w-10 h-10 mx-auto block">
              <Sparkles className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-24 w-6 h-6 bg-sidebar-background border border-sidebar-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors shadow-lg"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="h-3.5 w-3.5" />
        ) : (
          <ChevronLeft className="h-3.5 w-3.5" />
        )}
      </button>
    </aside>
  );
};

export default AppSidebar;