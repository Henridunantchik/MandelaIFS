/**
 * @typedef {Object} SectionConfig
 * @property {string} id - Unique identifier for the section
 * @property {'primary' | 'contrast' | 'accent' | 'hero'} backgroundVariant - Background variant to use
 * @property {string} paddingClass - CSS padding classes
 * @property {string} containerClass - CSS container classes
 * @property {string} titleStyle - CSS classes for section titles
 */

/**
 * Configuration for each home page section following the design pattern
 */
export const sectionConfigs = {
  hero: {
    id: 'hero',
    backgroundVariant: 'hero',
    paddingClass: 'pt-0',
    containerClass: 'px-0',
    titleStyle: 'text-4xl md:text-6xl font-bold text-white'
  },
  homeFirst: {
    id: 'homeFirst',
    backgroundVariant: 'primary',
    paddingClass: 'py-12 md:py-16',
    containerClass: 'max-w-4xl mx-auto px-4',
    titleStyle: 'text-3xl md:text-5xl font-bold'
  },
  cycle: {
    id: 'cycle',
    backgroundVariant: 'contrast',
    paddingClass: 'py-12 md:py-16',
    containerClass: 'max-w-7xl mx-auto px-4',
    titleStyle: 'text-3xl md:text-4xl font-bold'
  },
  missionValeur: {
    id: 'missionValeur',
    backgroundVariant: 'primary',
    paddingClass: 'py-12 md:py-16',
    containerClass: 'max-w-7xl mx-auto px-4',
    titleStyle: 'text-3xl md:text-4xl font-bold'
  },
  academicResults: {
    id: 'academicResults',
    backgroundVariant: 'accent',
    paddingClass: 'py-12 md:py-16',
    containerClass: 'max-w-7xl mx-auto px-4',
    titleStyle: 'text-3xl md:text-4xl font-bold'
  },
  temoignagesVideo: {
    id: 'temoignagesVideo',
    backgroundVariant: 'contrast',
    paddingClass: 'py-12 md:py-16',
    containerClass: 'max-w-7xl mx-auto px-4',
    titleStyle: 'text-3xl md:text-4xl font-bold'
  },
  schoolEvents: {
    id: 'schoolEvents',
    backgroundVariant: 'primary',
    paddingClass: 'py-12 md:py-16',
    containerClass: 'max-w-7xl mx-auto px-4',
    titleStyle: 'text-3xl md:text-4xl font-bold'
  },
  recentBlog: {
    id: 'recentBlog',
    backgroundVariant: 'contrast',
    paddingClass: 'py-12 md:py-16',
    containerClass: 'max-w-7xl mx-auto px-4',
    titleStyle: 'text-3xl md:text-4xl font-bold'
  }
}

/**
 * Get configuration for a specific section
 * @param {string} sectionId - The section identifier
 * @returns {SectionConfig} The section configuration
 */
export const getSectionConfig = (sectionId) => {
  return sectionConfigs[sectionId] || sectionConfigs.homeFirst // Default fallback
}

/**
 * Typography hierarchy classes for consistent styling
 */
export const typographyStyles = {
  sectionTitle: 'text-3xl md:text-4xl font-bold',
  subsectionTitle: 'text-2xl md:text-3xl font-semibold',
  cardTitle: 'text-lg md:text-xl font-semibold',
  bodyText: 'text-slate-700 dark:text-gray-300',
  secondaryText: 'text-slate-600 dark:text-gray-400'
}

/**
 * Card styling classes for consistent appearance
 */
export const cardStyles = {
  base: 'bg-white dark:bg-gray-900 rounded-xl border border-slate-200/70 dark:border-gray-800',
  shadow: 'shadow-sm hover:shadow-md transition-shadow',
  padding: 'p-6',
  full: 'bg-white dark:bg-gray-900 rounded-xl border border-slate-200/70 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow p-6'
}