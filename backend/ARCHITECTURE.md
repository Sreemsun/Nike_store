# 🏗️ Nike Store Backend - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        REACT FRONTEND                            │
│                     (Nike Webpage)                               │
│                   Port: 5173 / 3000                             │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ HTTP Requests
                         │ (fetch/axios)
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                     FASTAPI BACKEND                              │
│                      Port: 8000                                  │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   /auth      │  │  /products   │  │    /cart     │          │
│  │  - signup    │  │  - GET all   │  │  - add item  │          │
│  │  - login     │  │  - GET by id │  │  - remove    │          │
│  │  - profile   │  │  - CREATE    │  │  - clear     │          │
│  └──────────────┘  │  - UPDATE    │  └──────────────┘          │
│                    │  - DELETE    │                              │
│  ┌──────────────┐  │  - SEARCH    │  ┌──────────────┐          │
│  │   /orders    │  └──────────────┘  │  JWT Auth    │          │
│  │  - create    │                    │  - verify    │          │
│  │  - get all   │                    │  - hash pwd  │          │
│  │  - get by id │                    └──────────────┘          │
│  │  - update    │                                                │
│  └──────────────┘                                                │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ Motor (Async Driver)
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                      MONGODB DATABASE                            │
│                      Port: 27017                                 │
├─────────────────────────────────────────────────────────────────┤
│  Database: nike_store                                            │
│                                                                   │
│  Collections:                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   users     │  │  products   │  │    carts    │             │
│  │  - email    │  │  - name     │  │  - user_id  │             │
│  │  - password │  │  - price    │  │  - items[]  │             │
│  │  - name     │  │  - category │  │  - total    │             │
│  └─────────────┘  │  - stock    │  └─────────────┘             │
│                   └─────────────┘                                │
│  ┌─────────────┐                                                 │
│  │   orders    │                                                 │
│  │  - user_id  │                                                 │
│  │  - items[]  │                                                 │
│  │  - total    │                                                 │
│  │  - status   │                                                 │
│  └─────────────┘                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## API Endpoints Overview

### 🔐 Authentication (`/auth`)
```
POST   /auth/signup        → Create new user account
POST   /auth/login         → Login with form data
POST   /auth/login-json    → Login with JSON (React)
GET    /auth/me            → Get current user info
```

### 🛍️ Products (`/products`)
```
GET    /products/          → Get all products (with filters)
GET    /products/{id}      → Get single product
POST   /products/          → Create product (auth required)
PUT    /products/{id}      → Update product (auth required)
DELETE /products/{id}      → Delete product (auth required)
GET    /products/search/{query} → Search products
```

### 🛒 Shopping Cart (`/cart`)
```
GET    /cart/              → Get user's cart
POST   /cart/add           → Add item to cart
DELETE /cart/remove/{id}   → Remove item from cart
DELETE /cart/clear         → Clear entire cart
```

### 📦 Orders (`/orders`)
```
GET    /orders/            → Get all user orders
GET    /orders/{id}        → Get specific order
POST   /orders/            → Create new order
PATCH  /orders/{id}/status → Update order status
```

## Data Flow Example

### User Signup Flow:
```
1. User fills signup form in React
2. React sends POST to /auth/signup
3. FastAPI validates data (Pydantic)
4. Password is hashed (Bcrypt)
5. User saved to MongoDB
6. Response sent back to React
```

### Product Purchase Flow:
```
1. User clicks "Add to Cart"
2. React sends POST to /cart/add
3. FastAPI verifies JWT token
4. Product added to user's cart in MongoDB
5. Cart total calculated
6. Updated cart returned to React

7. User clicks "Checkout"
8. React sends POST to /orders/
9. Order created in MongoDB
10. Cart cleared automatically
11. Order confirmation sent to React
```

## Technologies Used

### Backend (Python)
- **FastAPI** - Modern web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation
- **Motor** - Async MongoDB driver
- **PyMongo** - MongoDB operations
- **Python-Jose** - JWT handling
- **Passlib** - Password hashing
- **Bcrypt** - Cryptography

