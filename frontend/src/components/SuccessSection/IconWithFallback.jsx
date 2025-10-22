import React from 'react';
import { 
  DollarSign, 
  Shield, 
  Users, 
  Zap, 
  Lightbulb, 
  CheckCircle,
  Star,
  Award,
  TrendingUp,
  Target,
  Sparkles
} from 'lucide-react';

// Icon mapping for dynamic icon rendering
const iconMap = {
  DollarSign,
  Shield,
  Users,
  Zap,
  Lightbulb,
  CheckCircle,
  Star,
  Award,
  TrendingUp,
  Target,
  Sparkles
};

const IconWithFallback = ({ 
  iconName = 'CheckCircle', 
  className = 'w-5 h-5', 
  fallbackIcon = 'CheckCircle',
  ariaLabel,
  ...props 
}) => {
  // Get the icon component or fallback
  const IconComponent = iconMap[iconName] || iconMap[fallbackIcon] || CheckCircle;
  
  return (
    <IconComponent 
      className={className}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
      role={ariaLabel ? 'img' : undefined}
      {...props}
    />
  );
};

// Export individual icons for direct use
export {
  DollarSign,
  Shield,
  Users,
  Zap,
  Lightbulb,
  CheckCircle,
  Star,
  Award,
  TrendingUp,
  Target,
  Sparkles,
  iconMap
};

export default IconWithFallback;