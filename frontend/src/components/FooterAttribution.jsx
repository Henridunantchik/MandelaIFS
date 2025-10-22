/**
 * Website Author: Henri-Dunant CHIK
 * Email: hdchikuru7@gmail.com
 * GitHub: https://github.com/Henridunantchik
 * Phone: +256773840148
 * 
 * Development: Kuna Creatives Africa
 * Website: https://www.kunacreatives.africa/
 */

import React from 'react'

/**
 * FooterAttribution Component
 * 
 * Displays professional attribution for Kuna Creatives Africa with proper styling
 * and accessibility features. Includes heart and coffee emojis as specified in requirements.
 * 
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes for styling customization
 * @param {'default' | 'minimal'} props.variant - Display variant (default: 'default')
 * @returns {JSX.Element} Footer attribution component
 */
const FooterAttribution = ({
    className = '',
    variant = 'default'
}) => {
    const baseClasses = 'text-center py-3 border-t border-gray-800'
    const textClasses = 'text-xs text-gray-400'
    const linkClasses = 'text-gray-300 hover:text-white transition-colors duration-200 underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-sm'

    return (
        <div className={`${baseClasses} ${className}`}>
            <p className={textClasses}>
                Made with{' '}
                <span className="text-red-400" role="img" aria-label="love">❤️</span>
                {' '}and{' '}
                <span className="text-yellow-600" role="img" aria-label="coffee">☕</span>
                {' '}by{' '}
                <a
                    href="https://www.kunacreatives.africa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClasses}
                    aria-label="Visit Kuna Creatives Africa website (opens in new tab)"
                >
                    Kuna Creatives Africa
                </a>
            </p>
        </div>
    )
}

export default FooterAttribution