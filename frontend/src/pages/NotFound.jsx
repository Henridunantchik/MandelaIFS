import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Home, Mail } from 'lucide-react'

const NotFound = () => {
  // SEO and metadata handling for 404 page
  // Sets appropriate page title and meta description for better search engine indexing
  // and user experience when viewing the 404 page
  useEffect(() => {
    const originalTitle = document.title
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || ''
    
    // Set page title
    document.title = '404 - Page Not Found | Mandela International School'
    
    // Set or update meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.name = 'description'
      document.head.appendChild(metaDescription)
    }
    metaDescription.content = 'The requested page is not available. We\'re working to make it live soon. Please check back in 2 weeks or contact us at email@mandelaifs.com.'
    
    // Cleanup function to restore original title and description when component unmounts
    return () => {
      document.title = originalTitle
      if (originalDescription) {
        metaDescription.content = originalDescription
      } else {
        metaDescription.remove()
      }
    }
  }, [])
  return (
    <main 
      className="min-h-screen bg-background flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
      role="main"
      aria-labelledby="not-found-heading"
    >
      <section className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto text-center">
        {/* Icon with responsive sizing */}
        <div className="flex justify-center mb-8 sm:mb-10 lg:mb-12" aria-hidden="true">
          <AlertTriangle className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 text-muted-foreground/80 transition-colors" />
        </div>
        
        {/* Main heading with improved responsive typography */}
        <h1 
          id="not-found-heading"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 sm:mb-8 lg:mb-10 leading-tight tracking-tight"
        >
          Page Not Found
        </h1>
        
        {/* Main message with enhanced spacing and typography */}
        <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-10 lg:mb-12">
          <p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto px-4 sm:px-0"
            aria-describedby="not-found-heading"
          >
            This page is not initiated. We are working hard in the background to make it live. 
            Please check back in 2 weeks.
          </p>
          
          {/* Contact email with improved responsive design */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg lg:text-xl">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-muted-foreground" aria-hidden="true" />
              <span className="text-muted-foreground font-medium">Contact us:</span>
            </div>
            <a 
              href="mailto:email@mandelaifs.com" 
              className="text-primary hover:text-primary/80 underline underline-offset-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-sm px-1 py-0.5 font-medium"
              aria-label="Send email to email@mandelaifs.com"
            >
              email@mandelaifs.com
            </a>
          </div>
        </div>
        
        {/* Navigation button with enhanced styling */}
        <div className="flex justify-center">
          <Button 
            asChild 
            size="lg" 
            className="gap-2 sm:gap-3 text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-3 sm:py-4 h-auto font-semibold shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            <Link 
              to="/"
              aria-label="Return to homepage"
              className="flex items-center gap-2 sm:gap-3"
            >
              <Home className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              Return to Homepage
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}

export default NotFound