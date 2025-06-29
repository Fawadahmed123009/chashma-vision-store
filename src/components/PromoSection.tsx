
import React from 'react';
import { Link } from 'react-router-dom';

const PromoSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-navy to-navy/90">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Limited Time Offers
            </h2>
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gold mb-2">
                  First Frame Free
                </h3>
                <p className="text-gray-200 mb-4">
                  Get your first prescription frame absolutely free with any lens purchase over PKR 5,000
                </p>
                <Link to="/shop" className="inline-block bg-gold text-navy px-6 py-2 rounded-lg font-medium hover:bg-gold/90 transition-colors">
                  Claim Offer
                </Link>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gold mb-2">
                  Student Discount
                </h3>
                <p className="text-gray-200 mb-4">
                  20% off for students with valid ID. Perfect for campus life!
                </p>
                <Link to="/shop" className="inline-block bg-gold text-navy px-6 py-2 rounded-lg font-medium hover:bg-gold/90 transition-colors">
                  Shop Student
                </Link>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
              alt="Special offers on eyewear"
              className="w-full h-96 object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute -top-6 -right-6 bg-gold text-navy rounded-full w-24 h-24 flex items-center justify-center font-bold text-lg shadow-lg">
              50% OFF
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
