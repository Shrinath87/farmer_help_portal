# System Architecture & Design Documentation

## 📊 System Overview

Farmer Help Portal is a full-stack web application with the following architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                     User/Browser                            │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│         React Frontend (Port 3000)                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Pages: Home, Prices, Weather, Fertilizer, etc.    │   │
│  │  Components: Navbar, Footer, Forms                 │   │
│  │  Context: AuthContext, ThemeContext               │   │
│  │  Services: API client with Axios                  │   │
│  └──────────────────────────────────────────────────────┘   │
│                        ↓ (REST API)                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│         Express Backend (Port 5000)                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Routes:                                            │   │
│  │  - /api/auth       (Authentication)                │   │
│  │  - /api/crops      (Crop Prices)                   │   │
│  │  - /api/weather    (Weather Data)                  │   │
│  │  - /api/fertilizer (Fertilizer Recommendations)   │   │
│  │  - /api/schemes    (Government Schemes)           │   │
│  │  - /api/disease    (Disease Detection)            │   │
│  │                                                     │   │
│  │  Controllers: Business Logic Layer                │   │
│  │  Models: MongoDB Schemas                          │   │
│  │  Middleware: Auth, Validation                     │   │
│  └──────────────────────────────────────────────────────┘   │
│                        ↓ (Database Query)                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│         MongoDB Database                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Collections:                                       │   │
│  │  - farmers     (User accounts)                     │   │
│  │  - cropprices  (Market prices)                     │   │
│  │  - schemes     (Government schemes)                │   │
│  │  - fertilizers (Fertilizer database)               │   │
│  │  - diseasedetections (Detection records)          │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## 🏗️ Layered Architecture

### Frontend Architecture (MVC Pattern)

```
View Layer (Components)
├── Pages (Route Components)
│   ├── Home
│   ├── CropPrices
│   ├── Weather
│   ├── Fertilizer
│   ├── Schemes
│   ├── DiseaseDetection
│   ├── Dashboard
│   ├── AdminPanel
│   ├── Contact
│   ├── Login
│   └── Register
├── Components (Reusable)
│   ├── Navbar
│   └── Footer
└── Context (State Management)
    ├── AuthContext
    └── ThemeContext

Model/Logic Layer
└── Services
    └── api.js (Axios client & API calls)

Styling
└── styles/index.css (Tailwind + Custom)
```

### Backend Architecture (MVC Pattern)

```
Routing Layer
├── authRoutes.js
├── cropRoutes.js
├── weatherRoutes.js
├── fertilizerRoutes.js
├── schemeRoutes.js
└── diseaseRoutes.js
        ↓
Middleware Layer
├── authMiddleware.js (JWT Verification)
└── multer (File Upload Handling)
        ↓
Controller Layer (Business Logic)
├── authController.js (Authentication)
├── cropController.js (Price Management)
├── weatherController.js (Weather Data)
├── fertilizerController.js (Fertilizer Recommendations)
├── schemeController.js (Scheme Management)
└── diseaseController.js (Disease Detection)
        ↓
Model Layer (Data Schema)
├── Farmer.js (User Schema)
├── CropPrice.js (Price Schema)
├── Scheme.js (Scheme Schema)
├── Fertilizer.js (Fertilizer Schema)
├── DiseaseDetection.js (Detection Schema)
└── Database (MongoDB)
```

## 🔐 Authentication Flow

```
User Login/Register
        ↓
┌──────────────────────────────┐
│ authController.register()    │
│ authController.login()        │
└──────────────────────────────┘
        ↓
┌──────────────────────────────┐
│ Password Hashing (bcryptjs)  │
│ Token Generation (JWT)        │
└──────────────────────────────┘
        ↓
┌──────────────────────────────┐
│ Return token + user data     │
│ Save to localStorage         │
└──────────────────────────────┘
        ↓
Protected Requests with:
Authorization: Bearer <JWT_TOKEN>
        ↓
authMiddleware.js verifies token
```

## 📱 Component Hierarchy

```
App
├── Navbar
│   ├── Logo
│   ├── Nav Links
│   ├── Theme Toggle
│   └── Auth Buttons
├── Routes
│   ├── Home Page
│   ├── Crop Prices Page
│   ├── Weather Page
│   ├── Fertilizer Page
│   ├── Schemes Page
│   ├── Disease Detection Page
│   ├── Dashboard Page
│   ├── Admin Panel
│   ├── Contact Page
│   ├── Login Page
│   └── Register Page
└── Footer
    ├── Links Section
    ├── Social Media
    └── Copyright
```

## 🗄️ Database Schema

### Farmer Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  location: {
    state: String,
    district: String,
    village: String,
    latitude: Number,
    longitude: Number
  },
  crops: [String],
  soilType: String,
  farmSize: Number,
  userType: String (farmer/admin),
  profileImage: String,
  savedCrops: [String],
  priceWatchlist: [String],
  diseaseHistory: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### CropPrice Collection
