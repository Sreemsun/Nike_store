import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import '../styles/CategoryPage.css'
import { womenShoes } from '../data/womenShoes';

export default function Women() {
  const [filter, setFilter] = useState('all')
  
  // Use local data instead of fetching from backend
  const products = womenShoes

  const filteredProducts = products.filter(product => {
    if (filter === 'all') return true
    return product.category?.toLowerCase().includes(filter.toLowerCase())
  })

  return (
    <div className="category-page">
      <div className="category-hero">
        <div className="category-hero-content">
          <h1>Women's Shoes & Clothing</h1>
          <p>Styles made for your moves, colors that match your vibe</p>
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
                Running <a href="https://www.nike.com/in/w/womens-running-shoes-37v7jznik1zy7ok" target="_blank" rel="noopener noreferrer" style={{marginLeft: 8, color: '#ff6b35'}}>Official</a>
              </button>
              <button 
                className={filter === 'basketball' ? 'active' : ''} 
                onClick={() => setFilter('basketball')}
              >
                Basketball <a href="https://www.nike.com/in/w/womens-basketball-shoes-3glsmznik1zy7ok" target="_blank" rel="noopener noreferrer" style={{marginLeft: 8, color: '#ff6b35'}}>Official</a>
              </button>
              <button 
                className={filter === 'football' ? 'active' : ''} 
                onClick={() => setFilter('football')}
              >
                Football <a href="https://www.nike.com/in/w/womens-football-shoes-1gdj0znik1zy7ok" target="_blank" rel="noopener noreferrer" style={{marginLeft: 8, color: '#ff6b35'}}>Official</a>
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
              {['5', '6', '7', '8', '9', '10'].map(size => (
                <button key={size} className="size-btn">{size}</button>
              ))}
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="category-content">
          <div className="category-header">
            <h2>Women's Products ({filteredProducts.length})</h2>
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
