
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, User } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Left Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/shop" 
              className={`relative text-lg transition-all duration-300 hover:text-navy group ${isActive('/shop') ? 'text-navy font-medium' : 'text-gray-600'}`}
            >
              Shop
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/men" 
              className={`relative text-lg transition-all duration-300 hover:text-navy group ${isActive('/men') ? 'text-navy font-medium' : 'text-gray-600'}`}
            >
              Men
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/women" 
              className={`relative text-lg transition-all duration-300 hover:text-navy group ${isActive('/women') ? 'text-navy font-medium' : 'text-gray-600'}`}
            >
              Women
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Centered Logo */}
          <Link to="/" className="flex items-center space-x-3 absolute left-1/2 transform -translate-x-1/2 lg:relative lg:left-auto lg:transform-none">
            <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center shadow-lg">
              <span className="text-gold font-bold text-lg">C</span>
            </div>
            <span className="text-navy font-bold text-2xl tracking-tight">Chashma Co</span>
          </Link>

          {/* Right Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/sunglasses" 
              className={`relative text-lg transition-all duration-300 hover:text-navy group ${isActive('/sunglasses') ? 'text-navy font-medium' : 'text-gray-600'}`}
            >
              Sunglasses
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/about" 
              className={`relative text-lg transition-all duration-300 hover:text-navy group ${isActive('/about') ? 'text-navy font-medium' : 'text-gray-600'}`}
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/contact" 
              className={`relative text-lg transition-all duration-300 hover:text-navy group ${isActive('/contact') ? 'text-navy font-medium' : 'text-gray-600'}`}
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            <button className="p-2 lg:p-3 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-105">
              <Search className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600" />
            </button>
            <button className="p-2 lg:p-3 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-105">
              <User className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600" />
            </button>
            <Link to="/cart" className="p-2 lg:p-3 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-105 relative">
              <ShoppingBag className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-gold text-navy text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                0
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t animate-fade-in">
            <nav className="flex flex-col space-y-6">
              <Link 
                to="/shop" 
                className="text-gray-600 hover:text-navy transition-colors text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                to="/men" 
                className="text-gray-600 hover:text-navy transition-colors text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Men
              </Link>
              <Link 
                to="/women" 
                className="text-gray-600 hover:text-navy transition-colors text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Women
              </Link>
              <Link 
                to="/sunglasses" 
                className="text-gray-600 hover:text-navy transition-colors text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Sunglasses
              </Link>
              <Link 
                to="/about" 
                className="text-gray-600 hover:text-navy transition-colors text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-600 hover:text-navy transition-colors text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
