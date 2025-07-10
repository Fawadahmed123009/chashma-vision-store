
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import FeaturedCategories from '../components/FeaturedCategories';
import PromoSection from '../components/PromoSection';
import TestimonialsSection from '../components/TestimonialsSection';
import InstagramFeed from '../components/InstagramFeed';
import AnimatedPage from '../components/AnimatedPage';

const Index = () => {
  return (
    <AnimatedPage className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedCategories />
        <PromoSection />
        <TestimonialsSection />
        <InstagramFeed />
      </main>
      <Footer />
    </AnimatedPage>
  );
};

export default Index;
