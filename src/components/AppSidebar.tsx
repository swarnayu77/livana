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
        "fixed left-0 top-0 z-40 h-screen border-r border-border/40 transition-all duration-300 ease-out",
        "bg-sidebar",
        isCollapsed ? "w-14" : "w-56"
      )}
    >
      {/* Logo Section */}
      <div className="flex items-center h-14 px-3 border-b border-border/40">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img 
            src={livanaLogo} 
            alt="LIVANA" 
            className={cn(
              "transition-all duration-300 group-hover:scale-110 object-contain",
              isCollapsed ? "h-7 w-7" : "h-8 w-8"
            )} 
          />
          {!isCollapsed && (
            <span className="text-base font-display font-bold tracking-tight text-gradient">
              LIVANA
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          const linkClasses = cn(
            "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            "hover:bg-muted/40",
            active 
              ? "bg-primary/10 text-primary border-l-2 border-primary ml-0.5" 
              : "text-muted-foreground hover:text-foreground"
          );
          
          return item.href.startsWith("/#") ? (
            <a key={item.label} href={item.href} className={linkClasses}>
              <Icon className={cn("h-4 w-4 flex-shrink-0", active && "text-primary")} />
              {!isCollapsed && <span>{item.label}</span>}
            </a>
          ) : (
            <Link key={item.label} to={item.href} className={linkClasses}>
              <Icon className={cn("h-4 w-4 flex-shrink-0", active && "text-primary")} />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer - Auth CTAs */}
      <div className={cn(
        "p-2 border-t border-border/40 space-y-1.5",
        isCollapsed && "px-1.5"
      )}>
        {!isCollapsed ? (
          <>
            <Link to="/auth" className="block">
              <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground hover:text-foreground text-sm h-8">
                Sign In
              </Button>
            </Link>
            <Link to="/auth?mode=signup" className="block">
              <Button variant="hero" size="sm" className="w-full h-8 text-sm">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                Get Started
              </Button>
            </Link>
          </>
        ) : (
          <Link to="/auth?mode=signup">
            <Button variant="hero" size="icon" className="w-8 h-8 mx-auto block">
              <Sparkles className="h-3.5 w-3.5" />
            </Button>
          </Link>
        )}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-2.5 top-16 w-5 h-5 bg-background border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shadow-sm"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </button>
    </aside>
  );
};

export default AppSidebar;