import { useEffect, useState } from "react";
import api from "../services/Api";

function UserInvestments() {
    const [investments, setInvestments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedInvestment, setSelectedInvestment] = useState(null);
    const [withdrawError, setWithdrawError] = useState(null);
    const [withdrawLoading, setWithdrawLoading] = useState(false);
    const [withdrawMessage, setWithdrawMessage] = useState('');

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const response = await api.get("/api/v2/investments/user");
        console.log("API Response:", response.data); // Debug log
        setInvestments(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        if (error.response && error.response.data) {
          setError(error.response.data);
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  const handleWithdraw = async () => {
    setWithdrawLoading(true);
    setWithdrawError(null);
    setWithdrawMessage(''); // Reset previous message

    try {
        const response = await api.put("/api/v2/investments/withdraw", {
            investmentReferenceId: selectedInvestment.referenceId,
        });

        setWithdrawMessage(response.data); // Assuming response.data is the success message
        // Refresh investments without full page reload
        const updatedInvestments = await api.get("/api/v2/investments/user");
        setInvestments(Array.isArray(updatedInvestments.data) ? updatedInvestments.data : []);
    } catch (error) {
        if (error.response && error.response.data) {
            setWithdrawError(error.response.data);
        } else {
            setWithdrawError('An unexpected error occurred. Please try again.');
        }
    } finally {
        setWithdrawLoading(false);
    }
};

  if (loading) return <p>Loading investments...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="py-3 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
    {investments.length === 0 ? (
      <p>No investments found.</p>
    ) : (
      <ul className="w-full divide-y divide-gray-200 dark:divide-gray-700">
        {investments.map((investment) => (
          <li
            key={investment.id}
            onClick={() => {
              setSelectedInvestment(investment);
              setShowModal(true);
            }}
            className="py-3 sm:py-4 bg-gray-800 rounded-2xl mb-3 w-full cursor-pointer hover:bg-gray-700"
          >
            <div className="grid grid-cols-3 items-center space-x-4 px-4">
              <div className="col-span-2 min-w-0">
                <p className="text-sm font-medium text-white">
                  <label htmlFor="">Reference ID: </label>
                  {investment.referenceId}
                </p>
                <p className="text-sm font-medium text-white">
                  {investment.investmentOptionName}
                </p>
                <p className="text-xs text-gray-400">
                  Created At:{" "}
                  {investment.createdAt
                    ? new Date(investment.createdAt).toLocaleString()
                    : "N/A"}
                </p>
                <p className="text-xs text-gray-400">
                  Withdrew At:{" "}
                  {investment.end_time
                    ? new Date(investment.end_time).toLocaleString()
                    : "N/A"}
                </p>
              </div>
              <div className="text-base font-semibold text-white text-right">
                Amount: ${investment.amount}
                <br />
                Payout: ${investment.payout || "N/A"}
              </div>
            </div>
          </li>
        ))}
      </ul>
    )}

    {/* Modal */}
    {showModal && selectedInvestment && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">Withdraw Investment</h2>
          <p>Are you sure you want to withdraw this investment?</p>
          <p className="mt-2">
              <strong>Reference ID:</strong> {selectedInvestment.referenceId}
          </p>
          {withdrawError && (
              <p className="text-red-500 mt-2">{withdrawError}</p>
          )}
          {withdrawMessage && (
              <p className="text-green-500 mt-2">{withdrawMessage}</p> // Display success message
          )}
          <div className="mt-4 flex justify-end space-x-4">
              <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                  Cancel
              </button>
              <button
                  onClick={handleWithdraw}
                  disabled={withdrawLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                  {withdrawLoading ? "Processing..." : "Withdraw"}
              </button>
          </div>
      </div>
  </div>
  
    )}
  </div>
  );
}

export default UserInvestments;
