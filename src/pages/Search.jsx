import React, { useState } from 'react'
import ProductCard from '../components/ProductCard'
import airmaxpulse from '../assets/airmaxpulse.jpg'
import airmax270 from '../assets/airmax270.jpg'
import nikeInfinity from '../assets/nike-infinity.jpg'
import vaporfly from '../assets/vaporfly.jpg'

const allProducts = [
  { id: 1, category: 'Just In', name: 'Nike Air Max Pulse', desc: "Men's Shoes", price: '₹13,995', image: airmaxpulse },
  { id: 2, category: 'Just In', name: 'Nike Air Max 270', desc: "Women's Shoes", price: '₹12,795', image: airmax270 },
  { id: 3, category: 'Just In', name: 'Nike React Infinity', desc: 'Running Shoes', price: '₹14,995', image: nikeInfinity },
  { id: 4, category: 'Just In', name: 'Nike ZoomX Vaporfly', desc: "Men's Running Shoes", price: '₹18,995', image: vaporfly },
]

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredProducts, setFilteredProducts] = useState(allProducts)

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase()
    setSearchQuery(query)
    
    const filtered = allProducts.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.desc.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    )
    setFilteredProducts(filtered)
  }

  return (
    <div className="page-container">
      <div className="container">
        <div className="search-page">
          <h1>Search Products</h1>
          
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={handleSearch}
              className="search-input-large"
            />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="search-icon">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>

          {searchQuery && (
            <p className="search-results-count">
              {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
          )}

          <div className="product-grid" style={{ marginTop: '40px' }}>
            {filteredProducts.map(p => <ProductCard key={p.id} {...p} />)}
          </div>

          {filteredProducts.length === 0 && searchQuery && (
            <div className="empty-state">
              <h2>No products found</h2>
              <p>Try searching with different keywords</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
