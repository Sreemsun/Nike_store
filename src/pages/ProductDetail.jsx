import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import '../styles/ProductDetail.css'

// Import local shoe data
import { menShoes } from '../data/menShoes'
import { womenShoes } from '../data/womenShoes'
import { kidsShoes } from '../data/kidsShoes'

// Import product images
import airmaxpulse from '../assets/airmaxpulse.jpg'
import airmax270 from '../assets/airmax270.jpg'
import nikeInfinity from '../assets/nike-infinity.jpg'
import vaporfly from '../assets/vaporfly.jpg'
import basketball from '../assets/basketball.jpg'
import nikeFootball from '../assets/nike-football.jpg'

// Combine all local products
const allLocalProducts = [...menShoes, ...womenShoes, ...kidsShoes]

// Image mapping for database URLs
const IMAGE_MAP = {
  '/assets/airmaxpulse.jpg': airmaxpulse,
  '/assets/airmax270.jpg': airmax270,
  '/assets/nike-infinity.jpg': nikeInfinity,
  '/assets/vaporfly.jpg': vaporfly,
  '/assets/basketball.jpg': basketball,
  '/assets/nike-football.jpg': nikeFootball,
}

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { user } = useAuth();
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [currentImage, setCurrentImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showEnlargedImage, setShowEnlargedImage] = useState(false)

  const sizes = ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12']

  useEffect(() => {
    fetchProductDetails()
    checkWishlistStatus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const fetchProductDetails = async () => {
    try {
      console.log('=== ProductDetail Debug ===')
      console.log('URL ID param:', id)
      console.log('All local products:', allLocalProducts)
      console.log('Looking for product with ID:', id, 'Type:', typeof id)
      
      // First, try to find the product in local data
      const localProduct = allLocalProducts.find(p => {
        console.log(`Comparing: "${p.id}" (${typeof p.id}) === "${id}" (${typeof id})`, p.id === id)
        return p.id === id || p._id === id || String(p.id) === String(id)
      })
      
      if (localProduct) {
        console.log('✓ Product found in local data:', localProduct)
        setProduct(localProduct)
        setLoading(false)
        return
      }

      console.log('✗ Product not found in local data, trying backend...')
      
      // If not found locally, try fetching from backend
      const response = await fetch(`http://localhost:8000/products/${id}`)
      if (!response.ok) {
        console.error('Failed to fetch product from backend:', response.status)
        setLoading(false)
        return
      }
      const data = await response.json()
      console.log('Product data received from backend:', data)
      setProduct(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching product:', error)
      setLoading(false)
    }
  }

  const checkWishlistStatus = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
    setIsWishlisted(wishlist.includes(id))
  }

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
    
    if (isWishlisted) {
      const updated = wishlist.filter(item => item !== id)
      localStorage.setItem('wishlist', JSON.stringify(updated))
      setIsWishlisted(false)
      alert('Removed from wishlist!')
    } else {
      wishlist.push(id)
      localStorage.setItem('wishlist', JSON.stringify(wishlist))
      setIsWishlisted(true)
      alert('Added to wishlist!')
    }
  }

  const handleAddToCart = () => {
    if (!user) {
      alert('Please log in to add items to your cart.');
      navigate('/login');
      return;
    }
    if (!selectedSize) {
      alert('Please select a size')
      return
    }

    const cartItem = {
      productId: id,
      product: product,
      size: selectedSize,
      quantity: quantity,
      addedAt: new Date().toISOString()
    }

    addToCart(cartItem)
    alert('Added to cart! 🛒')
  }

  const buyNow = () => {
    if (!user) {
      alert('Please log in to buy items.');
      navigate('/login');
      return;
    }
    if (!selectedSize) {
      alert('Please select a size')
      return
    }

    // Add to cart first
    const cartItem = {
      productId: id,
      product: product,
      size: selectedSize,
      quantity: quantity,
      addedAt: new Date().toISOString()
    }
    addToCart(cartItem)

    // Navigate to checkout
    navigate('/checkout')
  }

  // Calculate total price based on quantity
  const calculateTotalPrice = () => {
    if (!product || !product.price) return 0
    const numericPrice = getNumericPrice(product.price)
    return numericPrice * quantity
  }

  // Extract numeric price from string or number
  const getNumericPrice = (price) => {
    if (typeof price === 'number') return price
    if (typeof price === 'string') {
      // Remove currency symbols and commas, then parse
      const cleaned = price.replace(/[₹,\s]/g, '')
      return parseFloat(cleaned) || 0
    }
    return 0
  }

  // Format price with Indian currency
  const formatPrice = (price) => {
    const numericPrice = typeof price === 'number' ? price : getNumericPrice(price)
    return `₹${numericPrice.toLocaleString('en-IN')}`
  }

  const productImages = product?.image_url ? [
    product.image_url,
    product.image_url,
    product.image_url,
    product.image_url
  ] : (product?.image ? [
    product.image,
    product.image,
    product.image,
    product.image
  ] : [])

  // Get proper image source - handle both relative and absolute URLs
  const getImageSrc = (url) => {
    if (!url) return null
    
    // Check if it's in our image map
    if (IMAGE_MAP[url]) {
      return IMAGE_MAP[url]
    }
    
    // If it starts with http/https, use it directly
    if (url.startsWith('http')) {
      return url
    }
    
    // Otherwise return as-is (might be a local import)
    return url
  }

  const displayImages = productImages.length > 0 
    ? productImages.map(img => getImageSrc(img)).filter(Boolean)
    : []

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="loading">Loading product details...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="error">Product not found</div>
      </div>
    )
  }

  return (
    <div className="product-detail-page">
      {/* Enlarged Image Modal */}
      {showEnlargedImage && displayImages.length > 0 && (
        <div className="image-modal" onClick={() => setShowEnlargedImage(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowEnlargedImage(false)}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
            <img src={displayImages[currentImage]} alt={product.name} />
            <div className="modal-thumbnails">
              {displayImages.map((img, index) => (
                <div 
                  key={index}
                  className={`modal-thumb ${currentImage === index ? 'active' : ''}`}
                  onClick={() => setCurrentImage(index)}
                >
                  <img src={img} alt={`View ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="product-detail-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/men">Men</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="product-detail-grid">
          {/* Left: Images */}
          <div className="product-images">
            <div className="main-image" onClick={() => setShowEnlargedImage(true)}>
              {displayImages.length > 0 ? (
                <img src={displayImages[currentImage]} alt={product.name} />
              ) : (
                <div className="no-image">No Image Available</div>
              )}
              <div className="zoom-hint">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
                  <path d="M11 8v6M8 11h6" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>Click to enlarge</span>
              </div>
              <button 
                className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleWishlist()
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
            
            {displayImages.length > 0 && (
              <div className="image-thumbnails">
                {displayImages.map((img, index) => (
                  <div 
                    key={index}
                    className={`thumbnail ${currentImage === index ? 'active' : ''}`}
                    onClick={() => setCurrentImage(index)}
                  >
                    <img src={img} alt={`View ${index + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="product-info">
            <div className="product-badge">Just In</div>
            
            <h1 className="product-title">{product.name}</h1>
            
            <p className="product-category">{product.category}'s Shoes</p>

            <div className="product-price">
              <div className="price-block">
                <span className="price-label">Unit Price:</span>
                <span className="price">{formatPrice(product.price || 0)}</span>
              </div>
              {quantity > 1 && (
                <div className="price-block total-price-block">
                  <span className="price-label">Total Price ({quantity} items):</span>
                  <span className="price total-price">{formatPrice(calculateTotalPrice())}</span>
                </div>
              )}
              {product.originalPrice && (
                <span className="original-price">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            <p className="product-description">
              {product.description || 
                'Premium Nike footwear designed for performance and style. Featuring innovative technology and superior comfort for all-day wear.'}
            </p>

            {/* Size Selection */}
            <div className="size-selection">
              <div className="size-header">
                <h3>Select Size</h3>
                <button className="size-guide">Size Guide</button>
              </div>
              
              <div className="size-grid">
                {sizes.map(size => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    UK {size}
                  </button>
                ))}
              </div>

              {!selectedSize && (
                <p className="size-hint">Please select a size to continue</p>
              )}
            </div>

            {/* Quantity */}
            <div className="quantity-selection">
              <h3>Quantity</h3>
              <div className="quantity-controls">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  disabled={quantity >= 10}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="btn-buy-now" onClick={buyNow}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 2L7 20L17 20L15 2" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="9" cy="21" r="1" fill="currentColor"/>
                  <circle cx="15" cy="21" r="1" fill="currentColor"/>
                </svg>
                Buy Now
              </button>
              
              <button className="btn-add-cart" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>

            {/* Product Features */}
            <div className="product-features">
              <h3>Product Details</h3>
              <ul>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Premium quality materials
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Comfortable all-day wear
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Free shipping on orders over ₹14,000
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  30-day return policy
                </li>
              </ul>
            </div>

            {/* Delivery Info */}
            <div className="delivery-info">
              <h3>Delivery & Returns</h3>
              <div className="info-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="1" y="3" width="15" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 8h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="5.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="18.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <div>
                  <strong>Free Delivery</strong>
                  <p>Applies to orders of ₹14,000 or more</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="reviews-section">
          <h2>Reviews (4.8 ⭐)</h2>
          <div className="reviews-placeholder">
            <p>Customer reviews will appear here</p>
          </div>
        </div>
      </div>
    </div>
  )
}
