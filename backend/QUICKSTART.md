# 🎯 QUICK START - Nike Store Backend

## What We Created

A complete FastAPI + MongoDB backend for your Nike e-commerce store with:

- ✅ User authentication (signup/login with JWT)
- ✅ Product management (CRUD operations)
- ✅ Shopping cart functionality
- ✅ Order management
- ✅ Search and filtering
- ✅ 6 pre-loaded Nike products

## 📁 Project Structure

```
backend/
├── app/
│   ├── routes/
│   │   ├── auth.py         # User signup/login
│   │   ├── products.py     # Product CRUD
│   │   ├── cart.py         # Shopping cart
│   │   └── orders.py       # Order management
│   ├── schemas/
│   │   └── schemas.py      # Data models
│   ├── config.py           # Settings
│   ├── database.py         # MongoDB connection
│   ├── auth.py             # JWT utilities
│   └── main.py             # FastAPI app
├── .env                    # Your config (create this!)
├── .env.example            # Example config
├── requirements.txt        # Python packages
├── seed_db.py             # Database seeder
├── start.ps1              # Quick start script
├── SETUP_GUIDE.md         # Detailed instructions
└── README.md              # Full documentation
```

## 🚀 Quick Setup (5 Steps)

### 1️⃣ Install MongoDB
- Download: https://www.mongodb.com/try/download/community
- Run installer, choose "Complete"
- Install as Windows Service ✅

### 2️⃣ Setup Python Environment
```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### 3️⃣ Configure Environment
```powershell
copy .env.example .env
# Edit .env and add your SECRET_KEY
```

### 4️⃣ Seed Database
```powershell
python seed_db.py
```

### 5️⃣ Start Server
```powershell
python -m app.main
```

## 🌐 Access Points

- **API Docs:** http://localhost:8000/docs
- **Server:** http://localhost:8000
- **Health:** http://localhost:8000/health

## 📖 Read Full Instructions

- **Step-by-Step Guide:** `SETUP_GUIDE.md`
- **Full Documentation:** `README.md`

## 🎬 Next: Connect Your React App!

Happy coding! 🚀
