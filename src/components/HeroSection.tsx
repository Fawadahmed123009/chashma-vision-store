
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-background to-card overflow-hidden min-h-[80vh] flex items-center">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="relative">
          {/* Hero Video Background */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
          >
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
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <div className="text-center space-y-8 px-6">
                  <motion.h1 
                    className="font-bold text-foreground leading-tight text-4xl md:text-5xl lg:text-6xl"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Where Vision
                    <motion.span 
                      className="text-primary block"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      Meets Style
                    </motion.span>
                  </motion.h1>
                  <motion.p 
                    className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    Discover premium eyewear crafted for the modern Pakistani lifestyle. 
                    From prescription glasses to designer sunglasses, find your perfect frames.
                  </motion.p>
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-6 justify-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    <Link to="/shop" className="btn-primary text-center">
                      Shop Now
                    </Link>
                    <Link to="/about" className="btn-secondary text-center">
                      Our Story
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
            {/* Floating Elements */}
            <motion.div 
              className="absolute -top-6 -right-6 w-20 h-20 lg:w-24 lg:h-24 bg-accent rounded-full opacity-20"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute -bottom-8 -left-8 w-24 h-24 lg:w-32 lg:h-32 bg-primary rounded-full opacity-10"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
