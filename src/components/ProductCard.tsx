
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  original_price?: number;
  images: string[];
  brand: string;
  gender: string;
  shape: string;
  sku: string;
  stock_quantity: number;
  is_active: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const mainImage = product.images && product.images.length > 0 ? product.images[0] : '/placeholder.svg';
  
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md card-hover group">
      <div className="relative overflow-hidden">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors">
            <User className="w-4 h-4 text-navy" />
          </button>
          <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors">
            <ShoppingBag className="w-4 h-4 text-navy" />
          </button>
        </div>
        {product.original_price && product.original_price > product.price && (
          <div className="absolute top-4 left-4 bg-gold text-navy px-3 py-1 rounded-full text-sm font-medium">
            Save PKR {(product.original_price - product.price).toLocaleString()}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="mb-2">
          <span className="text-sm text-gray-500 uppercase tracking-wide">{product.brand}</span>
        </div>
        <h3 className="font-semibold text-navy mb-3 group-hover:text-gold transition-colors">
          <Link to={`/product/${product.id}`}>
            {product.name}
          </Link>
        </h3>
        
        <div className="flex items-center mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-sm ${i < 4 ? 'text-gold' : 'text-gray-300'}`}>
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">(0)</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-navy">PKR {product.price.toLocaleString()}</span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-sm text-gray-500 line-through">PKR {product.original_price.toLocaleString()}</span>
            )}
          </div>
          <Link
            to={`/product/${product.id}`}
            className="bg-navy text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-navy/90 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
