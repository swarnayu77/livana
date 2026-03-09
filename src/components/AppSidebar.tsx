import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutGrid, Utensils, Bot, Target, ChefHat, TrendingUp, FlaskConical,
  ChevronLeft, ChevronRight, Sparkles, LogIn, Brain
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import livanaLogo from "@/assets/livana-logo-new.png";
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { label: "Features", href: "/#features", icon: LayoutGrid },
  { label: "Health Twin", href: "/health-twin", icon: Brain },
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
    if (href.startsWith("/#")) return location.pathname === "/" && location.hash === href.slice(1);
    return location.pathname === href;
  };

  return (
    <TooltipProvider>
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen flex flex-col",
          "bg-background/80 backdrop-blur-xl border-r border-border/30",
          "transition-all duration-300 ease-out",
          "hidden md:flex",
          isCollapsed ? "w-16" : "w-52"
        )}
      >
        {/* Logo */}
        <div className={cn(
          "flex items-center h-14 border-b border-border/20 flex-shrink-0",
          isCollapsed ? "justify-center px-0" : "px-4"
        )}>
          <Link to="/" className="flex items-center gap-2.5">
            <img src={livanaLogo} alt="LIVANA" className="h-7 w-7 object-contain" />
            {!isCollapsed && (
              <span className="text-base font-display font-bold text-gradient tracking-tight">LIVANA</span>
            )}
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            const content = (
              <div className={cn(
                "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium",
                "transition-all duration-150 ease-out",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                isCollapsed && "justify-center px-0 py-2"
              )}>
                <Icon className={cn(
                  "h-4 w-4 flex-shrink-0 stroke-[1.5]",
                  active ? "text-primary" : "text-muted-foreground"
                )} />
                {!isCollapsed && <span>{item.label}</span>}
              </div>
            );

            const link = item.href.startsWith("/#")
              ? <a href={item.href}>{content}</a>
              : <Link to={item.href}>{content}</Link>;

            if (isCollapsed) {
              return (
                <Tooltip key={item.label} delayDuration={0}>
                  <TooltipTrigger asChild>{link}</TooltipTrigger>
                  <TooltipContent side="right" className="text-xs">{item.label}</TooltipContent>
                </Tooltip>
              );
            }
            return <div key={item.label}>{link}</div>;
          })}
        </nav>

        {/* Footer */}
        <div className={cn(
          "flex-shrink-0 p-2 border-t border-border/20 space-y-1.5",
          isCollapsed && "px-1.5"
        )}>
          {!isCollapsed ? (
            <>
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground text-[13px] h-8 rounded-lg">
                  <LogIn className="h-3.5 w-3.5 mr-2 stroke-[1.5]" />
                  Sign In
                </Button>
              </Link>
              <Link to="/auth?mode=signup">
                <Button variant="hero" size="sm" className="w-full h-8 text-[13px] rounded-lg">
                  <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                  Get Started
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link to="/auth"><Button variant="ghost" size="icon" className="w-8 h-8 mx-auto block rounded-lg"><LogIn className="h-3.5 w-3.5" /></Button></Link>
                </TooltipTrigger>
                <TooltipContent side="right">Sign In</TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link to="/auth?mode=signup"><Button variant="hero" size="icon" className="w-8 h-8 mx-auto block rounded-lg"><Sparkles className="h-3.5 w-3.5" /></Button></Link>
                </TooltipTrigger>
                <TooltipContent side="right">Get Started</TooltipContent>
              </Tooltip>
            </>
          )}
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "absolute -right-3 top-[4.5rem] w-6 h-6 rounded-full",
            "bg-card border border-border/50 flex items-center justify-center",
            "text-muted-foreground hover:text-foreground hover:border-primary/30",
            "transition-all duration-150 shadow-sm"
          )}
        >
          {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>
      </aside>
    </TooltipProvider>
  );
};

export default AppSidebar;
