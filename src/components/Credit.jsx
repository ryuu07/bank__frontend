import { useState } from 'react';
import api from '../services/Api';  // Make sure you have an API service set up
import { X } from 'lucide-react';

export default function Credit() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [pin, setPin] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData]= useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Send the credit request with amount, description, and pin
    try {
      const response = await api.post('/api/v1/banking/credit', { 
        amount, 
        description, 
        pin 
      });
      // Handle the response (successful credit)
        console.log('Response Data:', response.data); 
        setData(response.data)
      // Reset form or handle success
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
      setIsModalOpen(false); // Close the modal after submission attempt
      window.location.reload()
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg overflow-hidden w-96 h-[26rem]">
      <h1 className="text-2xl font-bold text-center mb-8">Credit</h1>
      
      {/* Credit Form */}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-11">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            disabled={!amount || Number(amount) <= 0} 
            className="w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Credit Amount
          </button>
        </div>
      </form>

      {/* Error message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Modal for PIN */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Enter PIN</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PIN</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter your PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Submit PIN'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
