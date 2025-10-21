import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    country: 'India',
    gender: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const signupData = {
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
        country: formData.country
      }

      const response = await fetch('http://localhost:8000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData)
      })

      const data = await response.json()

      if (response.ok) {
        // Save user details to localStorage for profile page
        localStorage.setItem('user_first_name', formData.firstName)
        localStorage.setItem('user_last_name', formData.lastName)
        localStorage.setItem('user_country', formData.country)
        localStorage.setItem('member_since', new Date().toLocaleDateString())
        
        alert('Signup successful! Please login with your credentials.')
        navigate('/login') // Redirect to login page
      } else {
        setError(data.detail || 'Signup failed. Please try again.')
      }
    } catch (err) {
      setError('Unable to connect to server. Please make sure the backend is running.')
      console.error('Signup error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-box signup-box">
          <div className="auth-header">
            <h1>BECOME A NIKE MEMBER</h1>
            <p className="auth-subtitle">Create your Nike Member profile and get first access to the very best of Nike products, inspiration and community.</p>
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
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <input
                type="date"
                name="dateOfBirth"
                placeholder="Date of Birth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                className="form-input"
              />
              <small className="form-hint">Get a Nike Member Reward every year on your Birthday.</small>
            </div>
            
            <div className="form-group">
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="form-input"
              >
                <option value="India">India</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
              </select>
            </div>
            
            <div className="form-group gender-group">
              <label className={`gender-btn ${formData.gender === 'male' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                />
                <span>Male</span>
              </label>
              <label className={`gender-btn ${formData.gender === 'female' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={handleChange}
                />
                <span>Female</span>
              </label>
            </div>
            
            <label className="checkbox-label">
              <input type="checkbox" required />
              <span>Sign up for emails to get updates from Nike on products, offers and your Member benefits</span>
            </label>
            
            <p className="terms-text">
              By creating an account, you agree to Nike's <a href="#" className="auth-link">Privacy Policy</a> and <a href="#" className="auth-link">Terms of Use</a>.
            </p>
            
            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'JOINING...' : 'JOIN US'}
            </button>
            
            <p className="auth-footer-text">
              Already a Member? <Link to="/login" className="auth-link">Sign In.</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
