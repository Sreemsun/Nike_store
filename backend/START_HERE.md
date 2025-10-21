# 🚀 READY TO START - Nike Store Backend

## ✅ What's Already Done:

1. ✅ Virtual environment created
2. ✅ All Python packages installed (FastAPI, MongoDB drivers, etc.)
3. ✅ Environment variables configured (.env file ready)
4. ✅ Secret key generated for JWT authentication
5. ✅ Backend code ready (FastAPI application)
6. ⏳ MongoDB is being installed...

## 📋 AFTER MONGODB INSTALLATION IS COMPLETE:

### Step 1: Verify MongoDB Installation

Open a **NEW PowerShell** window and run:
```powershell
mongod --version
```

You should see MongoDB version information.

### Step 2: Check if MongoDB Service is Running

```powershell
Get-Service MongoDB
```

**If Status is "Stopped", start it:**
```powershell
net start MongoDB
```

### Step 3: Seed the Database

Go back to your backend terminal and run:
```powershell
cd "c:\Users\SREEMSUN\Documents\PROJECTS\Nike Webpage\backend"
.\venv\Scripts\python.exe seed_db.py
```

**Expected output:**
```
✅ Cleared existing products
✅ Inserted 6 products
✅ Created database indexes
✅ Database seeded successfully!
```

### Step 4: Start the FastAPI Server

```powershell
.\venv\Scripts\python.exe -m app.main
```

**Expected output:**
```
✅ Connected to MongoDB at mongodb://localhost:27017
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete.
```

### Step 5: Test Your Backend!

Open browser and go to:
- **API Docs:** http://localhost:8000/docs
- **Health Check:** http://localhost:8000/health
- **Products:** http://localhost:8000/products/

---

## 🎯 Your FastAPI Backend Includes:

### Authentication Endpoints:
- `POST /auth/signup` - Create new user
- `POST /auth/login-json` - Login (for React)
- `GET /auth/me` - Get current user info

### Product Endpoints:
- `GET /products/` - Get all products
- `GET /products/{id}` - Get product by ID
- `POST /products/` - Create product (auth required)
- `GET /products/search/{query}` - Search products

### Cart Endpoints:
- `GET /cart/` - Get user's cart
- `POST /cart/add` - Add item to cart
- `DELETE /cart/remove/{product_id}` - Remove item
- `DELETE /cart/clear` - Clear cart

### Order Endpoints:
- `GET /orders/` - Get user's orders
- `POST /orders/` - Create new order
- `GET /orders/{id}` - Get order by ID

---

## 🔥 Quick Commands Reference:

**Start Backend:**
```powershell
cd "c:\Users\SREEMSUN\Documents\PROJECTS\Nike Webpage\backend"
.\venv\Scripts\python.exe -m app.main
```

**Seed Database:**
```powershell
.\venv\Scripts\python.exe seed_db.py
```

**Check MongoDB:**
```powershell
Get-Service MongoDB
net start MongoDB
```

---

## 📦 What Gets Seeded:

6 Nike Products:
1. Nike Air Max Pulse - ₹13,995 (Running)
2. Nike Air Max 270 - ₹12,795 (Running)
3. Nike React Infinity - ₹14,995 (Running)
4. Nike ZoomX Vaporfly - ₹18,995 (Running)
5. Nike Basketball Pro - ₹11,995 (Basketball)
6. Nike Football Elite - ₹10,995 (Football)

---

## 🎉 Next Steps After Backend Starts:

1. Test API at http://localhost:8000/docs
2. Create a test user via Signup endpoint
3. Login and get access token
4. Test product endpoints
5. **Connect your React frontend!**

---

**Your backend is FastAPI-based and ready to go!** 🚀
