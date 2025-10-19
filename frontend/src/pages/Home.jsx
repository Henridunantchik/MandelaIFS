import Hero from '@/components/Hero'
import React from 'react'
import RecentBlog from '@/components/RecentBlog'
import HomeFirst from '@/components/HomeFirst'
import Cycle from '@/components/Cycle'
import MissionValeur from '@/components/MissionValeur'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const Home = () => {
  return (
    <div className='pt-0'>
      <Hero/>
      <HomeFirst/>
      <Cycle/>
      <MissionValeur/>
      <RecentBlog/>
    </div>
  )
}

export default Home
