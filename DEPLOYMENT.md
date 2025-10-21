# Nike Store - Render Deployment Guide

## 🚀 Deployment Steps

### Part 1: Deploy Backend (FastAPI)

1. **Push your code to GitHub** (you already did this!)

2. **Go to Render Dashboard**: https://dashboard.render.com

3. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repo: `Nike-store`
   - Select repository

4. **Configure Backend Service**:
   ```
   Name: nike-backend
   Region: Singapore (or closest to you)
   Branch: master
   Root Directory: backend
   Runtime: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
   ```

5. **Add Environment Variables** (in Render dashboard):
   ```
   MONGODB_URL=mongodb+srv://sreemsun21anand_db_user:Sreemsun21@nike.w6xymg6.mongodb.net/?retryWrites=true&w=majority&appName=Nike
   DATABASE_NAME=Nike
   SECRET_KEY=m1FD2AVcbp9fe-foK-qVnJ654c8REeTWcFdojVXNP-k
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   HOST=0.0.0.0
   PORT=10000
   CORS_ORIGINS=["https://nike-webpage.onrender.com","http://localhost:5173"]
   ```

6. **Deploy!** Wait for build to complete (~5 min)

7. **Note your backend URL**: `https://nike-backend.onrender.com`

---

### Part 2: Deploy Frontend (React + Vite)

1. **Create Another Web Service**:
   - Click "New +" → "Web Service"
   - Same GitHub repo: `Nike-store`

2. **Configure Frontend Service**:
   ```
   Name: nike-webpage
   Region: Singapore
   Branch: master
   Root Directory: (leave empty - use root)
   Runtime: Node
   Build Command: npm install && npm run build
   Start Command: npm run preview -- --host 0.0.0.0 --port $PORT
   ```

3. **Add Environment Variable**:
   ```
   VITE_API_URL=https://nike-backend.onrender.com
   ```
   (Replace with YOUR actual backend URL from step 1)

4. **Deploy!** Wait for build (~3-5 min)

5. **Your site is live!** `https://nike-webpage.onrender.com`

---

## 🔧 Update Local Code for Production

### 1. Update Frontend API Calls

Replace all `http://localhost:8000` with `import.meta.env.VITE_API_URL`:

**Example in `Login.jsx`:**
```javascript
import { API_URL } from '../config'

// Change from:
const response = await fetch('http://localhost:8000/auth/login-json', {

// To:
const response = await fetch(`${API_URL}/auth/login-json`, {
```

**Files to update:**
- `src/pages/Login.jsx`
- `src/pages/Signup.jsx`
- `src/pages/ProductDetail.jsx`
- `src/pages/Profile.jsx`
- `src/pages/Checkout.jsx`
- `src/components/Featured.jsx`

### 2. Update Backend CORS

Already done! The `.env` now includes production URLs.

### 3. Add `package.json` preview script

Make sure your `package.json` has:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## 🐛 Common Issues & Fixes

### Issue 1: "Failed to fetch" / CORS Error
**Fix**: Make sure CORS_ORIGINS in backend includes your frontend URL

### Issue 2: "Cannot connect to server"
**Fix**: 
1. Check backend is running on Render
2. Update `VITE_API_URL` to match your backend URL
3. Rebuild frontend after changing env var

### Issue 3: Images not loading
**Fix**: Images are bundled correctly with Vite, but check:
```javascript
// Make sure imports are at top of files
import men1 from '../assets/men1.jpeg'
```

### Issue 4: MongoDB connection fails
**Fix**: 
1. Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for testing)
2. Verify connection string in Render env vars

### Issue 5: Blank page after deployment
**Fix**:
1. Check browser console (F12) for errors
2. Check Render logs for backend errors
3. Verify all env variables are set

---

## 📝 Environment Variables Summary

### Backend (.env or Render dashboard):
```
MONGODB_URL=<your-atlas-url>
DATABASE_NAME=Nike
SECRET_KEY=<your-secret-key>
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
HOST=0.0.0.0
PORT=10000
CORS_ORIGINS=["https://nike-webpage.onrender.com","http://localhost:5173"]
```

### Frontend (.env.production or Render dashboard):
```
VITE_API_URL=https://nike-backend.onrender.com
```

---

## 🔄 Update & Redeploy

After making code changes:

1. **Commit and push**:
   ```bash
   git add .
   git commit -m "Update API URLs for production"
   git push origin master
   ```

2. **Render auto-deploys** on push (if enabled)
   - Or manually click "Deploy latest commit" in Render dashboard

---

## ✅ Verify Deployment

1. **Backend health check**: 
   Visit `https://nike-backend.onrender.com/health`
   Should return: `{"status":"healthy"}`

2. **Backend API docs**: 
   Visit `https://nike-backend.onrender.com/docs`
   Should show Swagger UI

3. **Frontend**: 
   Visit `https://nike-webpage.onrender.com`
   Should load Nike homepage

4. **Test features**:
   - Browse products ✓
   - Signup/Login ✓
   - Add to cart ✓
   - Checkout ✓

---

## 💡 Pro Tips

1. **Free tier limitations**:
   - Services spin down after 15 min of inactivity
   - First request after sleep takes ~30 seconds
   - Upgrade to paid plan for always-on

2. **MongoDB Atlas**:
   - Free tier: 512MB storage
   - Set up backups in Atlas dashboard

3. **Environment variables**:
   - Never commit `.env` files
   - Use Render dashboard for production secrets

4. **Logs**:
   - View real-time logs in Render dashboard
   - Useful for debugging production issues

---

## 🎯 Next Steps

- [ ] Update all API URLs to use `${API_URL}`
- [ ] Push changes to GitHub
- [ ] Verify both services are running on Render
- [ ] Test signup/login on production
- [ ] Test cart and checkout flow
- [ ] Set up custom domain (optional)

---

**Need help?** Check the error logs in Render dashboard or browser console!
