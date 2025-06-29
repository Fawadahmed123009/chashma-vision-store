
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
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-navy rounded-full flex items-center justify-center">
              <span className="text-gold font-bold text-sm">C</span>
            </div>
            <span className="text-navy font-bold text-xl">Chashma Co</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/shop" 
              className={`transition-colors hover:text-navy ${isActive('/shop') ? 'text-navy font-medium' : 'text-gray-600'}`}
            >
              Shop
            </Link>
            <Link 
              to="/men" 
              className={`transition-colors hover:text-navy ${isActive('/men') ? 'text-navy font-medium' : 'text-gray-600'}`}
            >
              Men
            </Link>
            <Link 
              to="/women" 
              className={`transition-colors hover:text-navy ${isActive('/women') ? 'text-navy font-medium' : 'text-gray-600'}`}
            >
              Women
            </Link>
            <Link 
              to="/sunglasses" 
              className={`transition-colors hover:text-navy ${isActive('/sunglasses') ? 'text-navy font-medium' : 'text-gray-600'}`}
            >
              Sunglasses
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors hover:text-navy ${isActive('/about') ? 'text-navy font-medium' : 'text-gray-600'}`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`transition-colors hover:text-navy ${isActive('/contact') ? 'text-navy font-medium' : 'text-gray-600'}`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <User className="w-5 h-5 text-gray-600" />
            </button>
            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <ShoppingBag className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-gold text-navy text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                0
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link to="/shop" className="text-gray-600 hover:text-navy transition-colors">
                Shop
              </Link>
              <Link to="/men" className="text-gray-600 hover:text-navy transition-colors">
                Men
              </Link>
              <Link to="/women" className="text-gray-600 hover:text-navy transition-colors">
                Women
              </Link>
              <Link to="/sunglasses" className="text-gray-600 hover:text-navy transition-colors">
                Sunglasses
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-navy transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-navy transition-colors">
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
