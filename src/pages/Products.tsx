import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProducts } from '@/hooks/useProducts';
import { ProductCategory, Product as ProductType } from '@/context/ProductContext';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { ShoppingCart, AlertCircle, Loader2, Search } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

import { 
  HardHat,        // for structural materials
  Square,         // for sheets & plates
  Workflow,
  File,
  Layers,
  Cylinder       // as a replacement for pipes (could represent connection)
} from 'lucide-react';

// Define a more specific Product type with unit property
interface ProductWithUnit extends ProductType {
  unit: string;
}

// Memoized icon components with proper typing
const PipeIcon = React.memo(React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} {...props}>
    <path d="M5 12h14" />
    <path d="M5 12a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6z" />
  </svg>
)));

const SheetIcon = React.memo(React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
)));

const HardHatIcon = React.memo(React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} {...props}>
    <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z" />
    <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
    <path d="M4 15v-3a6 6 0 0 1 6-6h0" />
    <path d="M14 6h0a6 6 0 0 1 6 6v3" />
  </svg>
)));

// Subcategory to image mapping
const subcategoryImages: Record<string, string> = {
  // Structural Materials
  'Angles': '/public/I-bendpipe.jpg',
  'Channels': '/public/pshapedrods.jpg',
  'Flats': '/public/mildsheet.jpg',
  'I Beams': '/public/I-shapedrods.jpg',
  'TMT Bars': '/public/steelrods.jpg',
  
  // Steel Pipes
  'MS Round Pipes': '/public/steelrodsthick.jpg',
  'MS Square Pipes': '/public/Squarerods.jpg',
  'MS Rectangle Pipes': '/public/Squarerodss.jpg',
  
  // Sheets & Plates
  'HR Sheets': '/public/thinsheet.jpg',
  'CR Sheets': '/public/mildsheet.jpg',
  'GI Sheets': '/public/thinsheet.jpg',
  'Roofing Sheets': '/public/colorsheet.jpg'
};

