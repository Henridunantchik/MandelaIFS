import React from 'react'
import { SectionBackground } from './section-background'
import { typographyStyles, cardStyles } from '../../lib/section-config'

/**
 * Demo component showing how to use SectionBackground with different variants
 * This is for development/testing purposes
 */
const SectionBackgroundDemo = () => {
    return (
        <div className="space-y-0">
            {/* Primary Background Example */}
            <SectionBackground variant="primary">
                <div className="text-center">
                    <h2 className={typographyStyles.sectionTitle}>Primary Background Section</h2>
                    <p className={typographyStyles.bodyText}>
                        This section uses the primary background variant (white/gray-900).
                    </p>
                    <div className={`${cardStyles.full} mt-6 max-w-md mx-auto`}>
                        <h3 className={typographyStyles.cardTitle}>Sample Card</h3>
                        <p className={typographyStyles.secondaryText}>
                            This card demonstrates the consistent styling.
                        </p>
                    </div>
                </div>
            </SectionBackground>

            {/* Contrast Background Example */}
            <SectionBackground variant="contrast">
                <div className="text-center">
                    <h2 className={typographyStyles.sectionTitle}>Contrast Background Section</h2>
                    <p className={typographyStyles.bodyText}>
                        This section uses the contrast background variant (slate-50/gray-950).
                    </p>
                    <div className={`${cardStyles.full} mt-6 max-w-md mx-auto`}>
                        <h3 className={typographyStyles.cardTitle}>Sample Card</h3>
                        <p className={typographyStyles.secondaryText}>
                            Cards maintain consistent styling across different backgrounds.
                        </p>
                    </div>
                </div>
            </SectionBackground>

            {/* Accent Background Example */}
            <SectionBackground variant="accent">
                <div className="text-center">
                    <h2 className={typographyStyles.sectionTitle}>Accent Background Section</h2>
                    <p className={typographyStyles.bodyText}>
                        This section uses the accent gradient background variant.
                    </p>
                    <div className={`${cardStyles.full} mt-6 max-w-md mx-auto`}>
                        <h3 className={typographyStyles.cardTitle}>Sample Card</h3>
                        <p className={typographyStyles.secondaryText}>
                            Perfect for highlighting important content sections.
                        </p>
                    </div>
                </div>
            </SectionBackground>

            {/* Custom Container Example */}
            <SectionBackground
                variant="primary"
                containerClassName="max-w-4xl"
                className="border-t border-slate-200 dark:border-gray-800"
            >
                <div className="text-center">
                    <h2 className={typographyStyles.sectionTitle}>Custom Container Width</h2>
                    <p className={typographyStyles.bodyText}>
                        This section demonstrates custom container width and additional styling.
                    </p>
                </div>
            </SectionBackground>

            {/* No Container Example */}
            <SectionBackground variant="contrast" noContainer>
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <h2 className={typographyStyles.sectionTitle}>No Container Wrapper</h2>
                    <p className={typographyStyles.bodyText}>
                        This section skips the default container for custom layout control.
                    </p>
                </div>
            </SectionBackground>
        </div>
    )
}

export default SectionBackgroundDemo