import React from 'react'
import heroImg from "../assets/hero.jpg"
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='px-0'>
      <div className='relative w-full h-screen md:h-[100vh] min-h-[600px] my-0'>
        {/* background image */}
        <div className='absolute inset-0'>
          <img src={heroImg} alt="" className='w-full h-full object-cover object-top' />
          <div className='absolute inset-0 bg-black/30'></div>
        </div>

        {/* Floating Info Box */}
        <div className="absolute bottom-10 right-6 md:bottom-14 md:right-12 p-4 bg-white/95 dark:bg-gray-900/95 rounded-lg shadow-lg flex items-center gap-4 z-10">
          <img
            src="/logo.png"
            alt="New Office Location"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="text-left">
            <p className="font-semibold text-gray-900 dark:text-white">Localisation de l’école</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug">
              Busabala Road, 2 Masajja, Avenue<br /> 
              Lupalanga, Kampala, Ouganda
            </p>
          </div>
        </div>

         {/* <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-2xl mx-auto text-center px-4 text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Qualité, Respect et Différence.</h1>

            <p className="text-lg md:text-xl mb-6 font-semibold">
              Mandella International French School : une école pour bâtir l’avenir, ensemble.
            </p>
            <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
              <Link to={"/"}>
                <Button className="inline-flex items-center justify-center h-12 md:h-14 px-8 md:px-10 rounded-full bg-amber-400 text-slate-900 font-semibold tracking-wide shadow-lg hover:shadow-xl hover:bg-amber-300 transition-all focus:outline-none focus:ring-2 focus:ring-amber-300">
                  COMMENT S'INSCRIRE ?
                </Button>
              </Link>
              <Link to={"/"}>
                <Button variant="outline" className="inline-flex items-center justify-center h-12 md:h-14 px-8 md:px-10 rounded-full border border-white/70 text-white font-semibold tracking-wide backdrop-blur-sm bg-white/10 hover:bg-white/20 hover:border-white transition-all focus:outline-none focus:ring-2 focus:ring-white/50">
                  VISITE VIRTUELLE
                </Button>
              </Link>
            </div>
          </div>
        </div> */}




      </div>
    </div>
  )
}

export default Hero
