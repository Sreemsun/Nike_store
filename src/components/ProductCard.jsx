import React from 'react'
import { Link } from 'react-router-dom'
import placeholder from '../assets/placeholder.jpg';

export default function ProductCard({ _id, id, category, name, desc, description, price, image }) {
  const productId = _id || id; // Handle both MongoDB _id and regular id
  const productDesc = desc || description; // Handle both desc and description
  
  console.log('ProductCard rendering with id:', productId, 'name:', name)

  // Fallback to placeholder if image is missing or fails to load
  const [imgSrc, setImgSrc] = React.useState(image || placeholder);

  React.useEffect(() => {
    setImgSrc(image || placeholder);
  }, [image]);

  // Format price - if it's a number, format as currency, otherwise display as-is
  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return `₹${price.toLocaleString('en-IN')}`;
    }
    return price;
  };

  return (
    <Link to={`/product/${productId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="product-card">
        <div className="product-image">
          <img
            src={imgSrc}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={() => setImgSrc(placeholder)}
          />
        </div>
        <div className="product-info">
          <p className="product-category">{category}</p>
          <h3 className="product-name">{name}</h3>
          <p className="product-description">{productDesc}</p>
          <p className="product-price">{formatPrice(price)}</p>
        </div>
      </div>
    </Link>
  )
}
