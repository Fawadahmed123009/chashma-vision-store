
import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    title: 'Eyeglasses',
    description: 'Prescription & Fashion Frames',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
    link: '/shop?category=eyeglasses'
  },
  {
    id: 2,
    title: 'Sunglasses',
    description: 'UV Protection & Style',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
    link: '/sunglasses'
  },
  {
    id: 3,
    title: 'Men\'s Collection',
    description: 'Bold & Professional',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop',
    link: '/men'
  },
  {
    id: 4,
    title: 'Women\'s Collection',
    description: 'Elegant & Trendy',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
    link: '/women'
  }
];

const FeaturedCategories = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the perfect frames for every occasion and style preference
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className="group card-hover bg-white rounded-2xl overflow-hidden shadow-md"
            >
              <div className="relative overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-navy mb-2 group-hover:text-gold transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
