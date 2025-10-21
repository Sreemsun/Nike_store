import React from 'react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-column">
          <h4>Get Help</h4>
          <ul>
            <li><a href="https://www.nike.com/in/orders" target="_blank" rel="noopener noreferrer">Order Status</a></li>
            <li><a href="https://www.nike.com/in/help/a/delivery" target="_blank" rel="noopener noreferrer">Delivery</a></li>
            <li><a href="https://www.nike.com/in/help/a/returns" target="_blank" rel="noopener noreferrer">Returns</a></li>
            <li><a href="https://www.nike.com/in/help/a/payment-options" target="_blank" rel="noopener noreferrer">Payment Options</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>About Nike</h4>
          <ul>
            <li><a href="https://news.nike.com/" target="_blank" rel="noopener noreferrer">News</a></li>
            <li><a href="https://jobs.nike.com/" target="_blank" rel="noopener noreferrer">Careers</a></li>
            <li><a href="https://investors.nike.com/" target="_blank" rel="noopener noreferrer">Investors</a></li>
            <li><a href="https://www.nike.com/in/sustainability" target="_blank" rel="noopener noreferrer">Sustainability</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="https://www.facebook.com/nike" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://twitter.com/Nike" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/nike/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>&copy; 2025 Nike, Inc. All Rights Reserved</p>
      </div>
    </footer>
  )
}
