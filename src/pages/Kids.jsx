import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import '../styles/CategoryPage.css'
import { kidsShoes } from '../data/kidsShoes';

export default function Kids() {
  const [filter, setFilter] = useState('all')
  
  // Use local data instead of fetching from backend
  const products = kidsShoes

  const filteredProducts = products.filter(product => {
    if (filter === 'all') return true
    return product.category?.toLowerCase().includes(filter.toLowerCase())
  })

  return (
    <div className="category-page">
      <div className="category-hero">
        <div className="category-hero-content">
          <h1>Kids' Shoes & Clothing</h1>
          <p>Gear up the next generation of athletes</p>
        </div>
      </div>

      <div className="category-container">
        {/* Filters */}
        <aside className="category-sidebar">
          <div className="filter-section">
            <h3>Categories</h3>
            <div className="filter-options">
              <button 
                className={filter === 'all' ? 'active' : ''} 
                onClick={() => setFilter('all')}
              >
                All Products ({products.length})
              </button>
              <button 
                className={filter === 'running' ? 'active' : ''} 
                onClick={() => setFilter('running')}
              >
                Running <a href="https://www.nike.com/in/w/kids-running-shoes-37v7jzy7okz5e1x" target="_blank" rel="noopener noreferrer" style={{marginLeft: 8, color: '#ff6b35'}}>Official</a>
              </button>
              <button 
                className={filter === 'basketball' ? 'active' : ''} 
                onClick={() => setFilter('basketball')}
              >
                Basketball <a href="https://www.nike.com/in/w/kids-basketball-shoes-3glsmzy7okz5e1x" target="_blank" rel="noopener noreferrer" style={{marginLeft: 8, color: '#ff6b35'}}>Official</a>
              </button>
              <button 
                className={filter === 'football' ? 'active' : ''} 
                onClick={() => setFilter('football')}
              >
                Football <a href="https://www.nike.com/in/w/kids-football-shoes-1gdj0zy7okz5e1x" target="_blank" rel="noopener noreferrer" style={{marginLeft: 8, color: '#ff6b35'}}>Official</a>
              </button>
            </div>
          </div>

          <div className="filter-section">
            <h3>Age Group</h3>
            <div className="filter-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Toddler (2-4 years)</span>
              </label>
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Little Kids (4-7 years)</span>
              </label>
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Big Kids (7-12 years)</span>
              </label>
            </div>
          </div>

          <div className="filter-section">
            <h3>Size</h3>
            <div className="size-grid">
              {['1Y', '2Y', '3Y', '4Y', '5Y', '6Y'].map(size => (
                <button key={size} className="size-btn">{size}</button>
              ))}
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="category-content">
          <div className="category-header">
            <h2>Kids' Products ({filteredProducts.length})</h2>
            <select className="sort-select">
              <option>Featured</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.id} {...product} />
              ))
            ) : (
              <div className="no-products">
                <p>No products found in this category</p>
                <Link to="/" className="btn-primary">Back to Home</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
