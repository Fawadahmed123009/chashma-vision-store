
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Search, Filter } from 'lucide-react';

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

const Shop = () => {
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterGender, setFilterGender] = useState('all');
  const [filterShape, setFilterShape] = useState('all');
  const [filterBrand, setFilterBrand] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [showFilters, setShowFilters] = useState(false);

  const [brands, setBrands] = useState<string[]>([]);
  const [shapes, setShapes] = useState<string[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Set initial filter based on URL path
    const path = location.pathname;
    if (path === '/men') {
      setFilterGender('men');
    } else if (path === '/women') {
      setFilterGender('women');
    } else if (path === '/sunglasses') {
      setFilterShape('sunglasses');
    } else {
      setFilterGender('all');
      setFilterShape('all');
    }
  }, [location.pathname]);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchTerm, sortBy, filterGender, filterShape, filterBrand, priceRange]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setProducts(data || []);
      
      // Extract unique brands and shapes for filters
      const uniqueBrands = [...new Set(data?.map(p => p.brand) || [])];
      const uniqueShapes = [...new Set(data?.map(p => p.shape) || [])];
      setBrands(uniqueBrands);
      setShapes(uniqueShapes);

      // Set max price range based on products
      if (data && data.length > 0) {
        const maxPrice = Math.max(...data.map(p => Number(p.price) || 0));
        setPriceRange([0, maxPrice]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply gender filter
    if (filterGender !== 'all') {
      filtered = filtered.filter(product => product.gender === filterGender);
    }

    // Apply shape filter
    if (filterShape !== 'all') {
      filtered = filtered.filter(product => product.shape === filterShape);
    }

    // Apply brand filter
    if (filterBrand !== 'all') {
      filtered = filtered.filter(product => product.brand === filterBrand);
    }

    // Apply price range filter
    filtered = filtered.filter(product => {
      const price = Number(product.price) || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (Number(a.price) || 0) - (Number(b.price) || 0);
        case 'price-high':
          return (Number(b.price) || 0) - (Number(a.price) || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'brand':
          return a.brand.localeCompare(b.brand);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterGender('all');
    setFilterShape('all');
    setFilterBrand('all');
    setSortBy('name');
    if (products.length > 0) {
      const maxPrice = Math.max(...products.map(p => Number(p.price) || 0));
      setPriceRange([0, maxPrice]);
    }
  };

  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case '/men':
        return 'Men\'s Eyewear';
      case '/women':
        return 'Women\'s Eyewear';
      case '/sunglasses':
        return 'Sunglasses Collection';
      default:
        return 'All Eyewear';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-navy mb-4">Loading products...</h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-navy">{getPageTitle()}</h1>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-navy mb-4">Filters</h3>
                  
                  {/* Search */}
                  <div className="space-y-2 mb-6">
                    <label className="text-sm font-medium text-gray-700">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Gender Filter */}
                  <div className="space-y-2 mb-6">
                    <label className="text-sm font-medium text-gray-700">Gender</label>
                    <Select value={filterGender} onValueChange={setFilterGender}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="men">Men</SelectItem>
                        <SelectItem value="women">Women</SelectItem>
                        <SelectItem value="unisex">Unisex</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Shape Filter */}
                  <div className="space-y-2 mb-6">
                    <label className="text-sm font-medium text-gray-700">Shape</label>
                    <Select value={filterShape} onValueChange={setFilterShape}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Shapes</SelectItem>
                        {shapes.map(shape => (
                          <SelectItem key={shape} value={shape}>
                            {shape.charAt(0).toUpperCase() + shape.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Brand Filter */}
                  <div className="space-y-2 mb-6">
                    <label className="text-sm font-medium text-gray-700">Brand</label>
                    <Select value={filterBrand} onValueChange={setFilterBrand}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Brands</SelectItem>
                        {brands.map(brand => (
                          <SelectItem key={brand} value={brand}>
                            {brand}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-2 mb-6">
                    <label className="text-sm font-medium text-gray-700">
                      Price Range: PKR {priceRange[0].toLocaleString()} - PKR {priceRange[1].toLocaleString()}
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={products.length > 0 ? Math.max(...products.map(p => Number(p.price) || 0)) : 50000}
                      min={0}
                      step={1000}
                      className="w-full"
                    />
                  </div>

                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Sort Options */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-600">Sort by:</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="brand">Brand</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Products */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
                  <Button onClick={clearFilters}>Clear All Filters</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