```javascript
{
  _id: ObjectId,
  cropName: String,
  market: String,
  state: String,
  minPrice: Number,
  maxPrice: Number,
  avgPrice: Number,
  priceUnit: String,
  date: Date,
  trend: String (up/down/stable),
  priceHistory: [{ date: Date, price: Number }],
  createdAt: Date
}
```

### Scheme Collection
```javascript
{
  _id: ObjectId,
  schemeName: String,
  description: String,
  ministry: String,
  eligibility: [String],
  benefits: [String],
  subsidyPercentage: Number,
  applicationDeadline: Date,
  applicationLink: String,
  documentRequired: [String],
  fundingAmount: String,
  targetBeneficiary: String,
  state: [String],
  category: String,
  status: String,
  createdAt: Date,
  updatedAt: Date
}
```

### DiseaseDetection Collection
```javascript
{
  _id: ObjectId,
  farmerId: ObjectId (ref: Farmer),
  imageUrl: String,
  cropType: String,
  detectedDisease: {
    diseaseName: String,
    confidenceScore: Number,
    symptoms: [String],
    treatment: String,
    preventionTips: [String],
    severity: String
  },
  remarks: String,
  status: String,
  verifiedBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔄 Data Flow Example: Crop Price Lookup

```
1. User visits /crop-prices
↓
2. CropPrices component mounts, calls fetchPrices()
↓
3. API call: cropAPI.getAllCrices({ cropName, state })
↓
4. Axios sends: GET /api/crops?cropName=rice&state=Karnataka
↓
5. Backend Route Handler (cropRoutes.js)
↓
6. Controller (cropController.getAllCropPrices)
↓
7. MongoDB Query: CropPrice.find(filter)
↓
8. Data returned to Frontend
↓
9. State updated with setPrice()
↓
10. Recharts displays price trends
```

## 🔐 Security Measures

### Frontend Security
- JWT token stored in localStorage
- CORS headers configured
- Input validation before sending
- Protected routes behind AuthContext

### Backend Security
- Password hashing with bcryptjs (10 rounds)
- JWT token verification on protected routes
- Input validation with express-validator
- Multer file upload restrictions
- Environment variables for sensitive data
- Role-based access control (farmer/admin)

## 🚀 Scalability Considerations

### Current Implementation (MVP)
- Single MongoDB instance
- Express server handling requests synchronously
- In-memory file uploads

### Future Improvements for Scale
1. **Caching**: Redis for frequently accessed data
2. **Load Balancing**: Nginx for multiple server instances
3. **Database**: Sharding/Replication for MongoDB
4. **CDN**: CloudFront for static assets
5. **Message Queue**: Bull/RabbitMQ for async tasks
6. **Microservices**: Separate services for AI/ML tasks
7. **Search**: Elasticsearch for full-text search

## 🧪 Testing Strategy

### Frontend Testing Areas
- Component rendering
- User interactions
- API integration
- Form validation

### Backend Testing Areas
- API endpoint functionality
- Database operations
- Authentication flow
- Input validation
- Error handling

## 📈 Performance Optimization

### Frontend Optimizations
- Code splitting with React.lazy()
- Image optimization
- Memoization with useMemo, useCallback
- Virtual scrolling for large lists

### Backend Optimizations
- Database indexing on frequently queried fields
- Query optimization with select()
- Pagination for large datasets
- Caching strategies
- Compression with gzip

## 🔌 Integration Points

### Third-party Services (Optional)
- OpenWeatherMap API (Real weather data)
- RapidAPI Commodity Prices (Real market data)
- Cloudinary (Image storage)
- SendGrid (Email notifications)
- Twilio (SMS alerts)

### AI/ML Integration Points
- Plant disease detection model (TensorFlow.js / Python API)
- Fertilizer recommendation engine
- Price prediction model

## 📊 API Response Examples

### Successful Response
```json
{
  "message": "Success message",
  "data": {}
}
```

### Error Response
```json
{
  "error": "Error message"
}
```

### Authentication Response
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "farmer": {
    "id": "123abc",
    "name": "John Farmer",
    "email": "john@example.com",
    "userType": "farmer"
  }
}
```

## 🎯 Future Roadmap

### Phase 1 (Current - MVP)
- ✅ Core features
- ✅ Authentication
- ✅ Basic UI/UX

### Phase 2
- [ ] Mobile app (React Native)
- [ ] Real API integrations
- [ ] Multi-language support
- [ ] Voice assistant

### Phase 3
- [ ] Advanced Analytics
- [ ] ML-based predictions
- [ ] Farmer community features
- [ ] Video tutorials

### Phase 4
- [ ] IoT sensor integration
- [ ] Blockchain for supply chain
- [ ] Advanced payments
- [ ] Partner marketplace

---

This architecture is designed to be scalable, maintainable, and user-friendly for agricultural professionals.
