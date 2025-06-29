
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-navy mb-6">
                Our Story
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                At Chashma Co, we believe that everyone deserves to see the world clearly 
                while looking their absolute best. Founded in Pakistan, we're on a mission 
                to make premium eyewear accessible to everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                  Where Vision Meets Style
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Our tagline isn't just words – it's our promise. We understand that eyewear 
                  is more than just a vision correction tool; it's a statement of who you are. 
                  That's why every frame in our collection is carefully curated to blend 
                  functionality with fashion.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  From the bustling streets of Karachi to the corporate offices of Lahore, 
                  Chashma Co frames are designed for the modern Pakistani lifestyle.
                </p>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop"
                  alt="Our mission"
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                Our Values
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                These principles guide everything we do, from design to customer service
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 text-center card-hover">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-navy">Q</span>
                </div>
                <h3 className="text-xl font-semibold text-navy mb-4">Quality First</h3>
                <p className="text-gray-600">
                  Every frame undergoes rigorous quality checks to ensure durability, 
                  comfort, and style that lasts.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 text-center card-hover">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-navy">A</span>
                </div>
                <h3 className="text-xl font-semibold text-navy mb-4">Accessibility</h3>
                <p className="text-gray-600">
                  Premium eyewear shouldn't break the bank. We make high-quality frames 
                  affordable for everyone.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 text-center card-hover">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-navy">S</span>
                </div>
                <h3 className="text-xl font-semibold text-navy mb-4">Service Excellence</h3>
                <p className="text-gray-600">
                  From virtual try-ons to home delivery, we're committed to providing 
                  an exceptional customer experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The passionate individuals behind Chashma Co's success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                  alt="CEO"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-navy mb-2">Ahmad Hassan</h3>
                <p className="text-gray-600 mb-2">Founder & CEO</p>
                <p className="text-sm text-gray-500">
                  Visionary leader with 10+ years in eyewear industry
                </p>
              </div>

              <div className="text-center">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b332c46c?w=300&h=300&fit=crop&crop=face"
                  alt="Design Director"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-navy mb-2">Fatima Khan</h3>
                <p className="text-gray-600 mb-2">Design Director</p>
                <p className="text-sm text-gray-500">
                  Creative genius behind our stunning frame collections
                </p>
              </div>

              <div className="text-center">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
                  alt="Operations Manager"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-navy mb-2">Ali Raza</h3>
                <p className="text-gray-600 mb-2">Operations Manager</p>
                <p className="text-sm text-gray-500">
                  Ensures every order reaches you perfectly and on time
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
