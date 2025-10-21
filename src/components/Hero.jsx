import React from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/black-nike.jpg'

export default function Hero() {
  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.15)), url(${heroImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }

  return (
    <section className="hero" style={heroStyle}>
      <div className="hero-content">
        <div className="hero-text">
          <h1>JUST DO IT</h1>
          <p>Move the world forward with every step</p>
          <div className="hero-buttons">
            <Link to="/search" className="btn btn-primary">Shop Now</Link>
            <a href="#new" className="btn btn-secondary">Learn More</a>
          </div>
        </div>
      </div>
    </section>
  )
}
