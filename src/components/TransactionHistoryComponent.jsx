import { useEffect, useState } from 'react';
import api from '../services/Api'; // Axios instance

function TransactionHistoryComponent() {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchTransactions = async () => {
        try {
          const res = await api.get('/api/v1/banking/transactions');
          setTransactions(res.data);
        } catch (error) {
            if(error.response && error.response.data){
                setError(error.response.data)
              }
                else {
                  setError('An unexpected error occurred. Please try again.'); // Handle other errors
                }
            }
      };
  
      fetchTransactions();
    }, []);
  
    return (
      <div className='py-3 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto'>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mt-4 py-3">
          <h2 className="font-bold text-2xl text-center mb-5">Transaction History</h2>
          {transactions.length === 0 ? (
            <p>No transactions found.</p>
          ) : (
            <ul className="w-full divide-y divide-gray-200 dark:divide-gray-700">
              {transactions.map((transaction) => (
                <li key={transaction.id} className="py-3 sm:py-4 bg-gray-800 rounded-2xl mb-3 w-full">
                  <div className="grid grid-cols-3 items-center space-x-4 px-4">
                    <div className="col-span-2 min-w-0">
                      <p className="text-sm font-medium text-white">
                        {transaction.transactionType}
                      </p>
                      <div className='flex items-center justify-between'>
                        <p className="text-sm text-gray-400">
                            Reciever Account Number: {transaction.recipient} 
                        </p>
                        <p className="text-sm text-gray-400">
                            Sender Account Number: {transaction.sender} 
                        </p>
                      </div>
                      <p className="text-sm text-gray-400">
                        Description: {transaction.description}
                      </p>
                      <p className="text-xs text-gray-400">
                        Date: {new Date(transaction.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-base font-semibold text-white text-right">
                      ${transaction.amount}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
  
export default TransactionHistoryComponent;
