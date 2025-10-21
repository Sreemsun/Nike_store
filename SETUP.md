# Nike Webpage - Full Stack Setup Guide

## 🎯 Quick Start

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- MongoDB (running on localhost:27017)

---

## 🚀 Backend Setup

### 1. Start MongoDB
Make sure MongoDB is running on `localhost:27017`

**Windows (MongoDB as service):**
```powershell
# Check if running
Get-Service MongoDB

# Start if not running
Start-Service MongoDB
```

**Or start manually:**
```powershell
mongod --dbpath="C:\data\db"
```

### 2. Install Python Dependencies
```powershell
cd backend
pip install -r requirements.txt
```

### 3. Start Backend Server
```powershell
cd backend
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Backend will be available at:** `http://localhost:8000`
- API Docs: http://localhost:8000/docs
- Health Check: http://localhost:8000/health

### 4. Seed Database (Optional)
```powershell
cd backend
python seed_db.py
```

---

## 🎨 Frontend Setup

### 1. Install Dependencies
```powershell
npm install
```

### 2. Start Dev Server
```powershell
npm run dev
```

**Frontend will be available at:** `http://localhost:5173` (or 5174/5175 if port is busy)

---

## ✅ Verify Everything is Working

### Backend Check
1. Visit http://localhost:8000/docs
2. You should see the Swagger API documentation

### Frontend Check
1. Visit http://localhost:5175 (check your terminal for the actual port)
2. You should see the Nike homepage

### Test Authentication Flow
1. **Signup**: Create a new account at `/signup`
2. **Login**: Login with your credentials at `/login`
3. **Browse Products**: Click on Men/Women/Kids categories
4. **Add to Cart**: 
   - Try adding without login → Should prompt "Please log in"
   - Login first → Add to cart should work
5. **View Cart**: Cart icon should show item count
6. **Checkout**: Complete order flow

---

## 🔧 Configuration

### Backend (backend/app/config.py)
- **MongoDB URL**: `mongodb://localhost:27017`
- **Database Name**: `nike_store`
- **API Port**: `8000`
- **CORS Origins**: Includes ports 5173, 5174, 5175, 3000

### Frontend (Vite auto-config)
- **Dev Server**: Auto-selects available port (5173-5175)
- **API Base URL**: `http://localhost:8000`

---

## 🎯 Key Features Implemented

### Authentication & Authorization
- ✅ User signup/login with JWT tokens
- ✅ Protected routes (add to cart requires login)
- ✅ User-specific cart persistence
- ✅ Session management with localStorage

### Product Catalog
- ✅ Categories: Men, Women, Kids, Sale
- ✅ Product detail pages with image gallery
- ✅ Size selection and quantity controls
- ✅ Local data + backend integration

### Shopping Cart
- ✅ Add/remove items
- ✅ Update quantities
- ✅ Per-user cart storage (cart_<email>)
- ✅ Cart persists across sessions
- ✅ Real-time cart count in navbar

### UI/UX
- ✅ Responsive design
- ✅ Nike brand styling
- ✅ Error boundaries for graceful failures
- ✅ Loading states

---

## 📁 Project Structure

```
Nike Webpage/
├── backend/                 # FastAPI Backend
│   ├── app/
│   │   ├── routes/         # API endpoints
│   │   ├── schemas/        # Pydantic models
│   │   ├── config.py       # Configuration
│   │   ├── database.py     # MongoDB connection
│   │   └── main.py         # FastAPI app
│   └── requirements.txt
│
├── src/                     # React Frontend
│   ├── assets/             # Images
│   ├── components/         # React components
│   ├── context/            # Context providers
│   │   ├── AuthContext.jsx # User authentication
│   │   └── CartContext.jsx # Shopping cart
│   ├── data/               # Local product data
│   ├── pages/              # Page components
│   ├── styles/             # CSS files
│   └── main.jsx            # React entry point
│
├── index.html
├── package.json
└── vite.config.js
```

---

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Failed**
```
❌ Error: Could not connect to MongoDB
```
**Solution:** Start MongoDB service
```powershell
Start-Service MongoDB
# or
mongod --dbpath="C:\data\db"
```

**Port 8000 Already in Use**
```powershell
# Find process using port 8000
netstat -ano | findstr :8000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Frontend Issues

**Blank White Page**
- Open F12 Developer Tools → Console
- Check for JavaScript errors
- Verify backend is running on port 8000

**CORS Errors**
```
Access to fetch at 'http://localhost:8000' has been blocked by CORS
```
**Solution:** Backend CORS is configured for ports 5173-5175. If using a different port, update `backend/app/config.py`

**Cart Not Persisting**
- Check browser localStorage (F12 → Application → Local Storage)
- Should see `cart_<email>`, `access_token`, `user_email`

---

## 🔐 Test Accounts

After seeding the database, you can use these test accounts:

```
Email: test@nike.com
Password: password123
```

Or create your own at `/signup`

---

## 🎓 API Endpoints

### Authentication
- `POST /auth/signup` - Create new user
- `POST /auth/login-json` - Login (returns JWT token)
- `GET /auth/me` - Get current user (requires auth)

### Products
- `GET /products` - List all products
- `GET /products/{id}` - Get product by ID
- `POST /products` - Create product (admin only)

### Cart
- `GET /cart` - Get user's cart
- `POST /cart/add` - Add item to cart
- `DELETE /cart/{item_id}` - Remove item from cart
- `PUT /cart/{item_id}` - Update item quantity

### Orders
- `GET /orders` - Get user's orders
- `POST /orders` - Create new order
- `GET /orders/{id}` - Get order by ID

---

## 📝 Environment Variables (Optional)

Create `.env` file in backend directory:

```env
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=nike_store
SECRET_KEY=your-secret-key-here
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

## 🚀 Production Deployment

### Backend
```powershell
# Install production dependencies
pip install -r requirements.txt

# Run with gunicorn (production server)
gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app
```

### Frontend
```powershell
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📞 Support

If you encounter issues:
1. Check this SETUP.md file
2. Review console logs (F12 in browser)
3. Check terminal output for backend errors
4. Verify MongoDB is running

---

## ✨ Next Steps

- [ ] Add payment integration (Stripe/PayPal)
- [ ] Implement order history page
- [ ] Add product search functionality
- [ ] Implement wishlist backend sync
- [ ] Add user profile editing
- [ ] Implement email verification
- [ ] Add admin dashboard
- [ ] Deploy to production

---

**Happy Coding! 🚀**
