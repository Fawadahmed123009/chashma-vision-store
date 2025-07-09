
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border text-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3">
  <img src="/footerlogo.png" alt="Chashma Co" className="h-40 w-auto object-contain" />
            </Link>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Where Vision Meets Style. Premium eyewear designed for the modern Pakistani lifestyle.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-semibold text-xl mb-6 text-foreground">Shop</h3>
            <ul className="space-y-4 text-lg">
              <li><Link to="/shop" className="text-muted-foreground hover:text-primary transition-colors duration-300">All Frames</Link></li>
              <li><Link to="/men" className="text-muted-foreground hover:text-primary transition-colors duration-300">Men's Glasses</Link></li>
              <li><Link to="/women" className="text-muted-foreground hover:text-primary transition-colors duration-300">Women's Glasses</Link></li>
              <li><Link to="/sunglasses" className="text-muted-foreground hover:text-primary transition-colors duration-300">Sunglasses</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-xl mb-6 text-foreground">Company</h3>
            <ul className="space-y-4 text-lg">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors duration-300">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors duration-300">Contact</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Press</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-xl mb-6 text-foreground">Support</h3>
            <ul className="space-y-4 text-lg">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Size Guide</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Prescription Guide</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Return Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Warranty</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-lg">
            © 2024 Chashma Co. All rights reserved.
          </p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
