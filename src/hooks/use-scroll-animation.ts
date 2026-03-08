import { useEffect, useRef, useState, useCallback } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
) {
  const { threshold = 0.15, rootMargin = "0px 0px -60px 0px", once = true } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}

// Hook for staggered children animations
export function useStaggerAnimation<T extends HTMLElement = HTMLDivElement>(
  itemCount: number,
  staggerDelay: number = 100,
  options: UseScrollAnimationOptions = {}
) {
  const { ref, isVisible } = useScrollAnimation<T>(options);

  const getItemStyle = useCallback(
    (index: number): React.CSSProperties => ({
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * staggerDelay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * staggerDelay}ms`,
    }),
    [isVisible, staggerDelay]
  );

  const getItemClass = useCallback(
    (index: number) => (isVisible ? "animate-fade-up" : "opacity-0"),
    [isVisible]
  );

  return { ref, isVisible, getItemStyle };
}
