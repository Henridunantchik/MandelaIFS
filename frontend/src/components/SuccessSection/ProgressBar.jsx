import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

const ProgressBar = ({ 
  label, 
  percentage, 
  color = "bg-blue-500", 
  animated = true, 
  className = "" 
}) => {
  const [displayPercentage, setDisplayPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const progressRef = useRef(null);
  
  // Validate and clamp percentage between 0-100
  const validPercentage = Math.max(0, Math.min(100, percentage || 0));
  
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  useEffect(() => {
    // Intersection Observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (progressRef.current) {
      observer.observe(progressRef.current);
    }

    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    if (animated && isVisible && !prefersReducedMotion) {
      // Animate progress bar when it becomes visible
      const timer = setTimeout(() => {
        setDisplayPercentage(validPercentage);
      }, 200);
      
      return () => clearTimeout(timer);
    } else if (!animated || prefersReducedMotion) {
      setDisplayPercentage(validPercentage);
    }
  }, [validPercentage, animated, isVisible, prefersReducedMotion]);

  return (
    <div 
      ref={progressRef}
      className={cn("w-full group", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      tabIndex={0}
    >
      {/* Label and percentage display */}
      <div className={cn(
        "flex justify-between items-center",
        // Mobile-first responsive spacing
        "mb-2 sm:mb-3",
        // Interactive state transitions
        "transition-all duration-200"
      )}>
        <span 
          className={cn(
            // Mobile-first responsive typography
            "text-xs sm:text-sm lg:text-base",
            "font-medium leading-tight",
            // Interactive color states
            "text-gray-700 dark:text-gray-300",
            "group-hover:text-gray-900 dark:group-hover:text-gray-100",
            "group-focus:text-gray-900 dark:group-focus:text-gray-100",
            "transition-colors duration-200"
          )}
          id={`progress-label-${label.replace(/\s+/g, '-').toLowerCase()}`}
        >
          {label}
        </span>
        <span 
          className={cn(
            // Mobile-first responsive typography
            "text-xs sm:text-sm lg:text-base",
            "font-semibold tabular-nums",
            // Interactive color states
            "text-gray-900 dark:text-gray-100",
            // Animated number scaling on hover/focus
            isHovered || isFocused ? "scale-110" : "scale-100",
            "transition-all duration-200 origin-right"
          )}
          aria-live="polite"
        >
          {Math.round(displayPercentage)}%
        </span>
      </div>
      
      {/* Progress bar container */}
      <div 
        className={cn(
          "w-full rounded-full overflow-hidden",
          // Mobile-first responsive height
          "h-2 sm:h-2.5 lg:h-3",
          // Interactive background states
          "bg-gray-200 dark:bg-gray-700",
          "group-hover:bg-gray-300 dark:group-hover:bg-gray-600",
          "group-focus:bg-gray-300 dark:group-focus:bg-gray-600",
          // Enhanced shadows and focus states
          "shadow-inner",
          "group-focus:ring-2 group-focus:ring-primary/20 group-focus:ring-offset-2",
          "group-focus:ring-offset-white dark:group-focus:ring-offset-gray-900",
          // Smooth transitions
          "transition-all duration-300 ease-out"
        )}
        role="progressbar"
        aria-valuenow={Math.round(displayPercentage)}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-labelledby={`progress-label-${label.replace(/\s+/g, '-').toLowerCase()}`}
        aria-describedby={`progress-desc-${label.replace(/\s+/g, '-').toLowerCase()}`}
      >
        {/* Progress bar fill */}
        <div
          className={cn(
            "h-full rounded-full shadow-sm",
            // Enhanced animation with spring easing
            prefersReducedMotion 
              ? "transition-none" 
              : "transition-all duration-1000 ease-out",
            // Interactive scaling and glow effects
            isHovered || isFocused ? "shadow-md" : "shadow-sm",
            // Color with enhanced interactive states
            color,
            // Subtle pulse animation on hover (respecting motion preferences)
            !prefersReducedMotion && (isHovered || isFocused) && "animate-pulse"
          )}
          style={{ 
            width: `${displayPercentage}%`,
            transform: animated && !prefersReducedMotion ? 'translateX(0)' : undefined,
            // Add subtle glow effect on interaction
            boxShadow: (isHovered || isFocused) && !prefersReducedMotion
              ? `0 0 20px ${color.includes('blue') ? '#3b82f6' : 
                           color.includes('green') ? '#10b981' : 
                           color.includes('teal') ? '#14b8a6' : '#3b82f6'}40`
              : undefined
          }}
        />
      </div>
      
      {/* Screen reader description */}
      <div 
        id={`progress-desc-${label.replace(/\s+/g, '-').toLowerCase()}`}
        className="sr-only"
      >
        Progress for {label}: {Math.round(displayPercentage)} percent complete
        {(isHovered || isFocused) && ". Use arrow keys to navigate between progress bars."}
      </div>
    </div>
  );
};

export default ProgressBar;