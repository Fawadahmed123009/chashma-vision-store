
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import FeaturedCategories from '../components/FeaturedCategories';
import PromoSection from '../components/PromoSection';
import TestimonialsSection from '../components/TestimonialsSection';
import InstagramFeed from '../components/InstagramFeed';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturedCategories />
        <PromoSection />
        <TestimonialsSection />
        <InstagramFeed />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
