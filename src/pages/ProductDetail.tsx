
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ShoppingBag, User, Upload } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Mock product data - in real app, would fetch by ID
  const product = {
    id: 1,
    name: 'Classic Aviator Frame',
    price: 4500,
    originalPrice: 6000,
    images: [
      'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=600&fit=crop'
    ],
    category: 'Sunglasses',
    rating: 5,
    reviews: 24,
    description: 'Premium aviator-style frames crafted with high-quality materials. Perfect for both casual and professional settings. Features UV protection and scratch-resistant lenses.',
    features: [
      'UV 400 Protection',
      'Scratch-resistant coating',
      'Lightweight titanium frame',
      'Adjustable nose pads',
      'Premium hinges',
      '2-year warranty'
    ],
    inStock: true
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-navy' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm text-gray-500 uppercase tracking-wide">{product.category}</span>
                  {product.inStock && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      In Stock
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                  {product.name}
                </h1>
                
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-lg ${i < product.rating ? 'text-gold' : 'text-gray-300'}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-600 ml-2">({product.reviews} reviews)</span>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-bold text-navy">PKR {product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">PKR {product.originalPrice.toLocaleString()}</span>
                  )}
                  {product.originalPrice && (
                    <span className="bg-gold text-navy px-3 py-1 rounded-full text-sm font-medium">
                      Save PKR {(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              <div>
                <h3 className="font-semibold text-navy mb-3">Features:</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">Quantity:</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border border-gray-300 rounded-lg px-3 py-2"
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="btn-primary flex items-center justify-center space-x-2">
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>
                  <button className="btn-secondary flex items-center justify-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Try Virtual</span>
                  </button>
                  <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                    <Upload className="w-5 h-5" />
                    <span>Upload Prescription</span>
                  </button>
                </div>
              </div>

              {/* Payment Options */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-navy mb-3">Payment Options:</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Cash on Delivery
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    JazzCash
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    EasyPaisa
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                    Credit/Debit Card
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
