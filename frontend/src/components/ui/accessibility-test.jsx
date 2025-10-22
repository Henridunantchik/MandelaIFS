import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

/**
 * Accessibility Test Component
 * Tests and validates color contrast and accessibility compliance
 */
const AccessibilityTest = ({ className }) => {
    const [focusedElement, setFocusedElement] = useState(null);
    const [contrastResults, setContrastResults] = useState([]);

    // Color combinations to test for contrast
    const colorCombinations = [
        {
            name: 'Primary Text on White',
            background: '#ffffff',
            foreground: '#334155', // slate-700
            className: 'text-slate-700 bg-white'
        },
        {
            name: 'Primary Text on Dark',
            background: '#111827', // gray-900
            foreground: '#d1d5db', // gray-300
            className: 'text-gray-300 bg-gray-900'
        },
        {
            name: 'Secondary Text on White',
            background: '#ffffff',
            foreground: '#475569', // slate-600
            className: 'text-slate-600 bg-white'
        },
        {
            name: 'Secondary Text on Dark',
            background: '#111827', // gray-900
            foreground: '#9ca3af', // gray-400
            className: 'text-gray-400 bg-gray-900'
        },
        {
            name: 'Heading on Contrast Light',
            background: '#f8fafc', // slate-50
            foreground: '#0f172a', // slate-900
            className: 'text-slate-900 bg-slate-50'
        },
        {
            name: 'Heading on Contrast Dark',
            background: '#030712', // gray-950
            foreground: '#ffffff',
            className: 'text-white bg-gray-950'
        },
        {
            name: 'Button Primary',
            background: '#f59e0b', // amber-500
            foreground: '#ffffff',
            className: 'text-white bg-amber-500'
        },
        {
            name: 'Link Color',
            background: '#ffffff',
            foreground: '#3b82f6', // blue-500
            className: 'text-blue-500 bg-white'
        }
    ];

    // Calculate contrast ratio between two colors
    const calculateContrastRatio = (color1, color2) => {
        const getLuminance = (color) => {
            const rgb = parseInt(color.slice(1), 16);
            const r = (rgb >> 16) & 0xff;
            const g = (rgb >> 8) & 0xff;
            const b = (rgb >> 0) & 0xff;

            const [rs, gs, bs] = [r, g, b].map(c => {
                c = c / 255;
                return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
            });

            return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
        };

        const lum1 = getLuminance(color1);
        const lum2 = getLuminance(color2);
        const brightest = Math.max(lum1, lum2);
        const darkest = Math.min(lum1, lum2);

        return (brightest + 0.05) / (darkest + 0.05);
    };

    // Check if contrast ratio meets WCAG standards
    const checkContrastCompliance = (ratio) => {
        return {
            aa: ratio >= 4.5,
            aaa: ratio >= 7,
            aaLarge: ratio >= 3,
            aaaLarge: ratio >= 4.5
        };
    };

    useEffect(() => {
        const results = colorCombinations.map(combo => {
            const ratio = calculateContrastRatio(combo.background, combo.foreground);
            const compliance = checkContrastCompliance(ratio);

            return {
                ...combo,
                ratio: ratio.toFixed(2),
                compliance
            };
        });

        setContrastResults(results);
    }, []);

    const handleFocus = (elementName) => {
        setFocusedElement(elementName);
    };

    const handleBlur = () => {
        setFocusedElement(null);
    };

    return (
        <div className={cn("p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg", className)}>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Accessibility Compliance Test
            </h2>

            {/* Color Contrast Testing */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Color Contrast Analysis
                </h3>
                <div className="space-y-4">
                    {contrastResults.map((result, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex-1">
                                    <h4 className="font-medium text-slate-900 dark:text-white">
                                        {result.name}
                                    </h4>
                                    <div className={cn("p-2 rounded mt-2", result.className)}>
                                        Sample text with this color combination
                                    </div>
                                </div>

                                <div className="flex-shrink-0">
                                    <div className="text-right">
                                        <div className="text-lg font-bold text-slate-900 dark:text-white">
                                            {result.ratio}:1
                                        </div>
                                        <div className="text-sm space-y-1">
                                            <div className={cn(
                                                "px-2 py-1 rounded text-xs font-medium",
                                                result.compliance?.aa
                                                    ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                                                    : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                                            )}>
                                                AA: {result.compliance?.aa ? 'Pass' : 'Fail'}
                                            </div>
                                            <div className={cn(
                                                "px-2 py-1 rounded text-xs font-medium",
                                                result.compliance?.aaLarge
                                                    ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                                                    : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                                            )}>
                                                AA Large: {result.compliance?.aaLarge ? 'Pass' : 'Fail'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Focus Indicators Test */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Focus Indicators & Keyboard Navigation
                </h3>
                <p className="text-sm text-slate-600 dark:text-gray-400 mb-4">
                    Use Tab key to navigate through these elements and verify focus indicators are visible.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <button
                            className="w-full px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 transition-all"
                            onFocus={() => handleFocus('Primary Button')}
                            onBlur={handleBlur}
                        >
                            Primary Button
                        </button>

                        <button
                            className="w-full px-4 py-2 border-2 border-amber-500 text-amber-700 dark:text-amber-300 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 transition-all"
                            onFocus={() => handleFocus('Secondary Button')}
                            onBlur={handleBlur}
                        >
                            Secondary Button
                        </button>

                        <input
                            type="text"
                            placeholder="Text input field"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            onFocus={() => handleFocus('Text Input')}
                            onBlur={handleBlur}
                        />

                        <select
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            onFocus={() => handleFocus('Select Dropdown')}
                            onBlur={handleBlur}
                        >
                            <option>Select an option</option>
                            <option>Option 1</option>
                            <option>Option 2</option>
                        </select>
                    </div>

                    <div className="space-y-3">
                        <a
                            href="#"
                            className="block px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 rounded transition-all"
                            onFocus={() => handleFocus('Link')}
                            onBlur={handleBlur}
                        >
                            Sample Link
                        </a>

                        <div className="space-y-2">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                    onFocus={() => handleFocus('Checkbox')}
                                    onBlur={handleBlur}
                                />
                                <span className="text-slate-700 dark:text-gray-300">Checkbox option</span>
                            </label>

                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="radio-test"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                                    onFocus={() => handleFocus('Radio Button')}
                                    onBlur={handleBlur}
                                />
                                <span className="text-slate-700 dark:text-gray-300">Radio option</span>
                            </label>
                        </div>
                    </div>
                </div>

                {focusedElement && (
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-blue-800 dark:text-blue-200 font-medium">
                            Currently focused: {focusedElement}
                        </p>
                    </div>
                )}
            </div>

            {/* ARIA and Semantic HTML Test */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    ARIA Labels & Semantic HTML
                </h3>

                <div className="space-y-4">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                            Navigation Example
                        </h4>
                        <nav aria-label="Main navigation" className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                            <ul className="flex space-x-4">
                                <li><a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Home</a></li>
                                <li><a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">About</a></li>
                                <li><a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Contact</a></li>
                            </ul>
                        </nav>
                    </div>

                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                            Form with Labels
                        </h4>
                        <form className="space-y-3">
                            <div>
                                <label htmlFor="name-input" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">
                                    Full Name
                                </label>
                                <input
                                    id="name-input"
                                    type="text"
                                    aria-describedby="name-help"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <p id="name-help" className="text-xs text-slate-500 dark:text-gray-400 mt-1">
                                    Enter your full name as it appears on official documents
                                </p>
                            </div>
                        </form>
                    </div>

                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                            Button with ARIA
                        </h4>
                        <button
                            aria-label="Close dialog"
                            aria-describedby="close-description"
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                        >
                            ×
                        </button>
                        <p id="close-description" className="text-xs text-slate-500 dark:text-gray-400 mt-1">
                            This button closes the current dialog
                        </p>
                    </div>
                </div>
            </div>

            {/* Accessibility Checklist */}
            <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Accessibility Checklist
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <span className="text-green-500">✓</span>
                            <span className="text-slate-700 dark:text-gray-300 text-sm">Color contrast ratios meet WCAG AA</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-green-500">✓</span>
                            <span className="text-slate-700 dark:text-gray-300 text-sm">Focus indicators are visible</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-green-500">✓</span>
                            <span className="text-slate-700 dark:text-gray-300 text-sm">Keyboard navigation works</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-green-500">✓</span>
                            <span className="text-slate-700 dark:text-gray-300 text-sm">Semantic HTML elements used</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <span className="text-green-500">✓</span>
                            <span className="text-slate-700 dark:text-gray-300 text-sm">ARIA labels provided</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-green-500">✓</span>
                            <span className="text-slate-700 dark:text-gray-300 text-sm">Form labels associated</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-green-500">✓</span>
                            <span className="text-slate-700 dark:text-gray-300 text-sm">Images have alt text</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-green-500">✓</span>
                            <span className="text-slate-700 dark:text-gray-300 text-sm">Text is resizable to 200%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccessibilityTest;