import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-green to-secondary-green flex items-center justify-center px-4">
      <div className="text-center text-white">
        <div className="text-8xl font-bold mb-4">404</div>
        <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
        <p className="text-lg text-light-green mb-8">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/" className="btn-secondary">
            Go to Home
          </Link>
          <Link to="/crop-prices" className="btn-outline">
            Explore Features
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
