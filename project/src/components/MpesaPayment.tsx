import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Loader, ShieldCheck } from 'lucide-react';

interface MpesaPaymentProps {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export function MpesaPayment({ amount, onSuccess, onCancel }: MpesaPaymentProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validatePhoneNumber = (number: string) => {
    const regex = /^(?:254|\+254|0)?([71](?:(?:0[0-8])|(?:[12][0-9])|(?:9[0-9])|(?:4[0-36-9])|(?:5[0-7])|(?:6[0-4])|(?:8[0-2]))[0-9]{6})$/;
    return regex.test(number);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid Safaricom number');
      return;
    }

    setError('');
    setLoading(true);
    
    // Simulate M-Pesa STK push
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-auto"
    >
      <div className="flex items-center justify-center mb-6">
        <div className="bg-green-100 p-3 rounded-full">
          <Phone size={32} className="text-green-600" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center mb-6">M-Pesa Payment</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount to Pay
          </label>
          <div className="text-3xl font-bold text-gray-900 text-center bg-gray-50 py-3 rounded-lg">
            KES {amount.toLocaleString()}
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            M-Pesa Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="e.g., 254712345678"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>

        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:bg-green-400"
          >
            {loading ? (
              <>
                <Loader className="animate-spin" size={20} />
                Processing...
              </>
            ) : (
              'Pay Now'
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-100 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </motion.button>
        </div>
      </form>

      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <ShieldCheck size={20} className="text-green-600" />
          <span>Secure M-Pesa Payment</span>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-2">Instructions:</p>
          <ol className="list-decimal ml-4 space-y-2 text-sm text-gray-600">
            <li>Enter your M-Pesa registered Safaricom number</li>
            <li>Click "Pay Now" to receive the payment prompt</li>
            <li>Enter your M-Pesa PIN on your phone to complete payment</li>
            <li>Wait for confirmation message</li>
          </ol>
        </div>
      </div>
    </motion.div>
  );
}