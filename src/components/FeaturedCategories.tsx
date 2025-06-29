
import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    title: 'Eyeglasses',
    description: 'Prescription & Fashion Frames',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop&fm=webp&q=80',
    link: '/shop?category=eyeglasses'
  },
  {
    id: 2,
    title: 'Sunglasses',
    description: 'UV Protection & Style',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop&fm=webp&q=80',
    link: '/sunglasses'
  },
  {
    id: 3,
    title: 'Men\'s Collection',
    description: 'Bold & Professional',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop&fm=webp&q=80',
    link: '/men'
  },
  {
    id: 4,
    title: 'Women\'s Collection',
    description: 'Elegant & Trendy',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop&fm=webp&q=80',
    link: '/women'
  }
];

const FeaturedCategories = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-bold text-navy mb-6 section-heading">
            Shop by Category
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find the perfect frames for every occasion and style preference
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={category.link}
              className={`group card-hover bg-white rounded-2xl overflow-hidden shadow-lg animate-stagger-${Math.min(index + 1, 3)}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-navy mb-3 group-hover:text-gold transition-colors duration-300">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-lg">
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
