import React from 'react'
import HeroSection from './HeroSection'
import HomeSelection from './HomeSelection'
import AboutUsComponent from './AboutUsComponent'
import Testimonials from './Testimonials'

const Home = () => {
  return (
    <>
      <HeroSection />
      <HomeSelection showCase="top" />
      <AboutUsComponent />
      <HomeSelection showCase="seasonal" />
      <Testimonials />
    </>
  )
}

export default Home