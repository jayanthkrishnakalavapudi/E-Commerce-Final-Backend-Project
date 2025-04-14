// src/App.js
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/shared/PrivateRoute';
import Navbar from './components/shared/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProductList from './components/products/ProductList';
import ProductDetail from './components/products/ProductDetail';
import WeatherRecommendations from './components/products/WeatherRecommendations';
import OrderList from './components/orders/OrderList';
import CreateOrder from './components/orders/CreateOrder';
import CategoryList from './components/categories/CategoryList';
import Profile from './components/auth/Profile';
import UpdateProfile from './components/auth/UpdateProfile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/recommendations" element={<WeatherRecommendations />} />
            
            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/orders" element={<OrderList />} />
              <Route path="/orders/new" element={<CreateOrder />} />
              <Route path="/categories" element={<CategoryList />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/update" element={<UpdateProfile />} />
            </Route>
          </Routes>
        </div>
        <ToastContainer />
      </div>
    </AuthProvider>
  );
}

export default App;