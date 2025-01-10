import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Package, Heart } from 'lucide-react';

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'orders' | 'wishlist'>('profile');
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders] = useState<Order[]>([
    {
      id: '1',
      date: '2024-03-15',
      status: 'Delivered',
      total: 25999,
      items: [
        { name: 'Training Shoes', quantity: 1, price: 15999 },
        { name: 'Protein Powder', quantity: 2, price: 4999 }
      ]
    }
  ]);

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newAddress = {
      street: formData.get('street') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      postalCode: formData.get('postalCode') as string,
      country: formData.get('country') as string
    };
    setAddresses([...addresses, newAddress]);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('profile')}
            className={\`px-6 py-4 flex items-center gap-2 \${
              activeTab === 'profile'
                ? 'border-b-2 border-[#7c6c5d] text-[#7c6c5d]'
                : 'text-gray-500'
            }\`}
          >
            <User size={20} />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={\`px-6 py-4 flex items-center gap-2 \${
              activeTab === 'addresses'
                ? 'border-b-2 border-[#7c6c5d] text-[#7c6c5d]'
                : 'text-gray-500'
            }\`}
          >
            <MapPin size={20} />
            Addresses
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={\`px-6 py-4 flex items-center gap-2 \${
              activeTab === 'orders'
                ? 'border-b-2 border-[#7c6c5d] text-[#7c6c5d]'
                : 'text-gray-500'
            }\`}
          >
            <Package size={20} />
            Orders
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={\`px-6 py-4 flex items-center gap-2 \${
              activeTab === 'wishlist'
                ? 'border-b-2 border-[#7c6c5d] text-[#7c6c5d]'
                : 'text-gray-500'
            }\`}
          >
            <Heart size={20} />
            Wishlist
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-semibold text-[#7c6c5d]">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7c6c5d] focus:border-[#7c6c5d]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7c6c5d] focus:border-[#7c6c5d]"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#7c6c5d] text-white px-6 py-2 rounded-lg hover:bg-[#6a5c4f]"
                >
                  Save Changes
                </motion.button>
              </div>
            </motion.div>
          )}

          {activeTab === 'addresses' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-semibold text-[#7c6c5d]">Delivery Addresses</h2>
              <form onSubmit={handleAddAddress} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="street"
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7c6c5d] focus:border-[#7c6c5d]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7c6c5d] focus:border-[#7c6c5d]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State/Province
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7c6c5d] focus:border-[#7c6c5d]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7c6c5d] focus:border-[#7c6c5d]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7c6c5d] focus:border-[#7c6c5d]"
                    />
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="bg-[#7c6c5d] text-white px-6 py-2 rounded-lg hover:bg-[#6a5c4f]"
                >
                  Add Address
                </motion.button>
              </form>

              <div className="space-y-4 mt-8">
                {addresses.map((address, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <p>{address.street}</p>
                    <p>{address.city}, {address.state} {address.postalCode}</p>
                    <p>{address.country}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-semibold text-[#7c6c5d]">Order History</h2>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="font-semibold">Order #{order.id}</p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {order.status}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between">
                          <span>{item.name} x{item.quantity}</span>
                          <span>KES {item.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>KES {order.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'wishlist' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-semibold text-[#7c6c5d]">My Wishlist</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Wishlist items will be populated here */}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}