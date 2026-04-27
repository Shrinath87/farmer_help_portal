import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiWheat } from 'react-icons/gi';
import { FiMenu, FiX, FiLogOut, FiSun, FiMoon } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Crop Prices', path: '/crop-prices' },
    { label: 'Weather', path: '/weather' },
    { label: 'Fertilizer', path: '/fertilizer' },
    { label: 'Schemes', path: '/schemes' },
    { label: 'Disease Detection', path: '/disease-detection' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-primary-green text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl hover:text-light-green transition">
            <GiWheat className="text-2xl" />
            <span className="hidden sm:inline">Farmer Help Portal</span>
            <span className="sm:hidden">FHP</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="hover:text-light-green transition font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-secondary-green rounded-lg transition"
              title="Toggle theme"
            >
              {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {/* Auth Links */}
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="hidden sm:inline px-4 py-2 bg-secondary-green rounded-lg hover:bg-accent-orange transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-accent-orange rounded-lg hover:bg-yellow-600 transition"
                >
                  <FiLogOut /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden sm:inline px-4 py-2 border-2 border-light-green rounded-lg hover:bg-light-green hover:text-primary-green transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hidden sm:inline px-4 py-2 bg-secondary-green rounded-lg hover:bg-accent-orange transition"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-secondary-green rounded-lg transition"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-secondary-green">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block px-4 py-2 hover:bg-secondary-green rounded transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-secondary-green rounded transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-secondary-green rounded transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2 hover:bg-secondary-green rounded transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 hover:bg-secondary-green rounded transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
