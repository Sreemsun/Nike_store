import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('http://localhost:8000/auth/login-json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (response.ok) {
        // Save token to localStorage
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('user_email', email)
        
        alert('Login successful! Welcome back!')
        navigate('/profile') // Redirect to profile page
      } else {
        setError(data.detail || 'Login failed. Please check your credentials.')
      }
    } catch (err) {
      setError('Unable to connect to server. Please make sure the backend is running.')
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-box">
          <div className="auth-header">
            <h1>YOUR ACCOUNT FOR EVERYTHING NIKE</h1>
          </div>
          
          {error && (
            <div style={{ 
              padding: '12px', 
              marginBottom: '16px', 
              backgroundColor: 'rgba(255, 0, 0, 0.1)', 
              border: '1px solid rgba(255, 0, 0, 0.3)', 
              borderRadius: '8px', 
              color: '#ff6b6b' 
            }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
            
            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Keep me signed in</span>
              </label>
              <a href="#" className="forgot-link">Forgotten your password?</a>
            </div>
            
            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
            
            <p className="auth-footer-text">
              Not a Member? <Link to="/signup" className="auth-link">Join Us.</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
