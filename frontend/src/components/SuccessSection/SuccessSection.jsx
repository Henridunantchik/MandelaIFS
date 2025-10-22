import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { ArrowRight, Lightbulb, Zap } from 'lucide-react';

const SuccessSection = ({ 
  metricsDescription = "Denounce with righteous indignation and dislike men who are beguiled and demoralized by the charms of pleasure.",
  benefitsTitle = "Showing You",
  benefitsSubtitle = "The Way of Success", 
  benefitsDescription = "Denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure moment so blinded by desire that they cannot foresee the pain and trouble.",
  className = "",
  onMetricsReadMore,
  onBenefitsReadMore
}) => {
  const [activeTab, setActiveTab] = useState('benefits');

  // Metrics data matching the design exactly
  const metrics = [
    { label: "Recruitment Process", percentage: 48 },
    { label: "Employee Relations", percentage: 79 },
    { label: "Compliance Audits", percentage: 65 }
  ];

  // Benefits data matching the design
  const benefits = [
    "Cost-Effective Services",
    "Helps Reduce Business Risks", 
    "Management of Employee Performance",
    "Increasing Company's Agility"
  ];

  const tabs = [
    { id: 'benefits', label: '01.BENEFITS' },
    { id: 'hr-advice', label: '02. HR ADVICE' },
    { id: 'hr-audit', label: '03. HR AUDIT' }
  ];

  // Custom geometric shapes component to match the exact design
  const GeometricShapes = () => (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Base platform */}
      <div className="relative bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg shadow-lg p-8 h-64">
        {/* Colorful geometric pyramids */}
        <div className="absolute inset-0 flex items-end justify-center space-x-2 pb-8">
          {/* Light blue/cyan pyramid */}
          <div className="w-16 h-20 bg-gradient-to-t from-cyan-400 to-cyan-300 transform rotate-12" 
               style={{
                 clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                 filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.1))'
               }}>
          </div>
          
          {/* Yellow pyramid */}
          <div className="w-20 h-24 bg-gradient-to-t from-yellow-400 to-yellow-300 transform -rotate-6" 
               style={{
                 clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                 filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.1))'
               }}>
          </div>
          
          {/* Orange/red pyramid */}
          <div className="w-18 h-28 bg-gradient-to-t from-orange-500 to-orange-400 transform rotate-3" 
               style={{
                 clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                 filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.1))'
               }}>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={cn("bg-white dark:bg-gray-900", className)}>
      {/* Top Section - Metrics */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left side - Title and Description */}
            <div className="space-y-8">
              <div>
                <h2 className="text-teal-500 text-xl font-semibold mb-3 tracking-wide">
                  Successful &
                </h2>
                <h3 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  Sustainable Growth
                </h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-lg">
                {metricsDescription}
              </p>
              
              <button 
                className="flex items-center text-gray-900 dark:text-white hover:text-teal-500 dark:hover:text-teal-400 font-semibold text-lg transition-colors duration-200 group"
                onClick={onMetricsReadMore}
              >
                READ MORE 
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>

            {/* Right side - Progress Bars */}
            <div className="space-y-10">
              {metrics.map((metric, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 dark:text-white font-semibold text-lg">
                      {metric.label}
                    </span>
                    <span className="text-teal-500 font-bold text-2xl">
                      {metric.percentage}%
                    </span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-teal-400 to-teal-500 h-3 rounded-full transition-all duration-1500 ease-out relative shadow-sm"
                        style={{ width: `${metric.percentage}%` }}
                      >
                        <ArrowRight 
                          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-3 h-5 w-5 text-teal-500" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Benefits with Tabs */}
      <div className="bg-gray-50 dark:bg-gray-800/50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Navigation Tabs */}
          <div className="flex justify-center mb-20">
            <div className="flex space-x-12 lg:space-x-20">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "text-base lg:text-lg font-semibold transition-all duration-300 pb-3 border-b-2",
                    activeTab === tab.id 
                      ? "text-teal-500 border-teal-500" 
                      : "text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          {activeTab === 'benefits' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Left side - Geometric Shapes with Icons */}
              <div className="relative">
                <GeometricShapes />
                
                {/* Light bulb icon - top left */}
                <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl">
                  <div className="w-10 h-10 border-3 border-white rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white fill-current" />
                  </div>
                </div>
                
                {/* Hexagonal Badge - bottom left */}
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-teal-600 text-white flex items-center justify-center shadow-xl transform rotate-6"
                     style={{
                       clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
                     }}>
                  <span className="text-3xl font-bold transform -rotate-6">01</span>
                </div>
              </div>

              {/* Right side - Content */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-teal-500 text-3xl lg:text-4xl font-bold mb-3">
                    {benefitsTitle}
                  </h2>
                  <h3 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                    {benefitsSubtitle}
                  </h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-lg">
                  {benefitsDescription}
                </p>
                
                <div className="space-y-5">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-3 h-3 bg-teal-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium text-lg">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="bg-teal-500 hover:bg-teal-600 text-white px-10 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-teal-500 hover:border-teal-600"
                  onClick={onBenefitsReadMore}
                >
                  Read More
                </Button>
              </div>
            </div>
          )}

          {/* Placeholder content for other tabs */}
          {activeTab !== 'benefits' && (
            <div className="text-center py-20">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {activeTab === 'hr-advice' ? 'HR Advice' : 'HR Audit'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Content for {activeTab === 'hr-advice' ? 'HR Advice' : 'HR Audit'} section coming soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessSection;