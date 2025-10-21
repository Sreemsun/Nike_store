import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import '../styles/CategoryPage.css'

export default function Sale() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchSaleProducts()
  }, [])

  const fetchSaleProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/products')
      const data = await response.json()
      
      // Add discount to all products for sale page
      const saleProducts = data.map(product => ({
        ...product,
        originalPrice: product.price,
        price: product.price * 0.7, // 30% off
        discount: 30
      }))
      
      setProducts(saleProducts)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching products:', error)
      setLoading(false)
    }
  }

  const filteredProducts = products.filter(product => {
    if (filter === 'all') return true
    return product.category?.toLowerCase().includes(filter.toLowerCase())
  })

  return (
    <div className="category-page sale-page">
      <div className="category-hero sale-hero">
        <div className="category-hero-content">
          <div className="sale-badge">UP TO 30% OFF</div>
          <h1>Nike Sale</h1>
          <p>Score incredible deals on select styles</p>
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
                Running
              </button>
              <button 
                className={filter === 'basketball' ? 'active' : ''} 
                onClick={() => setFilter('basketball')}
              >
                Basketball
              </button>
              <button 
                className={filter === 'football' ? 'active' : ''} 
                onClick={() => setFilter('football')}
              >
                Football
              </button>
            </div>
          </div>

          <div className="filter-section">
            <h3>Discount</h3>
            <div className="filter-options">
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked />
                <span>30% Off</span>
              </label>
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>40% Off</span>
              </label>
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>50% Off & More</span>
              </label>
            </div>
          </div>

          <div className="filter-section">
            <h3>Gender</h3>
            <div className="filter-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Men</span>
              </label>
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Women</span>
              </label>
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Kids</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="category-content">
          <div className="category-header">
            <h2>Sale Products ({filteredProducts.length})</h2>
            <select className="sort-select">
              <option>Featured</option>
              <option>Biggest Discount</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          {loading ? (
            <div className="loading">Loading products...</div>
          ) : (
            <div className="products-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <div key={product._id} className="sale-product-card">
                    <div className="discount-badge">{product.discount}% OFF</div>
                    <ProductCard product={product} />
                  </div>
                ))
              ) : (
                <div className="no-products">
                  <p>No products found in this category</p>
                  <Link to="/" className="btn-primary">Back to Home</Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
