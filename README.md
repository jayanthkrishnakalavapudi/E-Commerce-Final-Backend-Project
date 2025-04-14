# **E-Commerce Weather Recommendation System**

## **Table of Contents**
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [API Documentation](#api-documentation)
7. [Frontend Usage](#frontend-usage)
8. [Testing](#testing)
9. [Deployment](#deployment)
10. [Troubleshooting](#troubleshooting)
11. [Future Improvements](#future-improvements)

---

## **Project Overview**
A full-stack e-commerce platform with weather-based product recommendations. The system integrates with OpenWeather API to suggest products based on current weather conditions at specified locations.

Key Components:
- **Backend**: Node.js/Express API with MongoDB
- **Frontend**: React.js with Material-UI
- **Weather Integration**: OpenWeather API
- **Authentication**: JWT-based

---

## **Features**
### **Backend**
- User authentication (register/login)
- Product management (CRUD operations)
- Weather-based recommendations
- Order processing
- Category management

### **Frontend**
- User registration/login
- Product browsing
- Weather-based recommendations
- Order history
- Responsive design

### **Special Features**
- Real-time weather integration
- Internal + external product recommendations
- Location-based suggestions
- Secure authentication

---

## **Technology Stack**
### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Atlas)
- **Authentication**: JWT
- **API Documentation**: Swagger/OpenAPI
- **External API**: OpenWeatherMap

### **Frontend**
- **Framework**: React.js
- **UI Library**: Material-UI
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Notifications**: react-toastify

---

## **Installation**
### **Prerequisites**
- Node.js (v16+)
- MongoDB Atlas account
- OpenWeatherMap API key

### **Backend Setup**
```bash
# Clone repository
git clone https://github.com/your-repo/ecommerce-weather.git
cd ecommerce-weather/ecommerce-weather-backend-

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Frontend Setup**
```bash
cd ../ecommerce-frontend
npm install
npm start
```

---

## **Configuration**
### **Environment Variables (`.env`)**
```env
MONGODB_URI=mongodb://jayanth:admin1234@cluster0-shard-00-00.k57vc.mongodb.net:27017,cluster0-shard-00-01.k57vc.mongodb.net:27017,cluster0-shard-00-02.k57vc.mongodb.net:27017/ecommerce-weather?replicaSet=atlas-11ojdn-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0
PORT=5000
JWT_SECRET=9ed8f4ab3ee0e2f72b7ce8a62e782ccbebb1e4ff97115552148ae8e0bb0bfbf8
OPENWEATHER_API_KEY=6397f25b58cc24fd3df062d4466ab597
```

### **Database Setup**
1. Ensure your MongoDB Atlas cluster is running
2. Verify connection string in `.env`
3. Sample data will be auto-generated on first run

---

## **API Documentation**
Access Swagger UI at `http://localhost:5000/api-docs`

### **Key Endpoints**
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/users/register` | POST | User registration |
| `/api/users/login` | POST | User login |
| `/api/products` | GET | Get all products |
| `/api/products/recommendations/weather` | GET | Weather-based recommendations |
| `/api/orders` | POST | Create new order |

---

## **Frontend Usage**
### **Available Routes**
- `/` - Homepage
- `/login` - User login
- `/register` - User registration
- `/products` - Product listings
- `/recommendations` - Weather recommendations
- `/orders` - Order history

### **Weather Recommendations**
1. Enter latitude/longitude or select sample location
2. Click "Get Recommendations"
3. View products matching current weather

---

## **Testing**
### **Backend Tests**
```bash
cd backend
npm test
```

### **Frontend Manual Testing**
1. Test all user flows:
   - Registration → Login → Product browsing → Order creation
   - Weather recommendations with different locations
2. Verify error handling:
   - Invalid credentials
   - Missing form fields
   - API failures

---

## **Deployment**
### **Backend**
```bash
# Production build
npm run build

# Start production server
npm start
```

### **Frontend**
```bash
npm run build
# Deploy build/ folder to your hosting provider
```

Recommended hosting:
- **Backend**: Heroku, Render, AWS
- **Frontend**: Vercel, Netlify
- **Database**: MongoDB Atlas

---

## **Troubleshooting**
### **Common Issues**
1. **Connection Errors**:
   - Verify MongoDB Atlas IP whitelisting
   - Check `.env` configuration

2. **Weather API Failures**:
   - Ensure OpenWeather API key is valid
   - Check network connectivity

3. **Empty Recommendations**:
   - Verify products have correct `weatherTags`
   - Test with known locations (e.g., New York)

### **Debugging Tips**
```bash
# Check backend logs
console.log() in critical routes

# Frontend debugging
Use browser developer tools
```

---

## **Future Improvements**
1. **Enhanced Recommendations**:
   - Machine learning for personalized suggestions
   - More partner integrations

2. **Additional Features**:
   - Product reviews/ratings
   - Payment gateway integration
   - Advanced search/filters

3. **Performance**:
   - Caching for weather data
   - Database indexing optimization

---

## **License**
MIT License - Free for educational and commercial use

## **Contact**
For support or contributions, please contact:   
[GitHub Repository](https://github.com/your-repo/ecommerce-weather)