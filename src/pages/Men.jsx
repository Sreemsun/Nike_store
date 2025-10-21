
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { menShoes } from '../data/menShoes'
import '../styles/CategoryPage.css'

export default function Men() {
  const [filter, setFilter] = useState('all')

  const filteredProducts = menShoes.filter(product => {
    if (filter === 'all') return true
    return product.category?.toLowerCase().includes(filter.toLowerCase())
  })

  return (
    <div className="category-page">
      <div className="category-hero">
        <div className="category-hero-content">
          <h1>Men's Shoes & Clothing</h1>
          <p>Nike shoes and apparel built for the modern athlete</p>
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
                All Products ({menShoes.length})
              </button>
              <button 
                className={filter === 'running' ? 'active' : ''} 
                onClick={() => setFilter('running')}
              >
                Running <a href="https://www.nike.com/in/w/running-shoes-37v7jzy7ok" target="_blank" rel="noopener noreferrer" style={{marginLeft: 8, color: '#ff6b35'}}>Official</a>
              </button>
              <button 
                className={filter === 'basketball' ? 'active' : ''} 
                onClick={() => setFilter('basketball')}
              >
                Basketball <a href="https://www.nike.com/in/w/basketball-shoes-3glsmzy7ok" target="_blank" rel="noopener noreferrer" style={{marginLeft: 8, color: '#ff6b35'}}>Official</a>
              </button>
              <button 
                className={filter === 'football' ? 'active' : ''} 
                onClick={() => setFilter('football')}
              >
                Football <a href="https://www.nike.com/in/w/football-shoes-1gdj0zy7ok" target="_blank" rel="noopener noreferrer" style={{marginLeft: 8, color: '#ff6b35'}}>Official</a>
              </button>
            </div>
          </div>

          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="filter-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Under ₹5,000</span>
              </label>
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>₹5,000 - ₹10,000</span>
              </label>
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>₹10,000 - ₹15,000</span>
              </label>
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Over ₹15,000</span>
              </label>
            </div>
          </div>

          <div className="filter-section">
            <h3>Size</h3>
            <div className="size-grid">
              {['7', '8', '9', '10', '11', '12'].map(size => (
                <button key={size} className="size-btn">{size}</button>
              ))}
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="category-content">
          <div className="category-header">
            <h2>Men's Products ({filteredProducts.length})</h2>
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
