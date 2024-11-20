import { useEffect, useState } from 'react';
import api from '../services/Api';

function InvestmentsAvailable() {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [amount, setAmount] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const response = await api.get('/api/v1/investments');

        if (Array.isArray(response.data)) {
          setInvestments(response.data);
        } else {
          setError('Invalid data format. Expected an array of investments.');
        }
      } catch (error) {
        if(error.response && error.response.data){
          setError(error.response.data)
        }
          else {
            setError('An unexpected error occurred. Please try again.'); // Handle other errors
          }
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  const handleInvestmentClick = (investment) => {
    setSelectedInvestment(investment);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/v2/investments', {
        investmentOptionId: selectedInvestment.id,
        amount: Number(amount),
      });
      console.log('Investment successful:', response.data);
      setIsModalOpen(false);
      setAmount('');
      setSubmitError(null);
    } catch (err) {
      setSubmitError(err.response?.data || 'Failed to submit investment. Try again.');
    } finally{
        window.location.reload()
    }
  };

  if (loading) return <p>Loading available investments...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="py-3 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
      {investments.length === 0 ? (
        <p>No investments available.</p>
      ) : (
        <ul className="w-full divide-y divide-gray-200 dark:divide-gray-700">
          {investments.map((investment) => (
            <li
              key={investment.id}
              onClick={() => handleInvestmentClick(investment)}
              className="py-3 sm:py-4 bg-gray-800 rounded-2xl mb-3 w-full cursor-pointer hover:bg-gray-700"
            >
              <div className="grid grid-cols-3 items-center space-x-4 px-4">
                <div className="col-span-2 min-w-0">
                  <p className="text-sm font-medium text-white">
                    {investment.id}. {investment.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    Type: {investment.investmentType}
                  </p>
                  <p className="text-xs text-gray-400">
                    Duration: {investment.durationInDays === null ? 'Infinite' : `${investment.durationInDays} days`}
                  </p>
                  <p className="text-xs text-gray-400">
                    Interest Rate: {investment.interestRate}%
                  </p>
                </div>
                <div className="text-base font-semibold text-white text-right">
                  Minimum Amount: ${investment.minimumAmount}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Invest in {selectedInvestment.name}</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Amount:</label>
                <input
                  type="number"
                  min={selectedInvestment.minimumAmount}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  required
                />
              </div>
              {submitError && <p className="text-red-500 text-sm">{submitError}</p>}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-950"
                >
                  Invest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default InvestmentsAvailable;
