import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Cart from './pages/Cart'
import Favorites from './pages/Favorites'
import Search from './pages/Search'
import Profile from './pages/Profile'
import Men from './pages/Men'
import Women from './pages/Women'
import Kids from './pages/Kids'
import Sale from './pages/Sale'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'

export default function App() {
  useEffect(() => {
    console.log('App mounted');
    // Smooth scroll for in-page anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // Simple scroll shadow for navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      const onScroll = () => {
        if (window.pageYOffset > 100) navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        else navbar.style.boxShadow = 'none';
      }
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    }
  }, []);

  console.log('App rendering');

  return (
    <CartProvider>
      <Router>
        <div>
          <NavBar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/search" element={<Search />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/men" element={<Men />} />
              <Route path="/women" element={<Women />} />
              <Route path="/kids" element={<Kids />} />
              <Route path="/sale" element={<Sale />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  )
}
