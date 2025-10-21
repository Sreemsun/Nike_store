# Nike Store Backend API

FastAPI backend with MongoDB for the Nike E-commerce Store.

## Features

- 🔐 **User Authentication** - JWT-based authentication with secure password hashing
- 👤 **User Management** - Signup, login, and profile management
- 🛍️ **Product Management** - CRUD operations for products with search and filtering
- 🛒 **Shopping Cart** - Add, remove, and manage cart items
- 📦 **Order Management** - Create and track orders
- ❤️ **Favorites** - Save favorite products
- 🔍 **Search** - Full-text search across products

## Tech Stack

- **FastAPI** - Modern, fast web framework for Python
- **MongoDB** - NoSQL database for flexible data storage
- **Motor** - Async MongoDB driver
- **Pydantic** - Data validation using Python type annotations
- **JWT** - Secure token-based authentication
- **Bcrypt** - Password hashing

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Python 3.8+** - [Download Python](https://www.python.org/downloads/)
2. **MongoDB** - [Download MongoDB](https://www.mongodb.com/try/download/community)
3. **pip** - Python package installer (comes with Python)

## Installation Steps

### Step 1: Install MongoDB

#### For Windows:

1. Download MongoDB Community Server from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Run the installer (.msi file)
3. Choose "Complete" installation
4. Install MongoDB as a Windows Service (recommended)
5. MongoDB Compass will be installed automatically (optional GUI)

#### Verify MongoDB Installation:

Open PowerShell and run:
```powershell
mongod --version
```

#### Start MongoDB:

MongoDB should start automatically as a service. If not:
```powershell
net start MongoDB
```

### Step 2: Set Up Python Virtual Environment

Navigate to the backend directory:
```powershell
cd "c:\Users\SREEMSUN\Documents\PROJECTS\Nike Webpage\backend"
```

Create a virtual environment:
```powershell
python -m venv venv
```

Activate the virtual environment:
```powershell
.\venv\Scripts\Activate.ps1
```

**Note:** If you get an execution policy error, run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Step 3: Install Python Dependencies

With the virtual environment activated:
```powershell
pip install -r requirements.txt
```

### Step 4: Configure Environment Variables

Copy the example environment file:
```powershell
copy .env.example .env
```

Edit `.env` file and update the values:
```env
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=nike_store
SECRET_KEY=your-super-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
HOST=0.0.0.0
PORT=8000
```

**Important:** Change the `SECRET_KEY` to a strong random string. You can generate one using:
```powershell
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### Step 5: Seed the Database with Sample Data

Run the seed script to populate the database with sample products:
```powershell
python seed_db.py
```

You should see:
```
✅ Cleared existing products
✅ Inserted 6 products
✅ Created database indexes
✅ Database seeded successfully!
```

### Step 6: Start the Backend Server

Run the FastAPI server:
```powershell
python -m app.main
```

Or using uvicorn directly:
```powershell
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The server will start at: `http://localhost:8000`

## API Documentation

Once the server is running, you can access:

- **Interactive API Docs (Swagger UI):** http://localhost:8000/docs
- **Alternative API Docs (ReDoc):** http://localhost:8000/redoc
- **Health Check:** http://localhost:8000/health

## API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login with form data
- `POST /auth/login-json` - Login with JSON (for React)
- `GET /auth/me` - Get current user info

### Products
- `GET /products/` - Get all products (with filters)
- `GET /products/{id}` - Get product by ID
- `POST /products/` - Create product (auth required)
- `PUT /products/{id}` - Update product (auth required)
- `DELETE /products/{id}` - Delete product (auth required)
- `GET /products/search/{query}` - Search products

### Cart
- `GET /cart/` - Get user's cart
- `POST /cart/add` - Add item to cart
- `DELETE /cart/remove/{product_id}` - Remove item
- `DELETE /cart/clear` - Clear cart

### Orders
- `GET /orders/` - Get user's orders
- `GET /orders/{id}` - Get specific order
- `POST /orders/` - Create new order
- `PATCH /orders/{id}/status` - Update order status

## Testing the API

### Using the Interactive Docs

1. Go to http://localhost:8000/docs
2. Click on any endpoint to expand it
3. Click "Try it out"
4. Fill in the required parameters
5. Click "Execute"

### Using curl (PowerShell)

**Create a user:**
```powershell
$body = @{
    email = "test@example.com"
    password = "password123"
    first_name = "John"
    last_name = "Doe"
    country = "India"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8000/auth/signup" -Method Post -Body $body -ContentType "application/json"
```

**Login:**
```powershell
$body = @{
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:8000/auth/login-json" -Method Post -Body $body -ContentType "application/json"
$token = $response.access_token
```

**Get products:**
```powershell
Invoke-RestMethod -Uri "http://localhost:8000/products/" -Method Get
```

## Database Structure

### Collections

1. **users** - User accounts
2. **products** - Product catalog
3. **carts** - Shopping carts
4. **orders** - Order history

### Viewing Database (MongoDB Compass)

1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Select `nike_store` database
4. Browse collections

## Connecting to React Frontend

Update your React app's API calls to point to: `http://localhost:8000`

Example in React:
```javascript
const response = await fetch('http://localhost:8000/products/');
const products = await response.json();
```

## Troubleshooting

### MongoDB Connection Error

If you see `pymongo.errors.ServerSelectionTimeoutError`:
- Ensure MongoDB service is running: `net start MongoDB`
- Check MongoDB is listening on port 27017

### Import Errors

If you see import errors:
- Make sure virtual environment is activated
- Run `pip install -r requirements.txt` again

### Port Already in Use

If port 8000 is busy:
- Change PORT in `.env` file
- Or stop the process using port 8000

### CORS Errors

If frontend can't connect:
- Check `CORS_ORIGINS` in `.env` includes your frontend URL
- Restart the backend server after changes

## Development Tips

1. **Auto-reload:** The server automatically reloads when you change code
2. **Logs:** Check terminal for request logs and errors
3. **Database:** Use MongoDB Compass to view/edit data
4. **API Testing:** Use the Swagger UI at `/docs` for easy testing

## Project Structure

```
backend/
├── app/
│   ├── routes/          # API endpoints
│   │   ├── auth.py      # Authentication routes
│   │   ├── products.py  # Product routes
│   │   ├── cart.py      # Cart routes
│   │   └── orders.py    # Order routes
│   ├── schemas/         # Pydantic models
│   │   └── schemas.py   # Data validation schemas
│   ├── models/          # Database models
│   ├── config.py        # Configuration settings
│   ├── database.py      # MongoDB connection
│   ├── auth.py          # Authentication utilities
│   └── main.py          # FastAPI application
├── venv/                # Virtual environment
├── .env                 # Environment variables
├── .env.example         # Example environment file
├── requirements.txt     # Python dependencies
├── seed_db.py          # Database seeding script
└── README.md           # This file
```

## Next Steps

1. ✅ Install MongoDB
2. ✅ Set up Python environment
3. ✅ Install dependencies
4. ✅ Configure .env file
5. ✅ Seed database
6. ✅ Start backend server
7. 🔄 Connect React frontend
8. 🔄 Test API endpoints

## Support

For issues or questions:
- Check the Swagger UI documentation at `/docs`
- Review MongoDB logs
- Check terminal for error messages

Happy coding! 🚀
