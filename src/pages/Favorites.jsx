import React from 'react'

export default function Favorites() {
  return (
    <div className="page-container">
      <div className="container">
        <div className="favorites-page">
          <h1>Favorites</h1>
          <div className="empty-state">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <h2>No favorites yet</h2>
            <p>Start adding your favorite Nike products</p>
            <a href="/" className="btn btn-primary" style={{ marginTop: '24px' }}>Browse Products</a>
          </div>
        </div>
      </div>
    </div>
  )
}
