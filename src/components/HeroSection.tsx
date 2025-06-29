
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-navy leading-tight">
              Where Vision
              <span className="text-gold block">Meets Style</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Discover premium eyewear crafted for the modern Pakistani lifestyle. 
              From prescription glasses to designer sunglasses, find your perfect frames.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop" className="btn-primary text-center">
                Shop Now
              </Link>
              <Link to="/about" className="btn-secondary text-center">
                Our Story
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-slide-up">
            <div className="bg-gradient-to-br from-gold/20 to-navy/20 rounded-2xl p-8">
              <img
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop"
                alt="Stylish eyewear collection"
                className="w-full h-96 object-cover rounded-xl shadow-2xl"
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-navy rounded-full opacity-10 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
