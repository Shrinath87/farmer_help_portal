# Quick Start Guide - Farmer Help Portal

Get up and running with Farmer Help Portal in 5 minutes!

## ⚡ Quick Setup

### 1. Clone/Extract the project
```bash
cd farmer-help-portal
```

### 2. Backend Setup (Terminal 1)
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```
✅ Backend runs on `http://localhost:5000`

### 3. Frontend Setup (Terminal 2)
```bash
cd frontend
npm install
npm start
```
✅ Frontend runs on `http://localhost:3000`

## 📱 Testing the Application

### Test Account (Farmer)
- Email: `demo@farmerhelp.com`
- Password: `password123`

### Test Account (Admin)
- Email: `admin@farmerhelp.com`
- Password: `admin123`

## 🎯 Features to Test

### 1. **Homepage** (`/`)
- View hero section with features overview
- Browse feature cards and benefits

### 2. **Authentication** (`/login`, `/register`)
- Register new farmer account
- Login with credentials
- Update farmer profile

### 3. **Crop Prices** (`/crop-prices`)
- View real-time crop prices
- Filter by crop and state
- View price trends with charts

### 4. **Weather** (`/weather`)
- Get current weather
- View 7-day forecast
- See weather alerts
- Click "Use My Location" to get local weather

### 5. **Fertilizer** (`/fertilizer`)
- Select crop type, soil type, growth stage
- Get AI fertilizer recommendations
- View NPK composition and application details

### 6. **Government Schemes** (`/schemes`)
- Browse all government schemes
- Filter by category and state
- View eligibility and benefits

### 7. **Disease Detection** (`/disease-detection`)
- Upload a crop/leaf image
- AI analyzes and detects diseases
- View symptoms, treatment, and prevention tips

### 8. **Dashboard** (`/dashboard`) [Login Required]
- View personalized farmer dashboard
- See quick stats and recent activities
- Access quick links to features

### 9. **Contact** (`/contact`)
- Fill out contact form
- View FAQ section
- Get support information

### 10. **Admin Panel** (`/admin`) [Admin Login Required]
- View dashboard statistics
- Manage crop prices
- Manage government schemes
- Monitor disease records

## 🗂️ Key Files to Explore

### Backend
- `backend/server.js` - Express server configuration
- `backend/src/models/` - Database schemas
- `backend/src/controllers/` - API business logic
- `backend/src/routes/` - API endpoints

### Frontend
- `frontend/src/App.js` - Main React application
- `frontend/src/pages/` - Page components
- `frontend/src/components/` - Reusable components
- `frontend/src/context/` - Global state management
- `frontend/src/services/api.js` - API client

## 🎨 Customization

### Change Brand Colors
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  'primary-green': '#2D5016',
  'secondary-green': '#6BA52F',
  'light-green': '#A4D65E',
  'accent-orange': '#FF9500',
  'accent-yellow': '#FFD700',
}
```

### Add New Pages
1. Create component in `frontend/src/pages/`
2. Add route to `frontend/src/App.js`
3. Add navigation link to `frontend/src/components/Navbar.js`

### Add New API Endpoints
1. Create model in `backend/src/models/`
2. Create controller in `backend/src/controllers/`
3. Create routes in `backend/src/routes/`
4. Register routes in `backend/server.js`

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Default: `mongodb://localhost:27017/farmer-help-portal`

### Port Already in Use
```bash
# Change port in backend/.env
PORT=5001

# Or kill existing process
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -i :5000
```

### CORS Errors
- Backend runs on port 5000
- Frontend runs on port 3000
- CORS is already configured in `backend/server.js`

### Module Not Found
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

## 📚 API Testing with Postman

### Register Farmer
```
POST http://localhost:5000/api/auth/register
Body (JSON):
{
  "name": "John Farmer",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210",
  "state": "Karnataka"
}
```

### Login
```
POST http://localhost:5000/api/auth/login
Body (JSON):
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Crop Prices
```
GET http://localhost:5000/api/crops?cropName=rice&state=Karnataka
```

### Get Weather
```
GET http://localhost:5000/api/weather/current?latitude=13.0827&longitude=80.2707
```

## 🧪 Mock Data

The application includes pre-configured mock data for:
- Disease detection (random disease selection)
- Weather forecasts (7-day data)
- Price trends (30-day historical data)

To add real data:
1. Integrate weather API (OpenWeatherMap)
2. Integrate commodity price API
3. Train ML model for disease detection

## 📦 Deployment Preparation

### Before Deploying:
1. Update `.env` variables
2. Set `NODE_ENV=production`
3. Build frontend: `npm run build`
4. Set database to cloud MongoDB
5. Configure CORS for production domain

### Deployment Commands:
```bash
# Build frontend
cd frontend && npm run build

# Deploy backend to Heroku
git push heroku main

# Deploy frontend to Vercel
vercel --prod
```

## 🆘 Need Help?

Check out the full documentation in `README.md` or contact support at support@farmerhelp.com

---

Happy farming! 🌾
