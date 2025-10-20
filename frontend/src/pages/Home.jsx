import Hero from '@/components/Hero'
import React from 'react'
import RecentBlog from '@/components/RecentBlog'
import HomeFirst from '@/components/HomeFirst'
import Cycle from '@/components/Cycle'
import MissionValeur from '@/components/MissionValeur'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import TemoignagesVideo from '@/components/TemoignagesVideo'
import SchoolEvents from '@/components/SchoolEvents'
// import Partners from '@/components/Partners'

const Home = () => {
  return (
    <div className='pt-0'>
      <Hero/>
      <HomeFirst/>
      <Cycle/>
      <MissionValeur/>
      <TemoignagesVideo/>
      <SchoolEvents/>
      <RecentBlog/>
      {/* <Partners/> */}
    </div>
  )
}

export default Home
