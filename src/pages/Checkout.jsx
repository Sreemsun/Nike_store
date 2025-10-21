import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Checkout.css'

export default function Checkout() {
  const navigate = useNavigate()
  const [cart, setCart] = useState([])
  const [step, setStep] = useState(1) // 1: Address, 2: Payment, 3: Review
  
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India'
  })

  const [paymentInfo, setPaymentInfo] = useState({
    method: 'card', // card, upi, cod
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upiId: ''
  })

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(savedCart)

    // Load user info if logged in
    const email = localStorage.getItem('user_email')
    if (email) {
      setShippingInfo(prev => ({
        ...prev,
        email: email,
        firstName: localStorage.getItem('user_first_name') || '',
        lastName: localStorage.getItem('user_last_name') || '',
        phone: localStorage.getItem('user_phone') || '',
        address: localStorage.getItem('user_address') || '',
        country: localStorage.getItem('user_country') || 'India'
      }))
    }
  }, [])

  const handleShippingChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    })
  }

  const handlePaymentChange = (e) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value
    })
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.product.price * item.quantity)
    }, 0)
  }

  const calculateTax = () => {
    return calculateTotal() * 0.18 // 18% GST
  }

  const calculateShipping = () => {
    return calculateTotal() > 14000 ? 0 : 500
  }

  const calculateGrandTotal = () => {
    return calculateTotal() + calculateTax() + calculateShipping()
  }

  const validateShipping = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'pincode']
    for (let field of required) {
      if (!shippingInfo[field]) {
        alert(`Please fill in ${field}`)
        return false
      }
    }
    return true
  }

  const validatePayment = () => {
    if (paymentInfo.method === 'card') {
      if (!paymentInfo.cardNumber || !paymentInfo.cardName || !paymentInfo.expiryDate || !paymentInfo.cvv) {
        alert('Please fill in all card details')
        return false
      }
    } else if (paymentInfo.method === 'upi') {
      if (!paymentInfo.upiId) {
        alert('Please enter UPI ID')
        return false
      }
    }
    return true
  }

  const handleNext = () => {
    if (step === 1 && validateShipping()) {
      setStep(2)
    } else if (step === 2 && validatePayment()) {
      setStep(3)
    }
  }

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem('token')
      
      // Prepare order data according to backend schema
      const orderData = {
        items: cart.map(item => ({
          product_id: item.productId,
          name: item.product.name,
          quantity: item.quantity,
          size: item.size || 'N/A',
          price: parseFloat(item.product.price.replace(/[^0-9.-]+/g, ''))
        })),
        shipping_address: {
          firstName: shippingInfo.firstName,
          lastName: shippingInfo.lastName,
          email: shippingInfo.email,
          phone: shippingInfo.phone,
          address: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          pincode: shippingInfo.pincode,
          country: shippingInfo.country
        },
        payment_method: paymentInfo.method
      }

      // Send to backend if user is logged in
      if (token) {
        const response = await fetch('http://localhost:8000/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(orderData)
        })

        if (!response.ok) {
          throw new Error('Failed to place order')
        }

        const result = await response.json()
        console.log('Order created:', result)
      } else {
        // Fallback: save to localStorage if not logged in
        const orders = JSON.parse(localStorage.getItem('orders') || '[]')
        orders.push({
          ...orderData,
          orderId: `ORD${Date.now()}`,
          total: calculateGrandTotal(),
          createdAt: new Date().toISOString(),
          status: 'pending'
        })
        localStorage.setItem('orders', JSON.stringify(orders))
      }

      // Clear cart
      localStorage.setItem('cart', JSON.stringify([]))

      alert('Order placed successfully! 🎉')
      navigate('/profile')
    } catch (error) {
      console.error('Error placing order:', error)
      alert('Failed to place order. Please try again.')
    }
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <button onClick={() => navigate('/')}>Continue Shopping</button>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* Progress Steps */}
        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <span>Shipping</span>
          </div>
          <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <span>Payment</span>
          </div>
          <div className={`step-line ${step >= 3 ? 'active' : ''}`}></div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <span>Review</span>
          </div>
        </div>

        <div className="checkout-content">
          {/* Left: Form */}
          <div className="checkout-form">
            {/* Step 1: Shipping Address */}
            {step === 1 && (
              <div className="form-section">
                <h2>Shipping Address</h2>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={shippingInfo.firstName}
                      onChange={handleShippingChange}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={shippingInfo.lastName}
                      onChange={handleShippingChange}
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleShippingChange}
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleShippingChange}
                      placeholder="+91 1234567890"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Address *</label>
                  <textarea
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleShippingChange}
                    placeholder="House number, street name"
                    rows="3"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      placeholder="City"
                    />
                  </div>
                  <div className="form-group">
                    <label>State *</label>
                    <input
                      type="text"
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleShippingChange}
                      placeholder="State"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>PIN Code *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={shippingInfo.pincode}
                      onChange={handleShippingChange}
                      placeholder="123456"
                    />
                  </div>
                  <div className="form-group">
                    <label>Country *</label>
                    <select name="country" value={shippingInfo.country} onChange={handleShippingChange}>
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>
                </div>

                <button className="btn-next" onClick={handleNext}>
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="form-section">
                <h2>Payment Method</h2>

                <div className="payment-methods">
                  <label className={`payment-option ${paymentInfo.method === 'card' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="method"
                      value="card"
                      checked={paymentInfo.method === 'card'}
                      onChange={handlePaymentChange}
                    />
                    <div className="option-content">
                      <span>💳</span>
                      <span>Credit/Debit Card</span>
                    </div>
                  </label>

                  <label className={`payment-option ${paymentInfo.method === 'upi' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="method"
                      value="upi"
                      checked={paymentInfo.method === 'upi'}
                      onChange={handlePaymentChange}
                    />
                    <div className="option-content">
                      <span>📱</span>
                      <span>UPI</span>
                    </div>
                  </label>

                  <label className={`payment-option ${paymentInfo.method === 'cod' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="method"
                      value="cod"
                      checked={paymentInfo.method === 'cod'}
                      onChange={handlePaymentChange}
                    />
                    <div className="option-content">
                      <span>💵</span>
                      <span>Cash on Delivery</span>
                    </div>
                  </label>
                </div>

                {paymentInfo.method === 'card' && (
                  <div className="card-form">
                    <div className="form-group">
                      <label>Card Number *</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={handlePaymentChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                    </div>

                    <div className="form-group">
                      <label>Cardholder Name *</label>
                      <input
                        type="text"
                        name="cardName"
                        value={paymentInfo.cardName}
                        onChange={handlePaymentChange}
                        placeholder="Name on card"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Expiry Date *</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={paymentInfo.expiryDate}
                          onChange={handlePaymentChange}
                          placeholder="MM/YY"
                          maxLength="5"
                        />
                      </div>
                      <div className="form-group">
                        <label>CVV *</label>
                        <input
                          type="text"
                          name="cvv"
                          value={paymentInfo.cvv}
                          onChange={handlePaymentChange}
                          placeholder="123"
                          maxLength="3"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentInfo.method === 'upi' && (
                  <div className="upi-form">
                    <div className="form-group">
                      <label>UPI ID *</label>
                      <input
                        type="text"
                        name="upiId"
                        value={paymentInfo.upiId}
                        onChange={handlePaymentChange}
                        placeholder="yourname@upi"
                      />
                    </div>
                  </div>
                )}

                {paymentInfo.method === 'cod' && (
                  <div className="cod-info">
                    <p>✓ Pay with cash when your order arrives</p>
                    <p>✓ No need to pay online</p>
                  </div>
                )}

                <div className="form-actions">
                  <button className="btn-back" onClick={() => setStep(1)}>
                    Back
                  </button>
                  <button className="btn-next" onClick={handleNext}>
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review Order */}
            {step === 3 && (
              <div className="form-section">
                <h2>Review Your Order</h2>

                <div className="review-section">
                  <h3>Shipping Address</h3>
                  <div className="review-info">
                    <p><strong>{shippingInfo.firstName} {shippingInfo.lastName}</strong></p>
                    <p>{shippingInfo.address}</p>
                    <p>{shippingInfo.city}, {shippingInfo.state} - {shippingInfo.pincode}</p>
                    <p>{shippingInfo.country}</p>
                    <p>📧 {shippingInfo.email}</p>
                    <p>📱 {shippingInfo.phone}</p>
                    <button className="btn-edit" onClick={() => setStep(1)}>Edit</button>
                  </div>
                </div>

                <div className="review-section">
                  <h3>Payment Method</h3>
                  <div className="review-info">
                    <p>
                      {paymentInfo.method === 'card' && '💳 Credit/Debit Card'}
                      {paymentInfo.method === 'upi' && '📱 UPI'}
                      {paymentInfo.method === 'cod' && '💵 Cash on Delivery'}
                    </p>
                    <button className="btn-edit" onClick={() => setStep(2)}>Edit</button>
                  </div>
                </div>

                <div className="form-actions">
                  <button className="btn-back" onClick={() => setStep(2)}>
                    Back
                  </button>
                  <button className="btn-place-order" onClick={placeOrder}>
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="order-summary">
            <h2>Order Summary</h2>

            <div className="cart-items">
              {cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.product.image_url} alt={item.product.name} />
                  <div className="item-details">
                    <h4>{item.product.name}</h4>
                    <p>Size: UK {item.size}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <div className="item-price">
                    ₹{(item.product.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="price-breakdown">
              <div className="price-row">
                <span>Subtotal</span>
                <span>₹{calculateTotal().toLocaleString()}</span>
              </div>
              <div className="price-row">
                <span>Shipping</span>
                <span>{calculateShipping() === 0 ? 'FREE' : `₹${calculateShipping()}`}</span>
              </div>
              <div className="price-row">
                <span>Tax (GST 18%)</span>
                <span>₹{calculateTax().toFixed(2)}</span>
              </div>
              <div className="price-row total">
                <span>Total</span>
                <span>₹{calculateGrandTotal().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