const Products = () => {
  const { category } = useParams<{ category?: ProductCategory }>();
  const navigate = useNavigate();
  const { getProductsByCategory, getProductSubcategories, addToCart } = useProducts();
  const { user } = useAuth();
  
  // State management
  const [activeCategory, setActiveCategory] = useState<ProductCategory>(
    (category as ProductCategory) || 'structural-materials'
  );
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState<Record<string, boolean>>({});

  // Memoized categories data
  const categories = useMemo(() => ({
    'structural-materials': { 
      title: 'Structural Materials',
      icon: <HardHat className="w-4 h-4 mr-2" />
    },
    'steel-pipes': { 
      title: 'Steel Pipes',
      icon: <Cylinder className="w-4 h-4 mr-2" />
    },
    'sheets-plates': { 
      title: 'Sheets & Plates',
      icon: <Layers className="w-4 h-4 mr-2" />
    },
  }), []);

  // Type-safe product fetching with unit property
  const products = useMemo(() => {
    try {
      const products = getProductsByCategory(activeCategory);
      // Ensure all products have the unit property with proper type
      return products.map(product => ({
        ...product,
        unit: 'unit' in product && typeof product.unit === 'string' 
          ? product.unit 
          : 'per unit'
      })) as ProductWithUnit[];
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
      return [] as ProductWithUnit[];
    }
  }, [activeCategory, getProductsByCategory]);

  const subcategories = useMemo(() => {
    try {
      return getProductSubcategories(activeCategory);
    } catch (err) {
      console.error(err);
      return [];
    }
  }, [activeCategory, getProductSubcategories]);
  
  // Memoized filtered products
  const filteredProducts = useMemo(() => {
    if (searchTerm) {
      return products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    return products;
  }, [searchTerm, products]);

  // Stable load function
  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Stable handlers
  const handleCategoryChange = useCallback((value: string) => {
    setActiveCategory(value as ProductCategory);
    setSearchTerm('');
    navigate(`/products/${value}`);
  }, [navigate]);

  const handleQuantityChange = useCallback((productId: string, value: string) => {
    const numValue = Math.max(1, parseInt(value) || 1);
    setQuantities(prev => ({ ...prev, [productId]: numValue }));
  }, []);

  const handleAddToCart = useCallback(async (product: ProductWithUnit) => {
    if (!user) {
      toast.error('Please login to add products to your cart', {
        action: { label: 'Login', onClick: () => navigate('/login') },
      });
      return;
    }

    const quantity = quantities[product.id] || 1;
    
    try {
      setIsAddingToCart(prev => ({ ...prev, [product.id]: true }));
      await addToCart(product, quantity);
      toast.success(`${product.name} added to cart`, {
        description: `Quantity: ${quantity}`,
        action: {
          label: 'View Cart',
          onClick: () => navigate('/cart'),
        },
      });
      setQuantities(prev => ({ ...prev, [product.id]: 1 }));
    } catch (error) {
      toast.error('Failed to add item to cart');
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(prev => ({ ...prev, [product.id]: false }));
    }
  }, [user, quantities, addToCart, navigate]);

  // Memoized skeleton loader
  const renderSkeletons = useMemo(() => 
    [...Array(6)].map((_, i) => (
      <div key={i} className="bg-white rounded-lg border border-steelgray-200 overflow-hidden">
        <Skeleton className="h-48 w-full" />
        <div className="p-6 space-y-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="flex justify-between">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-10 w-1/2" />
          </div>
        </div>
      </div>
    ))
  , []);

  return (
    <div className="flex flex-col min-h-screen bg-steelgray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-steelblue-800 to-steelblue-600 py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092918056-0c4c3acd3789')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            Premium Steel Products
          </h1>
          <p className="text-lg md:text-xl text-steelgray-200 max-w-3xl mx-auto">
            High-quality materials for construction, manufacturing, and industrial applications
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-8 md:py-12 flex-grow">
        <div className="container mx-auto px-4">
          <Tabs
            defaultValue={activeCategory}
            value={activeCategory}
            onValueChange={handleCategoryChange}
            className="w-full"
          >
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 gap-4">
              <div className="w-full md:w-auto">
                <TabsList className="grid w-full grid-cols-3">
                  {Object.entries(categories).map(([key, { title, icon }]) => (
                    <TabsTrigger 
                      key={key} 
                      value={key}
                      className="flex items-center justify-center py-2 px-1 sm:px-4"
                    >
                      {icon}
                      <span className="hidden sm:inline ml-2">{title}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-steelgray-400" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-9 pr-4 py-2"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            {error ? (
              <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg border border-steelgray-200">
                <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-xl font-medium text-steelgray-800 mb-2">
                  Error loading products
                </h3>
                <p className="text-steelgray-600 mb-4 max-w-md">{error}</p>
                <Button onClick={loadProducts} variant="outline">
                  Try Again
                </Button>
              </div>
            ) : isLoading ? (
              <div className="space-y-8">
                <Skeleton className="h-8 w-64 mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {renderSkeletons}
                </div>
              </div>
            ) : (
              <TabsContent value={activeCategory} className="space-y-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-steelblue-900 mb-6">
                    {categories[activeCategory].title}
                  </h2>

                  {filteredProducts.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg border border-steelgray-200">
                      <Search className="h-12 w-12 mx-auto text-steelgray-400 mb-4" />
                      <h3 className="text-xl font-medium text-steelgray-800 mb-2">
                        No products found
                      </h3>
                      <p className="text-steelgray-600 mb-4">
                        {searchTerm 
                          ? `No products match your search for "${searchTerm}"`
                          : 'No products available in this category'}
                      </p>
                      {searchTerm && (
                        <Button 
                          variant="outline" 
                          className="mt-2"
                          onClick={() => setSearchTerm('')}
                        >
                          Clear search
                        </Button>
                      )}
                    </div>
                  ) : (
                    subcategories.map((subcategory) => {
                      const subcategoryProducts = filteredProducts
                        .filter((product) => product.subcategory === subcategory);
                      
                      if (subcategoryProducts.length === 0) return null;
                      
                      return (
                        <div key={subcategory} className="mb-12">
                          <h3 className="text-lg md:text-xl font-semibold text-steelblue-800 mb-6 pb-2 border-b border-steelgray-200 flex items-center">
                            <span className="bg-steelblue-100 text-steelblue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                              {subcategoryProducts.length}
                            </span>
                            {subcategory}
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {subcategoryProducts.map((product) => (
                              <div 
                                key={product.id} 
                                className="bg-white rounded-lg border border-steelgray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
                              >
                                <div className="h-48 bg-steelgray-50 flex items-center justify-center p-4 relative">
                                  {subcategoryImages[product.subcategory] ? (
                                    <img 
                                      src={subcategoryImages[product.subcategory]}
                                      alt={product.name}
                                      className="object-contain max-h-full max-w-full"
                                      loading="lazy"
                                    />
                                  ) : (
                                    <div className="text-steelgray-400">No image available</div>
                                  )}
                                  {product.stock <= 0 && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                      <span className="text-white font-bold text-sm md:text-base">Out of Stock</span>
                                    </div>
                                  )}
                                </div>
                                <div className="p-4 md:p-6 flex flex-col flex-grow">
                                  <div className="flex justify-between items-start mb-2">
                                    <h4 className="text-base md:text-lg font-semibold text-steelblue-900">{product.name}</h4>
                                    <Badge 
                                      variant={product.stock > 10 ? 'default' : product.stock > 0 ? 'secondary' : 'destructive'}
                                      className="ml-2 text-xs md:text-sm"
                                    >
                                      {product.stock > 0 ? `${product.stock} in stock` : 'Sold out'}
                                    </Badge>
                                  </div>
                                  
                                  <p className="text-sm text-steelgray-600 mb-4 line-clamp-2 flex-grow">
                                    {product.description || 'No description available'}
                                  </p>
                                  
                                  <div className="flex items-center justify-between mb-4">
                                    <span className="text-lg font-bold text-steelblue-800">
                                      ₹{product.price.toLocaleString('en-IN')}
                                    </span>
                                    <span className="text-xs md:text-sm text-steelgray-500">
                                      {product.unit}
                                    </span>
                                  </div>
                                  
                                  {product.stock > 0 && (
                                    <div className="mt-auto">
                                      {user ? (
                                        <div className="flex items-center gap-2">
                                          <div className="flex-1">
                                            <label htmlFor={`quantity-${product.id}`} className="sr-only">
                                              Quantity
                                            </label>
                                            <Input
                                              id={`quantity-${product.id}`}
                                              type="number"
                                              min="1"
                                              max={product.stock}
                                              value={quantities[product.id] || 1}
                                              onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                              className="text-center py-2 h-10"
                                            />
                                          </div>
                                          <Button
                                            onClick={() => handleAddToCart(product)}
                                            className="flex-1 py-2 h-10"
                                            disabled={isAddingToCart[product.id]}
                                          >
                                            {isAddingToCart[product.id] ? (
                                              <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                              <>
                                                <ShoppingCart className="h-4 w-4 mr-2" />
                                                Add
                                              </>
                                            )}
                                          </Button>
                                        </div>
                                      ) : (
                                        <div className="flex items-center text-steelblue-600 text-sm p-2 bg-steelblue-50 rounded">
                                          <AlertCircle className="h-4 w-4 mr-2" />
                                          <span>Login to purchase</span>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default React.memo(Products);