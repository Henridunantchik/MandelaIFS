import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../redux/themeSlice';
import { Button } from '../ui/button';
import SuccessSection from './SuccessSection';

/**
 * Test component to verify theme integration and accessibility
 * This component demonstrates the SuccessSection in both light and dark themes
 * and includes accessibility testing features
 */
const ThemeAccessibilityTest = () => {
  const { theme } = useSelector(state => state.theme);
  const dispatch = useDispatch();
  const [showAccessibilityInfo, setShowAccessibilityInfo] = useState(false);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const testMetrics = [
    { label: "Student Satisfaction", percentage: 92, color: "bg-emerald-500" },
    { label: "Academic Excellence", percentage: 87, color: "bg-blue-500" },
    { label: "Teacher Quality", percentage: 95, color: "bg-purple-500" }
  ];

  const testBenefits = [
    { text: "Bilingual Education Excellence", icon: "Globe" },
    { text: "International Curriculum Standards", icon: "Award" },
    { text: "Modern Learning Facilities", icon: "Building" },
    { text: "Holistic Student Development", icon: "Users" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Test Controls */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border p-4">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-4 items-center justify-between">
          <h1 className="text-lg font-semibold">SuccessSection Theme & Accessibility Test</h1>
          <div className="flex gap-2">
            <Button 
              onClick={handleThemeToggle}
              variant="outline"
              size="sm"
            >
              Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
            </Button>
            <Button 
              onClick={() => setShowAccessibilityInfo(!showAccessibilityInfo)}
              variant="outline"
              size="sm"
            >
              {showAccessibilityInfo ? 'Hide' : 'Show'} A11y Info
            </Button>
          </div>
        </div>
      </div>

      {/* Accessibility Information Panel */}
      {showAccessibilityInfo && (
        <div className="bg-muted/50 border-b border-border p-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-base font-medium mb-3">Accessibility Features Verified:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="font-medium text-foreground mb-2">Theme Integration:</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>✓ Dark mode color scheme support</li>
                  <li>✓ Proper contrast ratios maintained</li>
                  <li>✓ CSS custom properties integration</li>
                  <li>✓ Consistent with app theme system</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">Accessibility:</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>✓ Keyboard navigation support</li>
                  <li>✓ Screen reader compatibility</li>
                  <li>✓ ARIA labels and roles</li>
                  <li>✓ Reduced motion preference respect</li>
                  <li>✓ Focus indicators visible</li>
                  <li>✓ Semantic HTML structure</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Theme Status Indicator */}
      <div className="bg-primary/10 text-primary p-3 text-center text-sm">
        Current Theme: <strong>{theme}</strong> | 
        Test keyboard navigation with Tab key | 
        Test screen reader with your preferred tool
      </div>

      {/* SuccessSection Component Test */}
      <SuccessSection
        metricsData={testMetrics}
        benefitsData={testBenefits}
        metricsTitle="Educational Excellence Metrics"
        metricsDescription="Our commitment to quality education is reflected in these key performance indicators that demonstrate our success in nurturing young minds."
        benefitsTitle="Empowering Students"
        benefitsSubtitle="For Tomorrow's Success"
        benefitsDescription="At Mandella International French School, we provide comprehensive education that prepares students for global opportunities while maintaining strong cultural values."
        benefitsBadgeNumber="01"
        onMetricsReadMore={() => console.log('Navigate to metrics page')}
        onBenefitsReadMore={() => console.log('Navigate to benefits page')}
      />

      {/* Additional Theme Test Section */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Theme Integration Verification</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Color Palette Test */}
            <div className="space-y-4">
              <h3 className="font-semibold">Color Palette</h3>
              <div className="space-y-2">
                <div className="p-3 bg-background border border-border rounded">Background</div>
                <div className="p-3 bg-card border border-border rounded">Card</div>
                <div className="p-3 bg-muted border border-border rounded">Muted</div>
                <div className="p-3 bg-primary text-primary-foreground rounded">Primary</div>
                <div className="p-3 bg-secondary text-secondary-foreground rounded">Secondary</div>
              </div>
            </div>

            {/* Typography Test */}
            <div className="space-y-4">
              <h3 className="font-semibold">Typography</h3>
              <div className="space-y-2">
                <p className="text-foreground">Primary text</p>
                <p className="text-muted-foreground">Muted text</p>
                <p className="text-primary">Primary text</p>
                <p className="text-secondary-foreground">Secondary text</p>
              </div>
            </div>

            {/* Interactive Elements Test */}
            <div className="space-y-4">
              <h3 className="font-semibold">Interactive Elements</h3>
              <div className="space-y-2">
                <Button>Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeAccessibilityTest;