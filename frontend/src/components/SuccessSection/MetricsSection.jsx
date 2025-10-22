import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import ProgressBar from './ProgressBar';
import { cn } from '../../lib/utils';

const MetricsSection = ({ 
  title = "Successful & Sustainable Growth",
  description = "Denounce with righteous indignation and dislike men who are beguiled and demoralized by the charms of pleasure.",
  metrics = [],
  className = "",
  onReadMore = () => {}
}) => {
  // Default metrics data with validation
  const defaultMetrics = [
    { label: "Recruitment Process", percentage: 48, color: "bg-blue-500" },
    { label: "Employee Relations", percentage: 79, color: "bg-green-500" },
    { label: "Compliance Audits", percentage: 65, color: "bg-teal-500" }
  ];

  // Validate and use provided metrics or defaults
  const validatedMetrics = (metrics.length > 0 ? metrics : defaultMetrics).map(metric => ({
    label: metric.label || "Metric",
    percentage: Math.max(0, Math.min(100, metric.percentage || 0)),
    color: metric.color || "bg-blue-500"
  }));

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className={cn(
        "text-center",
        // Mobile-first responsive padding
        "px-4 sm:px-6 lg:px-8",
        "pt-6 sm:pt-8 lg:pt-10",
        "pb-4 sm:pb-6 lg:pb-8"
      )}>
        <CardTitle className={cn(
          // Mobile-first responsive typography
          "text-xl sm:text-2xl md:text-3xl lg:text-4xl",
          "font-bold text-gray-900 dark:text-gray-100",
          "mb-3 sm:mb-4 lg:mb-6",
          "leading-tight"
        )}>
          {title}
        </CardTitle>
        <CardDescription className={cn(
          "text-gray-600 dark:text-gray-400",
          "max-w-2xl mx-auto leading-relaxed",
          // Mobile-first responsive text sizing
          "text-sm sm:text-base lg:text-lg",
          "px-2 sm:px-0"
        )}>
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className={cn(
        // Mobile-first responsive padding and spacing
        "px-4 sm:px-6 lg:px-8",
        "pb-6 sm:pb-8 lg:pb-10",
        "space-y-6 sm:space-y-8"
      )}>
        {/* Progress bars grid with improved responsive layout */}
        <div className={cn(
          // Mobile-first grid layout
          "grid gap-4 sm:gap-6 lg:gap-8",
          // Responsive columns: 1 on mobile, 2 on tablet, 3 on desktop
          "grid-cols-1",
          "sm:grid-cols-2",
          "lg:grid-cols-3",
          // Ensure equal height items
          "auto-rows-fr"
        )}>
          {validatedMetrics.map((metric, index) => (
            <div 
              key={`${metric.label}-${index}`}
              className={cn(
                "space-y-2 sm:space-y-3",
                // Add subtle background for better visual separation on mobile
                "p-3 sm:p-4 lg:p-5",
                "bg-white/50 dark:bg-gray-800/30",
                "rounded-lg border border-gray-100 dark:border-gray-700/50",
                "transition-all duration-200",
                "hover:bg-white/80 dark:hover:bg-gray-800/50",
                "hover:shadow-sm"
              )}
            >
              <ProgressBar
                label={metric.label}
                percentage={metric.percentage}
                color={metric.color}
                animated={true}
                className="w-full"
              />
            </div>
          ))}
        </div>
        
        {/* READ MORE button with responsive spacing */}
        <div className={cn(
          "flex justify-center",
          "mt-6 sm:mt-8 lg:mt-10"
        )}>
          <Button 
            variant="outline"
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
              "hover:shadow-lg hover:shadow-primary/20",
              "hover:-translate-y-0.5 hover:scale-105",
              "focus:shadow-lg focus:shadow-primary/20",
              "focus:-translate-y-0.5 focus:scale-105",
              "focus:ring-2 focus:ring-primary/20 focus:ring-offset-2",
              "active:translate-y-0 active:scale-100",
              // Improved border and background interactions
              "border-2 hover:border-primary/60 focus:border-primary/60",
              "hover:bg-primary/5 focus:bg-primary/5",
              // Smooth text color transitions
              "hover:text-primary focus:text-primary"
            )}
          >
            READ MORE
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsSection;