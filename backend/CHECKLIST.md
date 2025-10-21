# ✅ Nike Store Backend Setup Checklist

Follow this checklist to ensure everything is set up correctly!

## Prerequisites

- [ ] Windows PC
- [ ] Python 3.8+ installed
- [ ] PowerShell available
- [ ] Internet connection

## Installation Checklist

### MongoDB Setup
- [ ] Downloaded MongoDB Community Server
- [ ] Ran the installer (.msi file)
- [ ] Chose "Complete" installation
- [ ] Installed MongoDB as a Service
- [ ] MongoDB Compass installed (optional)
- [ ] Verified MongoDB version: `mongod --version`
- [ ] Confirmed MongoDB service is running: `Get-Service MongoDB`

### Python Environment
- [ ] Navigated to backend folder
- [ ] Created virtual environment: `python -m venv venv`
- [ ] Activated virtual environment: `.\venv\Scripts\Activate.ps1`
- [ ] See `(venv)` in terminal prompt
- [ ] Installed packages: `pip install -r requirements.txt`
- [ ] No error messages during installation

### Configuration
- [ ] Copied .env.example to .env: `copy .env.example .env`
- [ ] Generated secret key: `python -c "import secrets; print(secrets.token_urlsafe(32))"`
- [ ] Pasted secret key into .env file
- [ ] Saved .env file

### Database Setup
- [ ] Ran seed script: `python seed_db.py`
- [ ] Saw "Inserted 6 products" message
- [ ] Saw "Database seeded successfully!" message
- [ ] No error messages

### Server Startup
- [ ] Started server: `python -m app.main`
- [ ] Saw "Connected to MongoDB" message
- [ ] Saw "Application startup complete" message
- [ ] No error messages in terminal

### Testing
- [ ] Opened http://localhost:8000 in browser
- [ ] Saw welcome message
- [ ] Opened http://localhost:8000/docs
- [ ] Saw Swagger UI documentation
- [ ] Tested GET /products/ endpoint
- [ ] Saw 6 Nike products in response
- [ ] Tested POST /auth/signup endpoint
- [ ] Created a test user successfully
- [ ] Tested POST /auth/login-json endpoint
- [ ] Received access token

### Optional: MongoDB Compass
- [ ] Opened MongoDB Compass
- [ ] Connected to mongodb://localhost:27017
- [ ] Opened nike_store database
- [ ] Viewed products collection
- [ ] Viewed users collection
- [ ] Confirmed data is there

## 🎉 All Done!

If all items are checked, your backend is ready!

## 🚨 Troubleshooting

If any item is unchecked, see:
- **SETUP_GUIDE.md** for detailed instructions
- **README.md** for troubleshooting section
- Terminal output for error messages

## 📝 Quick Commands Reference

**Start MongoDB:**
```powershell
net start MongoDB
```

**Activate Virtual Environment:**
```powershell
cd backend
.\venv\Scripts\Activate.ps1
```

**Start Server:**
```powershell
python -m app.main
```

**Re-seed Database:**
```powershell
python seed_db.py
```

**Stop Server:**
Press `Ctrl + C` in terminal

## 🔗 Important URLs

- API Documentation: http://localhost:8000/docs
- Server Health: http://localhost:8000/health
- Root: http://localhost:8000

## 📞 Support Files

- `QUICKSTART.md` - Quick overview
- `SETUP_GUIDE.md` - Step-by-step instructions
- `README.md` - Full documentation

---

**Date Completed:** ________________

**Notes:**
_____________________________________
_____________________________________
_____________________________________
