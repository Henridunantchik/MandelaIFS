import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Lightbulb } from 'lucide-react';
import { cn } from '../../lib/utils';
import ImageWithFallback from './ImageWithFallback';
import IconWithFallback from './IconWithFallback';
import geometricShapesImage from '../../assets/geometric-shapes.svg';

const BenefitsSection = ({ 
  title = "Showing You",
  subtitle = "The Way of Success",
  description = "Denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure moment so blinded by desire that they cannot foresee the pain and trouble.",
  benefits = [],
  image = null,
  badgeNumber = "01",
  className = "",
  onReadMore = () => {}
}) => {
  // Default benefits data with validation
  const defaultBenefits = [
    { text: "Cost-Effective Services", icon: "DollarSign" },
    { text: "Helps Reduce Business Risks", icon: "Shield" },
    { text: "Management of Employee Performance", icon: "Users" },
    { text: "Increasing Company's Agility", icon: "Zap" }
  ];

  // Validate and use provided benefits or defaults
  const validatedBenefits = (benefits.length > 0 ? benefits : defaultBenefits).map(benefit => ({
    text: benefit.text || "Benefit description",
    icon: benefit.icon || "CheckCircle"
  }));

  return (
    <div className={cn("w-full", className)}>
      <div className={cn(
        // Mobile-first responsive grid layout
        "grid grid-cols-1 lg:grid-cols-2",
        // Responsive gap sizing
        "gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16",
        // Improved alignment for different screen sizes
        "items-center lg:items-start xl:items-center"
      )}>
        
        {/* Image Section with Geometric Shapes */}
        <div className={cn(
          "relative order-2 lg:order-1",
          // Mobile-first responsive padding
          "px-4 sm:px-6 lg:px-0"
        )}>
          <div className={cn(
            "relative",
            // Responsive aspect ratio and sizing
            "aspect-square",
            "max-w-xs sm:max-w-sm md:max-w-md mx-auto",
            "lg:max-w-full lg:aspect-[4/3] xl:aspect-square"
          )}>
            {/* Geometric shapes image with fallback */}
            <ImageWithFallback
              src={image || geometricShapesImage}
              fallbackSrc={geometricShapesImage}
              alt="Geometric triangular pyramids representing success, growth, and innovation in business"
              className={cn(
                "w-full h-full object-contain rounded-lg shadow-lg",
                "transition-transform duration-300 hover:scale-[1.02]"
              )}
              loading="lazy"
            />
            
            {/* Numbered Badge Overlay with responsive sizing */}
            <div className={cn(
              "absolute",
              // Mobile-first responsive positioning
              "-top-2 -left-2",
              "sm:-top-3 sm:-left-3",
              "md:-top-4 md:-left-4",
              "lg:-top-6 lg:-left-6"
            )}>
              <Badge 
                variant="default" 
                className={cn(
                  // Mobile-first responsive badge sizing
                  "w-8 h-8 text-sm",
                  "sm:w-10 sm:h-10 sm:text-base",
                  "md:w-12 md:h-12 md:text-lg",
                  "lg:w-16 lg:h-16 lg:text-xl",
                  "rounded-full flex items-center justify-center font-bold",
                  "bg-primary text-primary-foreground shadow-lg",
                  // Enhanced interactive animations
                  "transition-all duration-300 ease-out",
                  "hover:shadow-xl hover:shadow-primary/30",
                  "hover:scale-110 hover:-rotate-3",
                  "focus:shadow-xl focus:shadow-primary/30",
                  "focus:scale-110 focus:-rotate-3",
                  "focus:ring-2 focus:ring-primary/20 focus:ring-offset-2",
                  "cursor-pointer",
                  // Subtle pulse animation
                  "animate-pulse hover:animate-none focus:animate-none"
                )}
                tabIndex={0}
                role="button"
                aria-label={`Badge number ${badgeNumber}`}
              >
                {badgeNumber}
              </Badge>
            </div>
            
            {/* Light bulb icon for innovation with responsive sizing */}
            <div className={cn(
              "absolute",
              // Mobile-first responsive positioning
              "-bottom-2 -right-2",
              "sm:-bottom-3 sm:-right-3",
              "md:-bottom-4 md:-right-4",
              "lg:-bottom-6 lg:-right-6"
            )}>
              <div 
                className={cn(
                  // Mobile-first responsive icon container sizing
                  "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16",
                  "bg-gradient-to-br from-yellow-400 to-orange-400",
                  "dark:from-yellow-500 dark:to-orange-500",
                  "rounded-full flex items-center justify-center shadow-lg",
                  // Enhanced interactive animations
                  "transition-all duration-300 ease-out",
                  "hover:shadow-xl hover:shadow-yellow-400/30",
                  "hover:scale-110 hover:rotate-12",
                  "focus:shadow-xl focus:shadow-yellow-400/30",
                  "focus:scale-110 focus:rotate-12",
                  "focus:ring-2 focus:ring-yellow-400/20 focus:ring-offset-2",
                  "cursor-pointer",
                  // Subtle glow effect
                  "hover:bg-gradient-to-br hover:from-yellow-300 hover:to-orange-300",
                  "dark:hover:from-yellow-400 dark:hover:to-orange-400"
                )}
                tabIndex={0}
                role="button"
                aria-label="Innovation and bright ideas icon"
              >
                <Lightbulb 
                  className={cn(
                    // Mobile-first responsive icon sizing
                    "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8",
                    "text-yellow-900 dark:text-yellow-100",
                    "transition-all duration-300",
                    "hover:text-yellow-800 dark:hover:text-yellow-50"
                  )}
                  fill="currentColor"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className={cn(
          "order-1 lg:order-2",
          // Mobile-first responsive spacing
          "space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8",
          // Mobile-first responsive padding
          "px-4 sm:px-6 lg:px-0"
        )}>
          {/* Title and Subtitle */}
          <div className={cn(
            "space-y-1 sm:space-y-2",
            "text-center lg:text-left"
          )}>
            <h2 className={cn(
              // Mobile-first responsive typography
              "text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl",
              "font-bold text-gray-900 dark:text-gray-100",
              "leading-tight"
            )}>
              {title}
            </h2>
            <h3 className={cn(
              // Mobile-first responsive typography
              "text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl",
              "font-bold text-primary",
              "leading-tight"
            )}>
              {subtitle}
            </h3>
          </div>
          
          {/* Description */}
          <p className={cn(
            "text-gray-600 dark:text-gray-400 leading-relaxed",
            // Mobile-first responsive text sizing
            "text-sm sm:text-base lg:text-lg",
            "text-center lg:text-left",
            "max-w-2xl lg:max-w-none mx-auto lg:mx-0"
          )}>
            {description}
          </p>
          
          {/* Benefits List */}
          <div className={cn(
            // Mobile-first responsive spacing
            "space-y-3 sm:space-y-4 lg:space-y-5",
            "max-w-2xl lg:max-w-none mx-auto lg:mx-0"
          )}>
            {validatedBenefits.map((benefit, index) => (
              <div 
                key={`benefit-${index}`}
                className={cn(
                  "flex items-start space-x-3 group",
                  // Mobile-first responsive padding
                  "p-2 sm:p-3 lg:p-4",
                  "rounded-lg border border-transparent",
                  // Enhanced interactive states
                  "transition-all duration-300 ease-out",
                  "hover:bg-gray-50 dark:hover:bg-gray-800/30",
                  "hover:border-gray-200 dark:hover:border-gray-700",
                  "hover:shadow-sm hover:-translate-y-0.5",
                  "focus-within:bg-gray-50 dark:focus-within:bg-gray-800/30",
                  "focus-within:border-gray-200 dark:focus-within:border-gray-700",
                  "focus-within:shadow-sm focus-within:-translate-y-0.5",
                  "cursor-pointer"
                )}
                tabIndex={0}
                role="listitem"
                aria-label={benefit.text}
              >
                {/* Icon with fallback */}
                <div className={cn(
                  "flex-shrink-0 mt-0.5",
                  // Mobile-first responsive icon sizing
                  "w-5 h-5 sm:w-6 sm:h-6",
                  // Icon animation container
                  "transition-transform duration-300 ease-out",
                  "group-hover:scale-110 group-hover:rotate-3",
                  "group-focus:scale-110 group-focus:rotate-3"
                )}>
                  <IconWithFallback 
                    iconName={benefit.icon}
                    fallbackIcon="CheckCircle"
                    className={cn(
                      "w-full h-full",
                      // Enhanced color transitions
                      "text-primary/80 group-hover:text-primary",
                      "group-focus:text-primary",
                      "transition-all duration-300 ease-out",
                      // Subtle glow effect on hover
                      "group-hover:drop-shadow-sm group-focus:drop-shadow-sm"
                    )}
                    ariaLabel={`Icon for ${benefit.text}`}
                  />
                </div>
                
                {/* Benefit Text */}
                <span className={cn(
                  "font-medium leading-relaxed",
                  // Mobile-first responsive text sizing
                  "text-sm sm:text-base lg:text-lg",
                  // Enhanced color transitions
                  "text-gray-700 dark:text-gray-300",
                  "group-hover:text-gray-900 dark:group-hover:text-gray-100",
                  "group-focus:text-gray-900 dark:group-focus:text-gray-100",
                  "transition-colors duration-300 ease-out"
                )}>
                  {benefit.text}
                </span>
              </div>
            ))}
          </div>
          
          {/* Read More Button */}
          <div className={cn(
            // Mobile-first responsive spacing and alignment
            "pt-2 sm:pt-4 lg:pt-6",
            "text-center lg:text-left"
          )}>
            <Button 
              variant="default"
              size="lg"
              onClick={onReadMore}
              className={cn(
                // Mobile-first responsive button sizing
                "px-6 sm:px-8 lg:px-10",
                "py-2.5 sm:py-3 lg:py-3.5",
                "text-sm sm:text-base font-medium",
                "min-w-[120px] sm:min-w-[140px]",
                // Enhanced interactive states
                "transition-all duration-300 ease-out",
                "hover:shadow-lg hover:shadow-primary/25",
                "hover:-translate-y-1 hover:scale-105",
                "focus:shadow-lg focus:shadow-primary/25",
                "focus:-translate-y-1 focus:scale-105",
                "focus:ring-2 focus:ring-primary/20 focus:ring-offset-2",
                "active:translate-y-0 active:scale-100",
                // Gradient background animation
                "bg-gradient-to-r from-primary to-primary",
                "hover:from-primary/90 hover:to-primary/80",
                "focus:from-primary/90 focus:to-primary/80",
                // Text effects
                "relative overflow-hidden",
                "before:absolute before:inset-0",
                "before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0",
                "before:translate-x-[-100%] hover:before:translate-x-[100%]",
                "before:transition-transform before:duration-700 before:ease-out"
              )}
            >
              Read More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;