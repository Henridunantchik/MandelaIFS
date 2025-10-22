import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * @typedef {'primary' | 'contrast' | 'accent' | 'hero'} BackgroundVariant
 */

/**
 * @typedef {Object} SectionBackgroundProps
 * @property {BackgroundVariant} variant - The background variant to apply
 * @property {React.ReactNode} children - The content to render inside the section
 * @property {string} [className] - Additional CSS classes to apply
 * @property {string} [containerClassName] - Additional CSS classes for the container
 * @property {boolean} [noContainer=false] - Whether to skip the container wrapper
 * @property {boolean} [noPadding=false] - Whether to skip default padding
 */

/**
 * Background variant styles mapping
 */
const backgroundVariants = {
    primary: "bg-white dark:bg-gray-900",
    contrast: "bg-slate-50 dark:bg-gray-950",
    accent: "bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-950 dark:to-blue-950",
    hero: "" // Hero maintains its own styling
}

/**
 * Default padding classes for sections
 */
const defaultPadding = "py-12 md:py-16"

/**
 * Default container classes for content width
 */
const defaultContainer = "max-w-7xl mx-auto px-4"

/**
 * SectionBackground component provides consistent background styling and layout
 * for different sections of the home page
 */
const SectionBackground = React.forwardRef(({
    variant = 'primary',
    children,
    className,
    containerClassName,
    noContainer = false,
    noPadding = false,
    ...props
}, ref) => {
    const sectionClasses = cn(
        !noPadding && defaultPadding,
        backgroundVariants[variant],
        className
    )

    const containerClasses = cn(
        defaultContainer,
        containerClassName
    )

    return (
        <section
            ref={ref}
            className={sectionClasses}
            {...props}
        >
            {noContainer ? (
                children
            ) : (
                <div className={containerClasses}>
                    {children}
                </div>
            )}
        </section>
    )
})

SectionBackground.displayName = "SectionBackground"

export { SectionBackground, backgroundVariants, defaultPadding, defaultContainer }