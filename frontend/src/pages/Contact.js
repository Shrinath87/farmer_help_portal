import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="section-title">Contact & Support</h1>
          <p className="section-subtitle">
            We're here to help! Reach out with any questions or concerns
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info */}
          <div className="card">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-secondary-green bg-opacity-20 p-3 rounded-lg">
                <FiMail className="text-2xl text-secondary-green" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-primary-green">support@farmerhelp.com</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-secondary-green bg-opacity-20 p-3 rounded-lg">
                <FiPhone className="text-2xl text-secondary-green" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Helpline</p>
                <p className="font-semibold text-primary-green">1800-123-4567</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-secondary-green bg-opacity-20 p-3 rounded-lg">
                <FiMapPin className="text-2xl text-secondary-green" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Office</p>
                <p className="font-semibold text-primary-green">New Delhi, India</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="card">
            <h2 className="text-2xl font-bold text-primary-green mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="label-field">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="label-field">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="label-field">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="10-digit phone"
                />
              </div>

              <div>
                <label className="label-field">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Message subject"
                  required
                />
              </div>

              <div>
                <label className="label-field">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="input-field h-32 resize-none"
                  placeholder="Your message..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <FiSend /> {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* FAQ */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-2xl font-bold text-primary-green mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  {
                    q: 'How do I reset my password?',
                    a: 'Click on "Forgot Password" on the login page and follow the instructions sent to your email.',
                  },
                  {
                    q: 'Is there a mobile app?',
                    a: 'Yes, mobile apps for iOS and Android are available on app stores.',
                  },
                  {
                    q: 'How often is price data updated?',
                    a: 'Market prices are updated twice daily from official agricultural markets.',
                  },
                  {
                    q: 'Can I download reports?',
                    a: 'Yes, you can download weather reports and price trends as PDF files.',
                  },
                ].map((faq, idx) => (
                  <details key={idx} className="group border-b pb-4">
                    <summary className="font-semibold text-primary-green cursor-pointer hover:text-secondary-green transition">
                      {faq.q}
                    </summary>
                    <p className="text-gray-700 mt-2 text-sm">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>

            <div className="card bg-secondary-green text-white">
              <h3 className="text-lg font-bold mb-2">📞 Available Support Hours</h3>
              <p className="text-sm text-light-green mb-4">
                Our support team is available Monday to Saturday, 9:00 AM to 6:00 PM IST.
              </p>
              <p className="text-xs text-light-green opacity-75">
                Emergency agricultural support available 24/7
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
