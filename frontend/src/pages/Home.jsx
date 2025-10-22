import Hero from '@/components/Hero'
import React from 'react'
import RecentBlog from '@/components/RecentBlog'
import HomeFirst from '@/components/HomeFirst'
import Cycle from '@/components/Cycle'
import MissionValeur from '@/components/MissionValeur'
// import SuccessSection from '@/components/SuccessSection'
import AcademicResults from '@/components/AcademicResults'
// import { Link } from 'react-router-dom'
// import { Button } from '@/components/ui/button'
import TemoignagesVideo from '@/components/TemoignagesVideo'
import SchoolEvents from '@/components/SchoolEvents'
// import Partners from '@/components/Partners'
import { SectionBackground } from '@/components/ui/section-background'

const Home = () => {
  // Configuration for SuccessSection component (commented out)
  // const handleMetricsReadMore = () => {
  //   // Navigate to metrics or about page
  //   console.log('Navigate to metrics details');
  // };

  // const handleBenefitsReadMore = () => {
  //   // Navigate to services or benefits page
  //   console.log('Navigate to benefits details');
  // };

  return (
    <div className='pt-0'>
      {/* Hero - maintains its own styling */}
      <Hero />

      {/* HomeFirst - primary background */}
      <SectionBackground variant="primary" containerClassName="max-w-4xl mx-auto px-4">
        <HomeFirst />
      </SectionBackground>

      {/* Cycle - contrast background */}
      <SectionBackground variant="contrast">
        <Cycle />
      </SectionBackground>

      {/* MissionValeur - primary background */}
      <SectionBackground variant="primary">
        <MissionValeur />
      </SectionBackground>

      {/* <SuccessSection
        metricsTitle="Successful & Sustainable Growth"
        metricsDescription="Denounce with righteous indignation and dislike men who are beguiled and demoralized by the charms of pleasure."
        benefitsTitle="Showing You"
        benefitsSubtitle="The Way of Success"
        benefitsDescription="Denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure moment so blinded by desire that they cannot foresee the pain and trouble."
        benefitsBadgeNumber="01"
        onMetricsReadMore={handleMetricsReadMore}
        onBenefitsReadMore={handleBenefitsReadMore}
      /> */}

      {/* AcademicResults - accent background */}
      <SectionBackground variant="accent">
        <AcademicResults />
      </SectionBackground>

      {/* TemoignagesVideo - contrast background */}
      <SectionBackground variant="contrast">
        <TemoignagesVideo />
      </SectionBackground>

      {/* SchoolEvents - primary background */}
      <SectionBackground variant="primary">
        <SchoolEvents />
      </SectionBackground>

      {/* RecentBlog - contrast background */}
      <SectionBackground variant="contrast" noContainer={true}>
        <RecentBlog />
      </SectionBackground>

      {/* <Partners/> */}
    </div>
  )
}

export default Home
