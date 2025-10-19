import React from 'react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

const HomeFirst = () => {
  return (
    <>
      {/* Marketing section moved below hero */}
      <section className='py-12 md:py-16 bg-white dark:bg-gray-900'>

          {/* <div className='max-w-6xl mx-auto px-4'>
          <div className='h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700 mb-10'></div>
        </div> */}
      
        <div className='max-w-4xl mx-auto px-4 text-center'>
          <h2 className='text-3xl md:text-5xl font-bold mb-4'>Qualité • Respect • Différence</h2>
          <p className='text-base md:text-lg text-muted-foreground mb-6'>
            Mandella International French School : une école pour bâtir l’avenir, ensemble.
          </p>
                    <div className='h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700 mb-10'></div>

          <div className='flex flex-wrap gap-4 md:gap-6 justify-center'>
            <Link to={'/'}>
              <Button className='inline-flex items-center justify-center h-12 md:h-14 px-8 md:px-10 rounded-full bg-amber-500 text-white font-semibold tracking-wide shadow hover:shadow-md hover:bg-amber-400 transition-all'>
                COMMENT S'INSCRIRE ?
              </Button>
            </Link>
            <Link to={'/'}>
              <Button variant='outline' className='inline-flex items-center justify-center h-12 md:h-14 px-8 md:px-10 rounded-full border-2 border-amber-500 text-amber-700 hover:bg-amber-50 transition-all'>
                VISITE VIRTUELLE
              </Button>
            </Link>
          </div>
        </div>


        
      </section>
    </>
  )
}

export default HomeFirst
