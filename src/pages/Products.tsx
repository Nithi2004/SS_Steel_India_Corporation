import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProducts } from '@/hooks/useProducts';
import { ProductCategory, Product as ProductType } from '@/context/ProductContext';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { ShoppingCart, AlertCircle, Loader2, Search, HardHat, Layers, Cylinder } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

// Define a more specific Product type with unit property
interface ProductWithUnit extends ProductType {
  unit: string;
}

// Subcategory to image mapping - note: no "/public" prefix, as public is root
const subcategoryImages: Record<string, string> = {
  // Structural Materials
  'Angles': '/I-bendpipe.jpg',
  'Channels': '/pshapedrods.jpg',
  'Flats': '/mildsheet.jpg',
  'I Beams': '/I-shapedrods.jpg',
  'TMT Bars': '/steelrods.jpg',

  // Steel Pipes
  'MS Round Pipes': '/steelrodsthick.jpg',
  'MS Square Pipes': '/Squarerods.jpg',
  'MS Rectangle Pipes': '/Squarerodss.jpg',

  // Sheets & Plates
  'HR Sheets / plates': '/hrsheet.jpg',  // FIXED: exact string key to match product.subcategory
  'CR Sheets': '/mildsheet.jpg',
  'GI Sheets': '/thinsheet.jpg',
  'Roofing Sheets': '/colorsheet.jpg',
};

const Products: React.FC = () => {
  const { category } = useParams<{ category?: ProductCategory }>();
  const navigate = useNavigate();
  const { getProductsByCategory, getProductSubcategories, addToCart } = useProducts();
  const { user } = useAuth();

  const [activeCategory, setActiveCategory] = useState<ProductCategory>(
    (category as ProductCategory) || 'structural-materials'
  );
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState<Record<string, boolean>>({});

  const categories = useMemo(() => ({
    'structural-materials': { title: 'Structural Materials', icon: <HardHat className="w-4 h-4 mr-2" /> },
    'steel-pipes': { title: 'Steel Pipes', icon: <Cylinder className="w-4 h-4 mr-2" /> },
    'sheets-plates': { title: 'Sheets & Plates', icon: <Layers className="w-4 h-4 mr-2" /> },
  }), []);

  // Fetch products with unit fallback
  const products = useMemo<ProductWithUnit[]>(() => {
    try {
      const fetched = getProductsByCategory(activeCategory);
      return fetched.map(product => ({
        ...product,
        unit: typeof product.unit === 'string' ? product.unit : 'per unit',
      }));
    } catch (e) {
      setError('Failed to load products');
      console.error(e);
      return [];
    }
  }, [activeCategory, getProductsByCategory]);

  const subcategories = useMemo<string[]>(() => {
    try {
      return getProductSubcategories(activeCategory);
    } catch (e) {
      console.error(e);
      return [];
    }
  }, [activeCategory, getProductSubcategories]);

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    const term = searchTerm.toLowerCase();
    return products.filter(
      p => p.name.toLowerCase().includes(term) ||
           (p.description?.toLowerCase().includes(term) ?? false)
    );
  }, [searchTerm, products]);

  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch {
      setError('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleCategoryChange = useCallback((value: string) => {
    setActiveCategory(value as ProductCategory);
    setSearchTerm('');
    navigate(`/products/${value}`);
  }, [navigate]);

  const handleQuantityChange = useCallback((productId: string, value: string) => {
    const num = Math.max(1, parseInt(value) || 1);
    setQuantities(q => ({ ...q, [productId]: num }));
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
      setIsAddingToCart(s => ({ ...s, [product.id]: true }));
      await addToCart(product, quantity);
      toast.success(`${product.name} added to cart`, {
        description: `Quantity: ${quantity}`,
        action: { label: 'View Cart', onClick: () => navigate('/cart') },
      });
      setQuantities(q => ({ ...q, [product.id]: 1 }));
    } catch (e) {
      toast.error('Failed to add item to cart');
      console.error('Add to cart error:', e);
    } finally {
      setIsAddingToCart(s => ({ ...s, [product.id]: false }));
    }
  }, [user, quantities, addToCart, navigate]);

  const renderSkeletons = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => (
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
    ));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-steelgray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-steelblue-800 to-steelblue-600 py-16 md:py-24">
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092918056-0c4c3acd3789')] bg-cover bg-center opacity-10"
          aria-hidden="true"
        />
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
            value={activeCategory}
            onValueChange={handleCategoryChange}
            className="w-full"
          >
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 gap-4">
              <TabsList className="grid w-full grid-cols-3 md:w-auto md:grid-cols-3">
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

              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-steelgray-400" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-9 pr-4 py-2"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  disabled={isLoading}
                  aria-label="Search products"
                />
              </div>
            </div>

            {error ? (
              <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg border border-steelgray-200">
                <AlertCircle className="h-12 w-12 text-red-600 mb-4" />
                <h2 className="text-lg font-semibold mb-2 text-red-700">{error}</h2>
                <Button variant="outline" onClick={loadProducts}>Retry</Button>
              </div>
            ) : (
              <TabsContent value={activeCategory}>
                <div className="grid gap-6 md:grid-cols-3">
                  {isLoading
                    ? renderSkeletons
                    : filteredProducts.length === 0
                      ? (
                        <div className="col-span-full flex flex-col items-center justify-center py-12">
                          <AlertCircle className="h-12 w-12 text-steelgray-400 mb-4" />
                          <p className="text-steelgray-500 text-lg">No products found.</p>
                        </div>
                      )
                      : filteredProducts.map(product => {
                        // DEBUG: check product subcategory string
                        // console.log('Product subcategory:', product.subcategory);

                        const quantity = quantities[product.id] || 1;
                        const imageSrc = subcategoryImages[product.subcategory] || '/default-product.jpg';

                        return (
                          <div
                            key={product.id}
                            className="bg-white rounded-lg border border-steelgray-200 overflow-hidden flex flex-col"
                          >
                            <img
                              src={imageSrc}
                              alt={product.subcategory}
                              className="w-full h-48 object-cover"
                              loading="lazy"
                            />
                            <div className="p-4 flex flex-col flex-grow">
                              <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                              <p className="text-sm text-steelgray-600 flex-grow">
                                {product.description || 'No description available.'}
                              </p>
                              <div className="mt-4 flex items-center justify-between">
                                <span className="text-steelblue-600 font-medium">
                                  ₹{product.price} / {product.unit}
                                </span>
                                <div className="flex items-center space-x-2">
                                  <Input
                                    type="number"
                                    min={1}
                                    value={quantity}
                                    onChange={e => handleQuantityChange(product.id, e.target.value)}
                                    className="w-20"
                                    aria-label={`Quantity for ${product.name}`}
                                  />
                                  <Button
                                    size="sm"
                                    onClick={() => handleAddToCart(product)}
                                    disabled={isAddingToCart[product.id]}
                                  >
                                    {isAddingToCart[product.id] ? (
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                      <ShoppingCart className="mr-2 h-4 w-4" />
                                    )}
                                    Add
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Products;
 