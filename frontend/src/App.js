import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/index.css';

// Context
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import CropPrices from './pages/CropPrices';
import Weather from './pages/Weather';
import Fertilizer from './pages/Fertilizer';
import Schemes from './pages/Schemes';
import DiseaseDetection from './pages/DiseaseDetection';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/crop-prices" element={<CropPrices />} />
                <Route path="/weather" element={<Weather />} />
                <Route path="/fertilizer" element={<Fertilizer />} />
                <Route path="/schemes" element={<Schemes />} />
                <Route path="/disease-detection" element={<DiseaseDetection />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <ToastContainer position="bottom-right" autoClose={3000} />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
