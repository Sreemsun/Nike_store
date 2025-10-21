import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Profile.css'

export default function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [profilePicture, setProfilePicture] = useState(null)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    country: '',
    phone: '',
    address: ''
  })

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('access_token')
    const email = localStorage.getItem('user_email')
    
    if (!token || !email) {
      navigate('/login')
      return
    }

    // Load user data from localStorage or API
    loadUserProfile(email)
  }, [navigate])

  const loadUserProfile = async (email) => {
    try {
      // For now, load from localStorage
      // In production, you would fetch from API
      const userData = {
        email: email,
        first_name: localStorage.getItem('user_first_name') || 'User',
        last_name: localStorage.getItem('user_last_name') || '',
        country: localStorage.getItem('user_country') || 'India',
        phone: localStorage.getItem('user_phone') || '',
        address: localStorage.getItem('user_address') || '',
        member_since: localStorage.getItem('member_since') || new Date().toLocaleDateString()
      }
      
      setUser(userData)
      setFormData(userData)
      setLoading(false)
    } catch (error) {
      console.error('Error loading profile:', error)
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePicture(reader.result)
        localStorage.setItem('profile_picture', reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    // Save to localStorage (in production, save to API)
    Object.keys(formData).forEach(key => {
      localStorage.setItem(`user_${key}`, formData[key])
    })
    setUser(formData)
    setEditing(false)
    alert('Profile updated successfully!')
  }

  useEffect(() => {
    // Load profile picture from localStorage
    const savedPicture = localStorage.getItem('profile_picture')
    if (savedPicture) {
      setProfilePicture(savedPicture)
    }
  }, [])

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-loading">Loading profile...</div>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-cover">
            <img 
              src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&h=300&fit=crop" 
              alt="Cover" 
              className="cover-image"
            />
          </div>
          
          <div className="profile-info-header">
            <div className="profile-picture-container">
              <div className="profile-picture">
                {profilePicture ? (
                  <img src={profilePicture} alt="Profile" />
                ) : (
                  <div className="default-avatar">
                    {user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}
                  </div>
                )}
              </div>
              <label htmlFor="profile-upload" className="upload-label">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </label>
              <input 
                type="file" 
                id="profile-upload" 
                accept="image/*" 
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </div>
            
            <div className="profile-name-section">
              <h1>{user?.first_name} {user?.last_name}</h1>
              <p className="member-since">Nike Member since {user?.member_since}</p>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="profile-content">
          {/* Personal Information */}
          <div className="profile-section">
            <div className="section-header">
              <h2>Personal Information</h2>
              {!editing ? (
                <button className="edit-btn" onClick={() => setEditing(true)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
              ) : (
                <div className="edit-actions">
                  <button className="save-btn" onClick={handleSave}>Save</button>
                  <button className="cancel-btn" onClick={() => setEditing(false)}>Cancel</button>
                </div>
              )}
            </div>

            <div className="info-grid">
              <div className="info-item">
                <label>First Name</label>
                {editing ? (
                  <input 
                    type="text" 
                    name="first_name" 
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{user?.first_name}</p>
                )}
              </div>

              <div className="info-item">
                <label>Last Name</label>
                {editing ? (
                  <input 
                    type="text" 
                    name="last_name" 
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{user?.last_name}</p>
                )}
              </div>

              <div className="info-item">
                <label>Email Address</label>
                <p>{user?.email}</p>
              </div>

              <div className="info-item">
                <label>Country</label>
                {editing ? (
                  <select name="country" value={formData.country} onChange={handleChange}>
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                  </select>
                ) : (
                  <p>{user?.country}</p>
                )}
              </div>

              <div className="info-item">
                <label>Phone Number</label>
                {editing ? (
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 1234567890"
                  />
                ) : (
                  <p>{user?.phone || 'Not provided'}</p>
                )}
              </div>

              <div className="info-item full-width">
                <label>Address</label>
                {editing ? (
                  <textarea 
                    name="address" 
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    rows="3"
                  />
                ) : (
                  <p>{user?.address || 'Not provided'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Account Statistics */}
          <div className="profile-section">
            <h2>Account Statistics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📦</div>
                <div className="stat-info">
                  <h3>0</h3>
                  <p>Total Orders</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">❤️</div>
                <div className="stat-info">
                  <h3>0</h3>
                  <p>Favorites</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">🛒</div>
                <div className="stat-info">
                  <h3>0</h3>
                  <p>Cart Items</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">⭐</div>
                <div className="stat-info">
                  <h3>Nike Member</h3>
                  <p>Status</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="profile-section">
            <h2>Quick Actions</h2>
            <div className="quick-actions">
              <button className="action-btn" onClick={() => navigate('/cart')}>
                <span>🛒</span>
                View Cart
              </button>
              <button className="action-btn" onClick={() => navigate('/favorites')}>
                <span>❤️</span>
                My Favorites
              </button>
              <button className="action-btn" onClick={() => navigate('/')}>
                <span>🏠</span>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
