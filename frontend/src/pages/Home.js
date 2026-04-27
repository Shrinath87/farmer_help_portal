import React from 'react';
import { Link } from 'react-router-dom';
import { GiPlantRoots, GiSunflower, GiThermometerScale, GiCastle, GiMicroscope, GiBullseye } from 'react-icons/gi';
import { BiBarChart } from 'react-icons/bi';

const Home = () => {
  const features = [
    {
      icon: <BiBarChart size={40} />,
      title: 'Crop Prices',
      description: 'Real-time market prices with trends and analysis',
      link: '/crop-prices',
    },
    {
      icon: <GiThermometerScale size={40} />,
      title: 'Weather Forecast',
      description: 'Location-based weather predictions with alerts',
      link: '/weather',
    },
    {
      icon: <GiPlantRoots size={40} />,
      title: 'Fertilizer Guide',
      description: 'AI-powered fertilizer recommendations',
      link: '/fertilizer',
    },
    {
      icon: <GiCastle size={40} />,
      title: 'Government Schemes',
      description: 'Latest benefits and subsidies for farmers',
      link: '/schemes',
    },
    {
      icon: <GiMicroscope size={40} />,
      title: 'Disease Detection',
      description: 'AI-powered plant disease identification',
      link: '/disease-detection',
    },
    {
      icon: <GiBullseye size={40} />,
      title: 'Farmer Dashboard',
      description: 'Personalized dashboard with recommendations',
      link: '/dashboard',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-green to-secondary-green text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Welcome to Farmer Help Portal
              </h1>
              <p className="text-lg md:text-xl mb-8 text-light-green">
                Your AI-powered companion for modern farming. Get real-time market prices, weather forecasts, fertilizer guidance, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/crop-prices"
                  className="btn-primary text-center"
                >
                  Explore Features
                </Link>
                <Link
                  to="/register"
                  className="btn-secondary text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative h-96 bg-light-green rounded-lg opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center">Our Services</h2>
          <p className="section-subtitle text-center">
            Comprehensive tools designed for Indian farmers
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link key={index} to={feature.link}>
                <div className="card cursor-pointer transform hover:scale-105 transition">
                  <div className="text-secondary-green mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-primary-green mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                  <div className="mt-4 text-secondary-green font-semibold">
                    Learn More →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center">Why Choose Farmer Help Portal?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="card text-center">
              <div className="text-4xl mb-4 text-accent-orange">📱</div>
              <h3 className="text-xl font-bold text-primary-green mb-2">
                Mobile-Friendly
              </h3>
              <p className="text-gray-600">
                Access Farmer Help Portal on any device, anytime, anywhere.
              </p>
            </div>

            <div className="card text-center">
              <div className="text-4xl mb-4 text-accent-orange">🤖</div>
              <h3 className="text-xl font-bold text-primary-green mb-2">
                AI-Powered
              </h3>
              <p className="text-gray-600">
                Smart recommendations based on your crops and location.
              </p>
            </div>

            <div className="card text-center">
              <div className="text-4xl mb-4 text-accent-orange">🌍</div>
              <h3 className="text-xl font-bold text-primary-green mb-2">
                Real-Time Updates
              </h3>
              <p className="text-gray-600">
                Get instant notifications for prices, weather, and alerts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary-green text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-lg mb-8 text-light-green">
            Join thousands of farmers using Farmer Help Portal
          </p>
          <Link to="/register" className="btn-secondary inline-block">
            Sign Up Today
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {[
              {
                q: 'Is Farmer Help Portal free to use?',
                a: 'Yes, our basic features are completely free. We also offer premium features for advanced analytics.',
              },
              {
                q: 'Do you provide crop price information for all states?',
                a: 'Yes, we cover major agricultural markets across all Indian states and union territories.',
              },
              {
                q: 'How accurate is the disease detection?',
                a: 'Our AI model has been trained on thousands of crop images and achieves 85%+ accuracy. Always consult experts for critical decisions.',
              },
              {
                q: 'Can I use this on mobile?',
                a: 'Absolutely! Farmer Help Portal is fully responsive and works seamlessly on phones and tablets.',
              },
            ].map((faq, index) => (
              <div key={index} className="card">
                <h3 className="font-bold text-primary-green mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
