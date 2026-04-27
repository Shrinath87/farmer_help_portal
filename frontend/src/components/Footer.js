import React from 'react';
import { Link } from 'react-router-dom';
import { GiWheat } from 'react-icons/gi';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-green text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <GiWheat className="text-3xl" />
              <span className="font-bold text-lg">Farmer Help Portal</span>
            </div>
            <p className="text-light-green">
              Empowering farmers with AI-powered technology for better agricultural outcomes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-light-green transition">Home</Link></li>
              <li><Link to="/crop-prices" className="hover:text-light-green transition">Crop Prices</Link></li>
              <li><Link to="/weather" className="hover:text-light-green transition">Weather</Link></li>
              <li><Link to="/disease-detection" className="hover:text-light-green transition">Disease Detection</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/fertilizer" className="hover:text-light-green transition">Fertilizer Guide</Link></li>
              <li><Link to="/schemes" className="hover:text-light-green transition">Government Schemes</Link></li>
              <li><Link to="/contact" className="hover:text-light-green transition">Contact Us</Link></li>
              <li><a href="#faq" className="hover:text-light-green transition">FAQ</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#facebook" className="hover:text-light-green transition"><FiFacebook size={24} /></a>
              <a href="#twitter" className="hover:text-light-green transition"><FiTwitter size={24} /></a>
              <a href="#instagram" className="hover:text-light-green transition"><FiInstagram size={24} /></a>
              <a href="#linkedin" className="hover:text-light-green transition"><FiLinkedin size={24} /></a>
            </div>
          </div>
        </div>

        <hr className="border-secondary-green my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-light-green">
            &copy; {currentYear} Farmer Help Portal. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#privacy" className="text-light-green hover:text-white transition">Privacy Policy</a>
            <a href="#terms" className="text-light-green hover:text-white transition">Terms of Service</a>
            <a href="#contact" className="text-light-green hover:text-white transition">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
