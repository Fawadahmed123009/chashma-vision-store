
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-background to-secondary overflow-hidden min-h-[80vh] flex items-center">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="relative">
          {/* Hero Video Background */}
          <div className="relative animate-slide-up">
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-6 lg:p-8">
              <video
                className="w-full h-80 lg:h-[600px] object-cover rounded-xl shadow-2xl"
                autoPlay
                muted
                loop
                playsInline
                poster="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop&fm=webp&q=80"
              >
                <source src="/hero.mp4" type="video/mp4" />
                <source src="hero2.mp4" type="video/mp4" />
                {/* Fallback image if video doesn't load */}
                <img
                  src="/heroimg.jpg"
                  alt="Stylish eyewear collection"
                  className="w-full h-80 lg:h-[600px] object-cover rounded-xl shadow-2xl"
                />
              </video>
              
              {/* Overlay Content */}
              <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
                <div className="text-center space-y-8 animate-fade-in px-6">
                  <h1 className="font-bold text-white leading-tight text-4xl md:text-5xl lg:text-6xl">
                    Where Vision
                    <span className="text-accent block">Meets Style</span>
                  </h1>
                  <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                    Discover premium eyewear crafted for the modern Pakistani lifestyle. 
                    From prescription glasses to designer sunglasses, find your perfect frames.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link to="/shop" className="btn-primary text-center">
                      Shop Now
                    </Link>
                    <Link to="/about" className="btn-secondary text-center">
                      Our Story
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 lg:w-24 lg:h-24 bg-accent rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 lg:w-32 lg:h-32 bg-primary rounded-full opacity-10 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
