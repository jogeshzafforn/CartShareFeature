import React, { useState } from 'react';
import { ChevronDown, Minus, Plus, ArrowLeft, Clock, Info, Share2, Mail, Copy, X } from 'lucide-react';

interface FoodItem {
  id: string;
  itemName: string;
  restaurantName: string;
  price: number;
  quantity: number;
}

function App() {
  const [items, setItems] = useState<FoodItem[]>([
    {
      id: '1',
      itemName: 'Chicken Schezwan Fried Rice & Chilli Chicken Sauce',
      restaurantName: 'The Red Box',
      price: 309,
      quantity: 1
    }
  ]);
  const [shareLink, setShareLink] = useState('');

  const updateQuantity = (id: string, change: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
    ));
  };

  const generateShareLink = () => {
    const shareableData = btoa(JSON.stringify(items));
    const link = `${window.location.origin}/share/${shareableData}`;
    setShareLink(link);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    setShareLink('');
  };

  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#37075D] text-white py-4">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ArrowLeft className="w-6 h-6" />
              <div>
                <h1 className="text-lg font-medium">{items[0]?.restaurantName}</h1>
                <div className="flex items-center text-sm text-gray-300">
                  <span>Flat</span>
                  <span className="mx-1">|</span>
                  <span>402, Hy End Homes</span>
                  <ChevronDown className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
            <div className="w-8 h-8 bg-[#4a0a7d] rounded-full flex items-center justify-center text-sm font-medium">
              JB
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-4">
        {/* Savings Banner */}
        <div className="bg-[#3E1857] text-white px-4 py-3 rounded-lg mb-4 flex items-center">
          <span className="text-sm">₹67 saved! With One Blck benefits</span>
        </div>

        {/* Items List */}
        <div className="bg-white rounded-lg shadow-sm mb-4">
          {items.map((item) => (
            <div key={item.id} className="p-4 border-b">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <span className="inline-block border border-red-500 text-red-500 text-xs px-1 rounded mr-2">🌶</span>
                  <h3 className="inline text-gray-700 font-medium">{item.itemName}</h3>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-3 py-1 text-green-600 hover:bg-gray-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-1">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-3 py-1 text-green-600 hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-gray-700">₹{item.price}</span>
                </div>
              </div>
              <div className="flex space-x-4">
                <button className="flex items-center text-gray-500 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  Cooking Instructions
                </button>
                <button className="flex items-center text-gray-500 text-sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Add More Items
                </button>
                <button 
                  onClick={generateShareLink}
                  className="flex items-center text-gray-500 text-sm"
                >
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Complete Your Meal */}
        <div className="bg-white rounded-lg shadow-sm mb-4 p-4">
          <h2 className="text-gray-500 font-medium mb-4">COMPLETE YOUR MEAL</h2>
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {[
              { name: 'Dragon Chicken', price: 309, image: 'https://images.unsplash.com/photo-1623689046286-01d442665d88?w=150' },
              { name: 'Spicy Fried Chicken', price: 309, image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=150' },
              { name: 'Chilli Chicken', price: 309, image: 'https://images.unsplash.com/photo-1624726175512-19b9baf9fbd1?w=150' },
            ].map((item, index) => (
              <div key={index} className="flex-none w-32">
                <img src={item.image} alt={item.name} className="w-full h-24 object-cover rounded-lg mb-2" />
                <h3 className="text-sm font-medium text-gray-700">{item.name}</h3>
                <p className="text-sm text-gray-500">₹{item.price}</p>
                <button className="mt-2 w-full border border-gray-300 rounded p-1 text-green-600 text-sm">
                  ADD
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Savings Corner */}
        <div className="bg-white rounded-lg shadow-sm mb-4 p-4">
          <h2 className="text-gray-500 font-medium mb-2">SAVINGS CORNER</h2>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-orange-500 text-white p-2 rounded mr-3">
                <Info className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium">Save ₹80 on this order</p>
                <p className="text-sm text-gray-500">View all coupons &gt;</p>
              </div>
            </div>
            <button className="px-4 py-2 text-orange-500 border border-orange-500 rounded-lg">
              Apply
            </button>
          </div>
        </div>

        {/* Delivery Options */}
        <div className="bg-white rounded-lg shadow-sm mb-20 overflow-hidden">
          <div className="flex border-b">
            <button className="flex-1 px-4 py-3 bg-black text-white text-center">
              Delivery Type
            </button>
            <button className="flex-1 px-4 py-3 text-center">
              Tip
            </button>
            <button className="flex-1 px-4 py-3 text-center">
              Instructions
            </button>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="font-medium">Express</span>
                  <span className="ml-2 line-through text-sm">₹29</span>
                  <span className="ml-1 text-green-600">FREE</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Fastest delivery, directly to you!</p>
              </div>
              <div className="w-4 h-4 rounded-full border-2 border-purple-600 bg-purple-600"></div>
            </div>
            <p className="text-sm bg-gray-50 p-2 rounded text-gray-600">
              Free upgrade with One BLCK
            </p>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <div>
            <div className="flex items-center text-gray-600 mb-1">
              <img src="https://www.mastercard.co.in/content/dam/public/mastercardcom/in/en/logos/mc-logo-52.svg" 
                alt="Credit card" 
                className="w-8 h-8 mr-2"
              />
              <span>Credit card •• 3829</span>
            </div>
            <p className="text-green-600 text-sm">Additional ₹36 cashback</p>
          </div>
          <button className="bg-[#60B246] text-white px-8 py-3 rounded-lg">
            Pay ₹{totalAmount}
          </button>
        </div>
      </div>

      {/* Share Modal */}
      {shareLink && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center p-4">
          <div className="bg-[#F5F5F7] rounded-t-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Share</h3>
                <button onClick={() => setShareLink('')} className="p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="bg-white rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-600 mb-2">Hey, I think you'll like ordering from {items[0]?.restaurantName}</p>
                <p className="text-sm text-gray-500">{shareLink}</p>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6">
                <button className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-[#007AFF] rounded-full flex items-center justify-center mb-1">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-xs">Mail</span>
                </button>
                <button className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-[#34B7F1] rounded-full flex items-center justify-center mb-1">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-7 h-7" />
                  </div>
                  <span className="text-xs">WhatsApp</span>
                </button>
                <button className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-[#00B900] rounded-full flex items-center justify-center mb-1">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" alt="LINE" className="w-7 h-7" />
                  </div>
                  <span className="text-xs">LINE</span>
                </button>
                <button className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center mb-1">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png" alt="Messages" className="w-7 h-7" />
                  </div>
                  <span className="text-xs">Messages</span>
                </button>
              </div>

              <button
                onClick={copyToClipboard}
                className="w-full py-3 bg-white rounded-xl flex items-center justify-center space-x-2 mb-2"
              >
                <Copy className="w-5 h-5" />
                <span>Copy</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;