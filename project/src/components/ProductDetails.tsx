import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Star, Truck, Shield } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailsProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductDetails({ product, onAddToCart }: ProductDetailsProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[500px] object-cover rounded-lg shadow-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="text-yellow-400 fill-current" size={20} />
            ))}
            <span className="text-gray-600">(4.8/5)</span>
          </div>

          <p className="text-3xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-gray-600 text-lg">{product.description}</p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-600">
              <Truck size={20} />
              <span>Free delivery on orders over $100</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Shield size={20} />
              <span>1 year warranty included</span>
            </div>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Add to Cart
          </button>
        </motion.div>
      </div>
    </div>
  );
}