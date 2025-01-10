import React from 'react';
import { Product } from '../types';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 mt-1 text-sm">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            KES {product.price.toLocaleString()}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAddToCart(product)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}