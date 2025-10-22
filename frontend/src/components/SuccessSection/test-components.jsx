// Simple test file to verify components work
import React from 'react';
import ImageWithFallback from './ImageWithFallback';
import IconWithFallback from './IconWithFallback';
import geometricShapesImage from '../../assets/geometric-shapes.svg';

const TestComponents = () => {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Component Tests</h1>
      
      {/* Test ImageWithFallback */}
      <div>
        <h2 className="text-lg font-semibold mb-4">ImageWithFallback Test</h2>
        <ImageWithFallback
          src={geometricShapesImage}
          alt="Test geometric shapes"
          className="w-64 h-64 border rounded"
        />
      </div>
      
      {/* Test IconWithFallback */}
      <div>
        <h2 className="text-lg font-semibold mb-4">IconWithFallback Test</h2>
        <div className="flex space-x-4">
          <IconWithFallback iconName="Lightbulb" className="w-8 h-8 text-yellow-500" />
          <IconWithFallback iconName="DollarSign" className="w-8 h-8 text-green-500" />
          <IconWithFallback iconName="Shield" className="w-8 h-8 text-blue-500" />
          <IconWithFallback iconName="InvalidIcon" className="w-8 h-8 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default TestComponents;