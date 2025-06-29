
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-navy mb-6">
                Get In Touch
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Have questions about our frames? Need help with your prescription? 
                We're here to help you find the perfect eyewear solution.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-navy mb-6">
                    Visit Our Stores
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-md">
                      <h3 className="text-xl font-semibold text-navy mb-3">Karachi Flagship Store</h3>
                      <p className="text-gray-600 mb-2">Shahrah-e-Faisal, Block 6, PECHS</p>
                      <p className="text-gray-600 mb-2">Karachi, Sindh 75400</p>
                      <p className="text-gray-600 mb-2">Phone: +92 21 3456 7890</p>
                      <p className="text-gray-600">Mon-Sat: 10AM-9PM | Sun: 2PM-8PM</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-md">
                      <h3 className="text-xl font-semibold text-navy mb-3">Lahore Store</h3>
                      <p className="text-gray-600 mb-2">MM Alam Road, Gulberg III</p>
                      <p className="text-gray-600 mb-2">Lahore, Punjab 54660</p>
                      <p className="text-gray-600 mb-2">Phone: +92 42 3456 7890</p>
                      <p className="text-gray-600">Mon-Sat: 11AM-10PM | Sun: 3PM-9PM</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-navy mb-4">Quick Contact</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                        <span className="text-navy font-bold">📞</span>
                      </div>
                      <div>
                        <p className="font-medium text-navy">Customer Service</p>
                        <p className="text-gray-600">+92 300 1234567</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                        <span className="text-navy font-bold">📧</span>
                      </div>
                      <div>
                        <p className="font-medium text-navy">Email Support</p>
                        <p className="text-gray-600">hello@chashmaco.pk</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">💬</span>
                      </div>
                      <div>
                        <p className="font-medium text-navy">WhatsApp</p>
                        <p className="text-gray-600">+92 300 1234567</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-navy mb-6">Send us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                        placeholder="+92 300 1234567"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                      >
                        <option value="">Select subject</option>
                        <option value="product-inquiry">Product Inquiry</option>
                        <option value="prescription-help">Prescription Help</option>
                        <option value="order-status">Order Status</option>
                        <option value="return-exchange">Return/Exchange</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-navy mb-4">Find Us</h2>
              <p className="text-gray-600">Visit our stores for personalized fitting and consultation</p>
            </div>
            
            <div className="bg-gray-300 h-96 rounded-2xl flex items-center justify-center">
              <p className="text-gray-600">Interactive Map Coming Soon</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
