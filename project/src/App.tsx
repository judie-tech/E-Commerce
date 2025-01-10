import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Dumbbell, ShoppingBag, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from './data/products';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { HomePage } from './components/HomePage';
import { ProductDetails } from './components/ProductDetails';
import { MpesaPayment } from './components/MpesaPayment';
import { CardPayment } from './components/CardPayment';
import { PaymentSelector } from './components/PaymentSelector';
import { AuthPage } from './components/AuthPage';
import { PrivateRoute } from './components/PrivateRoute';
import { ProfilePage } from './components/ProfilePage';
import { SearchBar } from './components/SearchBar';
import { Product, CartItem, PaymentMethod } from './types';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'gear' | 'trainers' | 'supplements' | 'accessories'>('all');
  const [showCart, setShowCart] = useState(false);
  const [showPaymentSelector, setShowPaymentSelector] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState<{ minPrice: number; maxPrice: number }>({
    minPrice: 0,
    maxPrice: Infinity
  });

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/';
  };

  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.price >= priceFilter.minPrice && 
                          (priceFilter.maxPrice === Infinity || product.price <= priceFilter.maxPrice);
      return matchesCategory && matchesSearch && matchesPrice;
    });

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setPaymentMethod(method);
    setShowPaymentSelector(false);
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setCartItems([]);
    alert('Payment successful! Thank you for your purchase.');
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Router>
      <div className="min-h-screen bg-[#f5efe6]">
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <Link to="/" className="flex items-center gap-2">
                  <Dumbbell className="text-[#7c6c5d]" size={32} />
                  <h1 className="text-2xl font-bold text-[#7c6c5d]">FitGear</h1>
                </Link>
                <nav className="hidden md:flex items-center gap-6">
                  <Link to="/" className="text-[#7c6c5d] hover:text-[#a69585] transition-colors">
                    Home
                  </Link>
                  <Link to="/shop" className="text-[#7c6c5d] hover:text-[#a69585] transition-colors">
                    Shop
                  </Link>
                </nav>
              </div>
              <div className="flex items-center gap-4">
                {isAuthenticated && (
                  <>
                    <Link to="/profile" className="text-[#7c6c5d] hover:text-[#a69585] p-2">
                      <User size={24} />
                    </Link>
                    <button
                      onClick={() => setShowCart(!showCart)}
                      className="relative p-2 text-[#7c6c5d] hover:text-[#a69585]"
                    >
                      <ShoppingBag size={24} />
                      {cartItems.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-[#7c6c5d] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {cartItems.length}
                        </span>
                      )}
                    </button>
                    <button
                      onClick={handleLogout}
                      className="text-[#7c6c5d] hover:text-[#a69585] p-2"
                    >
                      <LogOut size={24} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        <AnimatePresence>
          {showCart && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-xl z-50"
            >
              <Cart
                items={cartItems}
                onRemoveFromCart={removeFromCart}
                onUpdateQuantity={updateQuantity}
                onCheckout={() => {
                  setShowCart(false);
                  setShowPaymentSelector(true);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showPaymentSelector && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <PaymentSelector
                onSelect={handlePaymentMethodSelect}
                onCancel={() => setShowPaymentSelector(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showPayment && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              {paymentMethod === 'mpesa' ? (
                <MpesaPayment
                  amount={cartTotal}
                  onSuccess={handlePaymentSuccess}
                  onCancel={() => setShowPayment(false)}
                />
              ) : (
                <CardPayment
                  amount={cartTotal}
                  onSuccess={handlePaymentSuccess}
                  onCancel={() => setShowPayment(false)}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route
            path="/shop"
            element={
              <PrivateRoute>
                <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                  <SearchBar
                    onSearch={setSearchQuery}
                    onFilter={setPriceFilter}
                  />
                  
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-4">
                      {['all', 'gear', 'trainers', 'supplements', 'accessories'].map((category) => (
                        <motion.button
                          key={category}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedCategory(category as any)}
                          className={`px-4 py-2 rounded-lg ${
                            selectedCategory === category
                              ? 'bg-[#7c6c5d] text-white'
                              : 'bg-white text-[#7c6c5d] hover:bg-[#f5efe6]'
                          }`}
                        >
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <ProductCard
                          product={product}
                          onAddToCart={addToCart}
                        />
                      </motion.div>
                    ))}
                  </div>
                </main>
              </PrivateRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <PrivateRoute>
                <ProductDetails
                  product={products[0]}
                  onAddToCart={addToCart}
                />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;