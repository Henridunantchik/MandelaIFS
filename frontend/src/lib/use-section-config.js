import { getSectionConfig, typographyStyles, cardStyles } from './section-config'

/**
 * Custom hook for accessing section configuration and styling utilities
 * @param {string} sectionId - The section identifier
 * @returns {Object} Section configuration and styling utilities
 */
export const useSectionConfig = (sectionId) => {
  const config = getSectionConfig(sectionId)
  
  return {
    config,
    typography: typographyStyles,
    cards: cardStyles,
    /**
     * Get combined classes for section background
     * @param {string} additionalClasses - Additional CSS classes
     * @returns {string} Combined CSS classes
     */
    getSectionClasses: (additionalClasses = '') => {
      return `${config.paddingClass} ${additionalClasses}`.trim()
    },
    /**
     * Get combined classes for section container
     * @param {string} additionalClasses - Additional CSS classes
     * @returns {string} Combined CSS classes
     */
    getContainerClasses: (additionalClasses = '') => {
      return `${config.containerClass} ${additionalClasses}`.trim()
    },
    /**
     * Get combined classes for section title
     * @param {string} additionalClasses - Additional CSS classes
     * @returns {string} Combined CSS classes
     */
    getTitleClasses: (additionalClasses = '') => {
      return `${config.titleStyle} ${additionalClasses}`.trim()
    }
  }
}