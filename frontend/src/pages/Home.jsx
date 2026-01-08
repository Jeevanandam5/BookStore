import React from 'react'
import HeroSection from '../components/HeroSection'
import LatestBook from '../components/LatestBook'

const Home = () => {
  return (
    <main className='min-h-screen '>
        <HeroSection/>
        <LatestBook/>
    </main>
  )
}

export default Home