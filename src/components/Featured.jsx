import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { menShoes } from '../data/menShoes'
import { womenShoes } from '../data/womenShoes'

// Use real products from our data
const fallbackProducts = [
  menShoes[0],  // Nike Air Max Alpha
  womenShoes[0], // First women's shoe
  menShoes[1],  // Nike Court Vision
  menShoes[2]   // Nike Air Monarch
].filter(Boolean)

export default function Featured() {
  const [products, setProducts] = useState(fallbackProducts)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/products')
      if (response.ok) {
        const data = await response.json()
        if (data && data.length > 0) {
          // Take first 4 products from database
          setProducts(data.slice(0, 4))
        }
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      // Keep using fallback products
    }
  }

  return (
    <section className="featured container" id="new">
      <h2>Featured Products</h2>
      <div className="product-grid">
        {products.map(p => <ProductCard key={p._id || p.id} {...p} />)}
      </div>
    </section>
  )
}
