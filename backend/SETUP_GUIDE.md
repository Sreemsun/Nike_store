# 🚀 STEP-BY-STEP SETUP GUIDE FOR NIKE STORE BACKEND

Follow these steps **IN ORDER** to set up your FastAPI + MongoDB backend.

## 📋 STEP 1: Install MongoDB

### Download and Install:

1. Open your browser and go to: https://www.mongodb.com/try/download/community
2. Select:
   - Version: Latest (7.0 or higher)
   - Platform: Windows
   - Package: MSI
3. Click "Download"
4. Run the downloaded `.msi` file
5. Click "Next" through the installer
6. Choose "Complete" installation type
7. **IMPORTANT:** Check "Install MongoDB as a Service"
8. Keep default settings and click "Next"
9. Optionally install MongoDB Compass (GUI tool - recommended)
10. Click "Install" and wait for completion

### Verify MongoDB is Running:

1. Open PowerShell as Administrator
2. Run:
   ```powershell
   mongod --version
   ```
   You should see version information

3. Check if MongoDB service is running:
   ```powershell
   Get-Service MongoDB
   ```
   Status should be "Running"

4. If not running, start it:
   ```powershell
   net start MongoDB
   ```

## 📋 STEP 2: Set Up Python Environment

### Navigate to Backend Directory:

```powershell
cd "c:\Users\SREEMSUN\Documents\PROJECTS\Nike Webpage\backend"
```

### Create Virtual Environment:

```powershell
python -m venv venv
```

Wait for it to complete (takes 30-60 seconds)

### Activate Virtual Environment:

```powershell
.\venv\Scripts\Activate.ps1
```

**If you get an error about execution policy:**

Run this first:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then try activating again.

**You'll know it worked when you see `(venv)` at the start of your command line!**

## 📋 STEP 3: Install Python Packages

With virtual environment activated (you should see `(venv)` in terminal):

```powershell
pip install -r requirements.txt
```

This will install:
- FastAPI (web framework)
- Uvicorn (server)
- PyMongo & Motor (MongoDB drivers)
- Pydantic (data validation)
- JWT & Bcrypt (authentication)
- And more...

**Wait for all packages to install (2-3 minutes)**

## 📋 STEP 4: Configure Environment Variables

### Copy the example file:

```powershell
copy .env.example .env
```

### Generate a Secret Key:

```powershell
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

Copy the output (looks like: `abc123XYZ...`)

### Edit .env file:

Open `.env` in VS Code or Notepad and update:

```env
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=nike_store
SECRET_KEY=PASTE-YOUR-GENERATED-KEY-HERE
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
HOST=0.0.0.0
PORT=8000
```

**Save the file!**

## 📋 STEP 5: Seed Database with Sample Data

Run the seed script:

```powershell
python seed_db.py
```

**You should see:**
```
✅ Cleared existing products
✅ Inserted 6 products
✅ Created database indexes
✅ Database seeded successfully!
```

This creates:
- 6 sample Nike products (shoes)
- Database indexes for performance
- Initial database structure

## 📋 STEP 6: Start the Backend Server

### Method 1: Using the quick start script (Recommended)

```powershell
.\start.ps1
```

### Method 2: Manual start

```powershell
python -m app.main
```

### Method 3: Using uvicorn directly

```powershell
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**You should see:**
```
✅ Connected to MongoDB at mongodb://localhost:27017
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

## 📋 STEP 7: Test the API

### Open your browser and go to:

1. **API Documentation:** http://localhost:8000/docs
   - Interactive Swagger UI
   - Test all endpoints here!

2. **Health Check:** http://localhost:8000/health
   - Should show: `{"status": "healthy"}`

3. **Root:** http://localhost:8000/
   - Shows welcome message

### Test Creating a User:

1. Go to http://localhost:8000/docs
2. Find `POST /auth/signup`
3. Click "Try it out"
4. Enter:
   ```json
   {
     "email": "test@nike.com",
     "password": "password123",
     "first_name": "John",
     "last_name": "Doe",
     "country": "India"
   }
   ```
5. Click "Execute"
6. Should get 201 Created response!

### Test Login:

1. Find `POST /auth/login-json`
2. Click "Try it out"
3. Enter:
   ```json
   {
     "email": "test@nike.com",
     "password": "password123"
   }
   ```
4. Click "Execute"
5. Copy the `access_token` from response

### Test Getting Products:

1. Find `GET /products/`
2. Click "Try it out"
3. Click "Execute"
4. Should see 6 Nike products!

## 📋 STEP 8: View Database (Optional)

### Using MongoDB Compass:

1. Open MongoDB Compass
2. Click "New Connection"
3. Connection string: `mongodb://localhost:27017`
4. Click "Connect"
5. Click on `nike_store` database
6. Explore collections:
   - `users` - Your user accounts
   - `products` - Nike products
   - `carts` - Shopping carts
   - `orders` - Orders

## 🎉 SUCCESS!

Your backend is now running! Here's what you have:

✅ MongoDB database running
✅ FastAPI server running on port 8000
✅ 6 sample products in database
✅ Authentication system ready
✅ API documentation at /docs

## 🔄 NEXT STEPS: Connect React Frontend

To connect your React app to this backend:

1. Update API URLs in React to: `http://localhost:8000`
2. Example:
   ```javascript
   // In your React components:
   const response = await fetch('http://localhost:8000/products/');
   const products = await response.json();
   ```

## 🛠️ Common Commands

### Start server:
```powershell
cd backend
.\venv\Scripts\Activate.ps1
python -m app.main
```

### Stop server:
Press `Ctrl + C` in the terminal

### Restart MongoDB:
```powershell
net stop MongoDB
net start MongoDB
```

### View logs:
Server logs appear in terminal where you started it

### Re-seed database:
```powershell
python seed_db.py
```

## ❗ Troubleshooting

### "Module not found" error:
```powershell
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### "Can't connect to MongoDB":
```powershell
net start MongoDB
```

### Port 8000 already in use:
Change PORT in `.env` to 8001 or another port

### CORS errors from React:
Make sure `.env` has:
```
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

## 📚 Resources

- FastAPI Docs: https://fastapi.tiangolo.com/
- MongoDB Docs: https://docs.mongodb.com/
- Your API Docs: http://localhost:8000/docs

---

**Need help? Check the terminal output for error messages!**
