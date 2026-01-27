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
  Sparkles,
  LogIn
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import livanaLogo from "@/assets/livana-logo-new.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

interface NavItemComponentProps {
  item: NavItem;
  isActive: boolean;
  isCollapsed: boolean;
}

const NavItemComponent = ({ item, isActive, isCollapsed }: NavItemComponentProps) => {
  const Icon = item.icon;
  
  const linkContent = (
    <div
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium",
        "transition-all duration-200 ease-out",
        "hover:bg-primary/8",
        isActive 
          ? "bg-primary/12 text-primary shadow-[0_0_20px_hsl(var(--primary)/0.15)]" 
          : "text-muted-foreground hover:text-foreground",
        isCollapsed && "justify-center px-2.5"
      )}
    >
      <Icon 
        className={cn(
          "h-[18px] w-[18px] flex-shrink-0 stroke-[1.5]",
          isActive ? "text-primary" : "text-muted-foreground"
        )} 
      />
      {!isCollapsed && (
        <span className="tracking-tight">{item.label}</span>
      )}
    </div>
  );
  
  const link = item.href.startsWith("/#") ? (
    <a href={item.href}>{linkContent}</a>
  ) : (
    <Link to={item.href}>{linkContent}</Link>
  );

  if (isCollapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          {link}
        </TooltipTrigger>
        <TooltipContent side="right" className="font-medium">
          {item.label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return link;
};

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
    <TooltipProvider>
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen",
          "bg-sidebar/80 backdrop-blur-2xl",
          "border-r border-border/30",
          "transition-all duration-300 ease-out",
          "flex flex-col",
          isCollapsed ? "w-[68px]" : "w-[220px]"
        )}
      >
        {/* Logo Section */}
        <div className={cn(
          "flex items-center h-16 border-b border-border/20",
          isCollapsed ? "px-4 justify-center" : "px-5"
        )}>
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img 
                src={livanaLogo} 
                alt="LIVANA" 
                className={cn(
                  "object-contain transition-transform duration-300 group-hover:scale-110",
                  isCollapsed ? "h-8 w-8" : "h-9 w-9"
                )} 
              />
            </div>
            {!isCollapsed && (
              <span className="text-lg font-display font-bold tracking-tight text-gradient">
                LIVANA
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavItemComponent
              key={item.label}
              item={item}
              isActive={isActive(item.href)}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>

        {/* Footer - Auth CTAs */}
        <div className={cn(
          "p-3 border-t border-border/20 space-y-2",
          isCollapsed && "px-2"
        )}>
          {!isCollapsed ? (
            <>
              <Link to="/auth" className="block">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start text-muted-foreground hover:text-foreground text-sm h-10 rounded-xl"
                >
                  <LogIn className="h-4 w-4 mr-2 stroke-[1.5]" />
                  Sign In
                </Button>
              </Link>
              <Link to="/auth?mode=signup" className="block">
                <Button 
                  variant="hero" 
                  size="sm" 
                  className="w-full h-10 text-sm rounded-xl"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Get Started
                </Button>
              </Link>
            </>
          ) : (
            <div className="space-y-2">
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link to="/auth">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="w-10 h-10 mx-auto block rounded-xl"
                    >
                      <LogIn className="h-4 w-4 stroke-[1.5]" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Sign In</TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link to="/auth?mode=signup">
                    <Button 
                      variant="hero" 
                      size="icon" 
                      className="w-10 h-10 mx-auto block rounded-xl"
                    >
                      <Sparkles className="h-4 w-4" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Get Started</TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "absolute -right-3 top-20",
            "w-6 h-6 rounded-full",
            "bg-card border border-border/50",
            "flex items-center justify-center",
            "text-muted-foreground hover:text-foreground",
            "hover:bg-muted hover:border-primary/30",
            "transition-all duration-200 ease-out",
            "shadow-lg shadow-background/50"
          )}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>
      </aside>
    </TooltipProvider>
  );
};

export default AppSidebar;
