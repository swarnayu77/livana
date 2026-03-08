import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    setIsTransitioning(true);
    const timeout = setTimeout(() => setIsTransitioning(false), 50);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <div
      className={cn(
        "transition-all duration-500 ease-out",
        isTransitioning
          ? "opacity-0 translate-y-3"
          : "opacity-100 translate-y-0"
      )}
    >
      {children}
    </div>
  );
};

export default PageTransition;
