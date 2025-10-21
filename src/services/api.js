// API Service for Nike Store Backend

const API_BASE_URL = 'http://localhost:8000';

// Authentication APIs
export const authAPI = {
  // Signup new user
  signup: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Signup failed');
    }
    
    return await response.json();
  },

  // Login user
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login-json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Login failed');
    }
    
    const data = await response.json();
    // Store token in localStorage
    localStorage.setItem('access_token', data.access_token);
    return data;
  },

  // Get current user info
  getCurrentUser: async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to get user info');
    }
    
    return await response.json();
  },

  // Logout
  logout: () => {
    localStorage.removeItem('access_token');
  },

  // Check if user is logged in
  isLoggedIn: () => {
    return !!localStorage.getItem('access_token');
  },

  // Get token
  getToken: () => {
    return localStorage.getItem('access_token');
  },
};

// Product APIs
export const productAPI = {
  // Get all products
  getAll: async (category = null) => {
    let url = `${API_BASE_URL}/products/`;
    if (category) {
      url += `?category=${category}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    return await response.json();
  },

  // Get single product
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Product not found');
    }
    
    return await response.json();
  },

  // Search products
  search: async (query) => {
    const response = await fetch(`${API_BASE_URL}/products/search/${query}`);
    if (!response.ok) {
      throw new Error('Search failed');
    }
    
    return await response.json();
  },
};

// Cart APIs
export const cartAPI = {
  // Get cart
  get: async () => {
    const token = authAPI.getToken();
    const response = await fetch(`${API_BASE_URL}/cart/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }
    
    return await response.json();
  },

  // Add to cart
  add: async (productId, quantity, price) => {
    const token = authAPI.getToken();
    const response = await fetch(`${API_BASE_URL}/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_id: productId,
        quantity: quantity,
        price: price,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add to cart');
    }
    
    return await response.json();
  },

  // Remove from cart
  remove: async (productId) => {
    const token = authAPI.getToken();
    const response = await fetch(`${API_BASE_URL}/cart/remove/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to remove from cart');
    }
    
    return await response.json();
  },

  // Clear cart
  clear: async () => {
    const token = authAPI.getToken();
    const response = await fetch(`${API_BASE_URL}/cart/clear`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to clear cart');
    }
    
    return await response.json();
  },
};

// Order APIs
export const orderAPI = {
  // Get all orders
  getAll: async () => {
    const token = authAPI.getToken();
    const response = await fetch(`${API_BASE_URL}/orders/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    
    return await response.json();
  },

  // Create order
  create: async (items, shippingAddress) => {
    const token = authAPI.getToken();
    const response = await fetch(`${API_BASE_URL}/orders/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: items,
        shipping_address: shippingAddress,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create order');
    }
    
    return await response.json();
  },

  // Get order by ID
  getById: async (orderId) => {
    const token = authAPI.getToken();
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Order not found');
    }
    
    return await response.json();
  },
};

export default {
  auth: authAPI,
  products: productAPI,
  cart: cartAPI,
  orders: orderAPI,
};
