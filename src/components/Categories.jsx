import React from 'react'
import { Link } from 'react-router-dom'
import runningImg from '../assets/running.jpg'
import basketballImg from '../assets/basketball.jpg'
import footballImg from '../assets/nike-football.jpg'

const categories = [
  { 
    id: 1, 
    name: 'Running', 
    image: runningImg,
    description: 'Go the distance with our performance running shoes',
    link: 'https://www.nike.com/in/running'
  },
  { 
    id: 2, 
    name: 'Basketball', 
    image: basketballImg,
    description: 'Elevate your game with premium basketball footwear',
    link: 'https://www.nike.com/in/basketball'
  },
  { 
    id: 3, 
    name: 'Football', 
    image: footballImg,
    description: 'Own the field with cutting-edge football boots',
    link: 'https://www.nike.com/in/football'
  }
]

export default function Categories() {
  return (
    <section className="categories container">
      <h2>Shop by Category</h2>
      <div className="category-grid">
        {categories.map(c => (
          <Link to={c.link} className="category-card" key={c.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="category-image">
              {c.image ? (
                <img src={c.image} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
              ) : (
                <div className="placeholder-image"></div>
              )}
            </div>
            <h3>{c.name}</h3>
            {c.description && <p className="category-description">{c.description}</p>}
          </Link>
        ))}
      </div>
    </section>
  )
}
