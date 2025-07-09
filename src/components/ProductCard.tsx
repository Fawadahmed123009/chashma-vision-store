
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  original_price?: number;
  images: string[];
  brand: string;
  gender: string;
  shape: string;
  stock_quantity: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const inStock = product.stock_quantity > 0;
  const lowStock = product.stock_quantity > 0 && product.stock_quantity <= 5;
  const onSale = product.original_price && product.original_price > product.price;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (inStock) {
      await addToCart(product.id);
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square bg-muted overflow-hidden relative">
          <img
            src={product.images[0] || '/placeholder.svg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {!inStock && (
            <div className="absolute inset-0 bg-destructive/80 flex items-center justify-center">
              <span className="text-destructive-foreground font-semibold text-lg">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <Link to={`/product/${product.id}`}>
              <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground">{product.brand}</p>
          </div>
          <div className="flex flex-wrap gap-1">
            {onSale && (
              <Badge className="text-xs bg-accent text-accent-foreground">
                Sale
              </Badge>
            )}
            {!inStock && (
              <Badge variant="outline" className="text-xs border-destructive text-destructive">
                Out of Stock
              </Badge>
            )}
            {lowStock && inStock && (
              <Badge variant="secondary" className="text-xs">
                Low Stock
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-primary">
              PKR {product.price.toLocaleString()}
            </span>
            {onSale && (
              <span className="text-sm text-muted-foreground line-through">
                PKR {product.original_price?.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <div className="mb-3">
          <p className="text-xs text-muted-foreground">
            {inStock ? `${product.stock_quantity} in stock` : 'Out of stock'}
          </p>
        </div>

        <div className="flex space-x-2">
          <Link to={`/product/${product.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
          <Button 
            onClick={handleAddToCart}
            disabled={!inStock}
            className="flex-1 btn-primary"
          >
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
