
import React from 'react';
import { Instagram } from 'lucide-react';

const instagramPosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=300&fit=crop',
    caption: 'New arrivals are here! ✨'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop',
    caption: 'Perfect frames for work 💼'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=300&fit=crop',
    caption: 'Summer vibes 🕶️'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300&h=300&fit=crop',
    caption: 'Sleek and modern 🔥'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=300&fit=crop',
    caption: 'Style meets comfort ✨'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=300&fit=crop',
    caption: 'Behind the scenes 📸'
  }
];

const InstagramFeed = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Instagram className="w-8 h-8 text-gold mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-navy">
              Follow @chashma_co
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest collections and styling tips
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post) => (
            <div
              key={post.id}
              className="relative group cursor-pointer card-hover rounded-lg overflow-hidden"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="w-8 h-8 text-white" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="#"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
          >
            <Instagram className="w-5 h-5" />
            <span>Follow on Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
