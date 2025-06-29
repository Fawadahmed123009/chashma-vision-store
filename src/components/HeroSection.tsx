
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white overflow-hidden min-h-[80vh] flex items-center">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in text-center lg:text-left">
            <h1 className="font-bold text-navy leading-tight">
              Where Vision
              <span className="text-gold block">Meets Style</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Discover premium eyewear crafted for the modern Pakistani lifestyle. 
              From prescription glasses to designer sunglasses, find your perfect frames.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <Link to="/shop" className="btn-primary text-center">
                Shop Now
              </Link>
              <Link to="/about" className="btn-secondary text-center">
                Our Story
              </Link>
            </div>
          </div>

          {/* Hero Video */}
          <div className="relative animate-slide-up">
            <div className="bg-gradient-to-br from-gold/20 to-navy/20 rounded-2xl p-6 lg:p-8">
              <video
                className="w-full h-80 lg:h-96 object-cover rounded-xl shadow-2xl"
                autoPlay
                muted
                loop
                playsInline
                poster="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop&fm=webp&q=80"
              >
                <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4" />
                <source src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4" type="video/mp4" />
                {/* Fallback image if video doesn't load */}
                <img
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop&fm=webp&q=80"
                  alt="Stylish eyewear collection"
                  className="w-full h-80 lg:h-96 object-cover rounded-xl shadow-2xl"
                />
              </video>
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 lg:w-24 lg:h-24 bg-gold rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 lg:w-32 lg:h-32 bg-navy rounded-full opacity-10 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
