import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import logo from '../assets/logo.png'

export default function NavBar() {
  let cartCount = 0
  
  try {
    const { getCartCount } = useCart()
    cartCount = getCartCount()
  } catch (error) {
    console.error('Cart context error in NavBar:', error)
  }
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/">
            <img src={logo} alt="Nike Logo" style={{ height: '60px', width: 'auto', cursor: 'pointer' }} />
          </Link>
        </div>
        <ul className="nav-menu">
          <li><Link to="/">New & Featured</Link></li>
          <li><Link to="/men">Men</Link></li>
          <li><Link to="/women">Women</Link></li>
          <li><Link to="/kids">Kids</Link></li>
          <li><Link to="/sale">Sale</Link></li>
        </ul>
        <div className="nav-actions">
          <div className="search-box">
            <input type="text" placeholder="Search" />
            <Link to="/search" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </Link>
          </div>
          <Link to="/favorites" className="icon-btn" aria-label="favorites">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </Link>
          <Link to="/cart" className="icon-btn" aria-label="cart" style={{ position: 'relative' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="9" cy="21" r="1" fill="currentColor"/>
              <circle cx="20" cy="21" r="1" fill="currentColor"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke="currentColor" strokeWidth="2"/>
            </svg>
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                background: '#ff6b35',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {cartCount}
              </span>
            )}
          </Link>
          {localStorage.getItem('access_token') ? (
            <Link to="/profile" className="btn btn-auth" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Profile
            </Link>
          ) : (
            <>
              <Link to="/signup" className="btn btn-auth">Join Us</Link>
              <Link to="/login" className="btn btn-auth">Sign In</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
