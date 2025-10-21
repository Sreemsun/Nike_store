import React from 'react'
import NavBar from '../components/NavBar'
import Hero from '../components/Hero'
import Featured from '../components/Featured'
import Categories from '../components/Categories'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <Featured />
      <Categories />
    </>
  )
}
