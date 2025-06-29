
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                <span className="text-navy font-bold text-sm">C</span>
              </div>
              <span className="text-white font-bold text-xl">Chashma Co</span>
            </Link>
            <p className="text-gray-300 text-sm">
              Where Vision Meets Style. Premium eyewear designed for the modern Pakistani lifestyle.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className="text-gray-300 hover:text-gold transition-colors">All Frames</Link></li>
              <li><Link to="/men" className="text-gray-300 hover:text-gold transition-colors">Men's Glasses</Link></li>
              <li><Link to="/women" className="text-gray-300 hover:text-gold transition-colors">Women's Glasses</Link></li>
              <li><Link to="/sunglasses" className="text-gray-300 hover:text-gold transition-colors">Sunglasses</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-300 hover:text-gold transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-gold transition-colors">Contact</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-gold transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gold transition-colors">Press</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-gold transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gold transition-colors">Prescription Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gold transition-colors">Return Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gold transition-colors">Warranty</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2024 Chashma Co. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-gold text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-gold text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
