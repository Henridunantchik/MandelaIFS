import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

/**
 * Responsive Test Component
 * Tests and validates responsive behavior across all breakpoints
 */
const ResponsiveTest = ({ className }) => {
    const [screenSize, setScreenSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0
    });

    const [currentBreakpoint, setCurrentBreakpoint] = useState('');

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            setScreenSize({ width, height });

            // Determine current breakpoint based on Tailwind CSS defaults
            if (width < 640) {
                setCurrentBreakpoint('xs (< 640px)');
            } else if (width < 768) {
                setCurrentBreakpoint('sm (640px - 767px)');
            } else if (width < 1024) {
                setCurrentBreakpoint('md (768px - 1023px)');
            } else if (width < 1280) {
                setCurrentBreakpoint('lg (1024px - 1279px)');
            } else if (width < 1536) {
                setCurrentBreakpoint('xl (1280px - 1535px)');
            } else {
                setCurrentBreakpoint('2xl (≥ 1536px)');
            }
        };

        handleResize(); // Set initial values
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const breakpoints = [
        { name: 'Mobile (320px)', width: 320, description: 'Minimum mobile width' },
        { name: 'Mobile (375px)', width: 375, description: 'iPhone SE' },
        { name: 'Mobile (414px)', width: 414, description: 'iPhone Plus' },
        { name: 'Tablet (768px)', width: 768, description: 'iPad Portrait' },
        { name: 'Tablet (1024px)', width: 1024, description: 'iPad Landscape' },
        { name: 'Desktop (1280px)', width: 1280, description: 'Small Desktop' },
        { name: 'Desktop (1920px)', width: 1920, description: 'Full HD' }
    ];

    const testSectionBackgrounds = () => {
        const variants = ['primary', 'contrast', 'accent'];
        return variants.map(variant => (
            <div key={variant} className={cn(
                'p-4 rounded-lg mb-4',
                variant === 'primary' && 'bg-white dark:bg-gray-900',
                variant === 'contrast' && 'bg-slate-50 dark:bg-gray-950',
                variant === 'accent' && 'bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-950 dark:to-blue-950'
            )}>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {variant.charAt(0).toUpperCase() + variant.slice(1)} Background
                </h3>
                <p className="text-slate-700 dark:text-gray-300 text-sm">
                    Testing {variant} background variant responsiveness
                </p>
            </div>
        ));
    };

    return (
        <div className={cn("p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg", className)}>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Responsive Design Test Dashboard
            </h2>

            {/* Current Screen Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Current Screen</h3>
                    <p className="text-blue-800 dark:text-blue-200">
                        {screenSize.width} × {screenSize.height}px
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                        Breakpoint: {currentBreakpoint}
                    </p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">Test Status</h3>
                    <p className="text-green-800 dark:text-green-200">
                        {screenSize.width >= 320 ? '✓ Mobile Ready' : '✗ Too Narrow'}
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                        Minimum width: 320px
                    </p>
                </div>
            </div>

            {/* Breakpoint Reference */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Breakpoint Reference
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {breakpoints.map((bp, index) => (
                        <div
                            key={index}
                            className={cn(
                                "p-3 rounded border text-sm",
                                screenSize.width >= bp.width
                                    ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                                    : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            )}
                        >
                            <div className="font-medium text-slate-900 dark:text-white">
                                {bp.name}
                            </div>
                            <div className="text-slate-600 dark:text-gray-400">
                                {bp.description}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Typography Test */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Typography Responsiveness
                </h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                            Section Title (text-3xl md:text-4xl)
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-gray-400">
                            Should scale from 3xl to 4xl at md breakpoint
                        </p>
                    </div>

                    <div>
                        <h5 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white">
                            Card Title (text-lg md:text-xl)
                        </h5>
                        <p className="text-sm text-slate-600 dark:text-gray-400">
                            Should scale from lg to xl at md breakpoint
                        </p>
                    </div>

                    <div>
                        <p className="text-slate-700 dark:text-gray-300">
                            Body text with consistent color (text-slate-700 dark:text-gray-300)
                        </p>
                    </div>
                </div>
            </div>

            {/* Background Variants Test */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Background Variants Test
                </h3>
                {testSectionBackgrounds()}
            </div>

            {/* Spacing Test */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Spacing Test
                </h3>
                <div className="py-12 md:py-16 bg-slate-100 dark:bg-gray-800 rounded-lg">
                    <div className="max-w-7xl mx-auto px-4">
                        <p className="text-center text-slate-700 dark:text-gray-300">
                            Section with py-12 md:py-16 padding and max-w-7xl mx-auto px-4 container
                        </p>
                    </div>
                </div>
            </div>

            {/* Grid Test */}
            <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Grid Responsiveness Test
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(num => (
                        <div
                            key={num}
                            className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded text-center"
                        >
                            <div className="text-blue-900 dark:text-blue-100 font-medium">
                                Card {num}
                            </div>
                            <div className="text-sm text-blue-700 dark:text-blue-300">
                                1 col → 2 cols → 4 cols
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResponsiveTest;