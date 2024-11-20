import { useEffect, useState } from 'react';
import api from '../services/Api';
import { Loader2 } from 'lucide-react';
import UpdateForm from '../components/UpdateForm';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/profile');
        setProfile(res.data);
      } catch (error) {
        if(error.response && error.response.data){
          setError(error.response.data)
        }
          else {
            setError('An unexpected error occurred. Please try again.'); // Handle other errors
          }
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <main className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center">
          <div className="w-full max-w-lg">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-center">{error}</p>
              </div>
            )}

            {!profile && !error ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
              </div>
            ) : profile && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-8">
                  <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
                    Profile of {profile.username}
                  </h1>
                  
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-600 mb-2 sm:mb-0">Email:</span>
                      <span className="text-gray-800 break-all">{profile.email}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-600 mb-2 sm:mb-0">Password:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-800">••••••••</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-600 mb-2 sm:mb-0">Balance:</span>
                      <span className="text-gray-800">${profile.balance.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-600 mb-2 sm:mb-0">PIN:</span>
                      <span className="text-gray-800">{profile.pin}</span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <button onClick={() => setIsModalOpen(true)} className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      Edit Profile
                    </button>
                  </div>
                </div>
                <UpdateForm 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}

                  />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;