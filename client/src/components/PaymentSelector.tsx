import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Phone } from 'lucide-react';
import { PaymentMethod } from '../types';

interface PaymentSelectorProps {
  onSelect: (method: PaymentMethod) => void;
  onCancel: () => void;
}

export function PaymentSelector({ onSelect, onCancel }: PaymentSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-auto"
    >
      <h2 className="text-2xl font-bold text-center mb-8">Select Payment Method</h2>

      <div className="space-y-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('mpesa')}
          className="w-full bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-3"
        >
          <Phone size={24} />
          <span className="flex-1 text-left">Pay with M-Pesa</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('card')}
          className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-3"
        >
          <CreditCard size={24} />
          <span className="flex-1 text-left">Pay with Card</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCancel}
          className="w-full bg-gray-100 text-gray-800 p-4 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </motion.button>
      </div>
    </motion.div>
  );
}