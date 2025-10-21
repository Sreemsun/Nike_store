import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import '../styles/Cart.css'

export default function Cart() {
  const navigate = useNavigate()
  
  // Safe cart access with fallback
  let cart = []
  let removeFromCart = () => {}
  let updateQuantity = () => {}
  let clearCart = () => {}
  let getCartTotal = () => 0
  
  try {
    const cartContext = useCart()
    cart = cartContext.cart || []
    removeFromCart = cartContext.removeFromCart
    updateQuantity = cartContext.updateQuantity
    clearCart = cartContext.clearCart
    getCartTotal = cartContext.getCartTotal
  } catch (error) {
    console.error('Cart context error:', error)
  }

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return `₹${price.toLocaleString('en-IN')}`
    }
    return price
  }

  const subtotal = getCartTotal()
  const tax = subtotal * 0.18 // 18% GST
  const shipping = subtotal > 0 ? (subtotal > 5000 ? 0 : 200) : 0
  const total = subtotal + tax + shipping

  if (cart.length === 0) {
    return (
      <div className="page-container">
        <div className="container">
          <div className="cart-page">
            <h1>Shopping Cart</h1>
            <div className="empty-state">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="9" cy="21" r="1" fill="currentColor"/>
                <circle cx="20" cy="21" r="1" fill="currentColor"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <h2>Your cart is empty</h2>
              <p>Add some items to get started</p>
              <Link to="/" className="btn btn-primary" style={{ marginTop: '24px' }}>Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="container">
        <div className="cart-page">
          <div className="cart-header">
            <h1>Shopping Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})</h1>
            <button onClick={clearCart} className="btn-clear-cart">Clear Cart</button>
          </div>

          <div className="cart-grid">
            {/* Cart Items */}
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.product.image} alt={item.product.name} />
                  </div>
                  
                  <div className="cart-item-details">
                    <Link to={`/product/${item.productId}`} className="cart-item-name">
                      {item.product.name}
                    </Link>
                    <p className="cart-item-category">{item.product.category}'s Shoes</p>
                    <p className="cart-item-size">Size: UK {item.size}</p>
                    
                    <div className="cart-item-actions">
                      <div className="quantity-controls">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          +
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)} 
                        className="btn-remove"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" 
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className="cart-item-price">
                    <p className="item-price">{formatPrice(item.product.price)}</p>
                    {item.quantity > 1 && (
                      <p className="item-total">
                        Total: {formatPrice(item.product.price * item.quantity)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="cart-summary">
              <h2>Order Summary</h2>
              
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              
              <div className="summary-row">
                <span>Tax (18% GST):</span>
                <span>{formatPrice(tax)}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping:</span>
                <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
              </div>
              
              {subtotal <= 5000 && subtotal > 0 && (
                <p className="free-shipping-info">
                  Add {formatPrice(5000 - subtotal)} more for FREE shipping!
                </p>
              )}
              
              <hr />
              
              <div className="summary-row summary-total">
                <span>Total:</span>
                <span>{formatPrice(total)}</span>
              </div>
              
              <button 
                onClick={() => navigate('/checkout')} 
                className="btn-checkout"
              >
                Proceed to Checkout
              </button>
              
              <Link to="/" className="btn-continue-shopping">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