### Database
- **MongoDB** - NoSQL database
- **Motor** - Async driver for FastAPI
- **MongoDB Compass** - GUI for viewing data

### Security
- **JWT** - Token-based authentication
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **OAuth2** - Authentication scheme

## File Structure Explained

```
backend/
│
├── app/                          # Main application package
│   ├── routes/                   # API endpoints
│   │   ├── __init__.py
│   │   ├── auth.py              # User authentication
│   │   ├── products.py          # Product CRUD
│   │   ├── cart.py              # Shopping cart
│   │   └── orders.py            # Order management
│   │
│   ├── schemas/                  # Data models
│   │   ├── __init__.py
│   │   └── schemas.py           # Pydantic models
│   │
│   ├── models/                   # Database models
│   │   └── __init__.py
│   │
│   ├── config.py                # Configuration settings
│   ├── database.py              # MongoDB connection
│   ├── auth.py                  # Auth utilities (JWT, hash)
│   └── main.py                  # FastAPI application
│
├── venv/                        # Virtual environment (created)
├── .env                         # Environment variables (create this!)
├── .env.example                 # Example config
├── .gitignore                   # Git ignore file
├── requirements.txt             # Python dependencies
├── seed_db.py                   # Database seeding script
├── start.ps1                    # Quick start script
├── QUICKSTART.md               # Quick overview
├── SETUP_GUIDE.md              # Step-by-step guide
├── CHECKLIST.md                # Setup checklist
├── ARCHITECTURE.md             # This file
└── README.md                   # Full documentation
```

## Environment Variables

```env
MONGODB_URL=mongodb://localhost:27017    # MongoDB connection
DATABASE_NAME=nike_store                 # Database name
SECRET_KEY=your-secret-key              # JWT secret
ALGORITHM=HS256                         # JWT algorithm
ACCESS_TOKEN_EXPIRE_MINUTES=30          # Token expiry
CORS_ORIGINS=http://localhost:5173     # Allowed origins
HOST=0.0.0.0                           # Server host
PORT=8000                              # Server port
```

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  hashed_password: String,
  first_name: String,
  last_name: String,
  date_of_birth: String (optional),
  country: String,
  gender: String (optional),
  newsletter_subscription: Boolean,
  created_at: DateTime
}
```

### Products Collection
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Float,
  category: String,
  image_url: String,
  stock: Integer,
  created_at: DateTime
}
```

### Carts Collection
```javascript
{
  _id: ObjectId,
  user_id: String,
  items: [{
    product_id: String,
    quantity: Integer,
    price: Float
  }],
  total: Float,
  updated_at: DateTime
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  user_id: String,
  items: [{
    product_id: String,
    product_name: String,
    quantity: Integer,
    price: Float
  }],
  total: Float,
  status: String,  // pending, processing, shipped, delivered, cancelled
  shipping_address: String,
  created_at: DateTime
}
```

## Security Features

1. **Password Hashing**: Bcrypt with salt
2. **JWT Tokens**: Secure token-based auth
3. **Token Expiry**: 30-minute default
4. **CORS Protection**: Specific origins allowed
5. **Input Validation**: Pydantic models
6. **SQL Injection**: N/A (NoSQL database)
7. **Authentication Required**: Protected endpoints

## Performance Features

1. **Async Operations**: Non-blocking I/O
2. **Database Indexes**: Fast queries
3. **Connection Pooling**: Efficient connections
4. **Auto-reload**: Development mode
5. **Pagination**: Limit/skip for large datasets

## API Response Format

### Success Response:
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "Nike Air Max",
  "price": 13995.00,
  "category": "Running",
  "stock": 50
}
```

### Error Response:
```json
{
  "detail": "Product not found"
}
```

### List Response:
```json
[
  {"id": "1", "name": "Product 1"},
  {"id": "2", "name": "Product 2"}
]
```

## Next Steps

1. ✅ Backend is ready
2. 🔄 Connect React frontend
3. 🔄 Test all endpoints
4. 🔄 Deploy to production

---

**Architecture Version:** 1.0.0  
**Last Updated:** October 18, 2025
