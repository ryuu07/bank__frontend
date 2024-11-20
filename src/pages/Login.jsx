import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from "../services/Api"

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { username, password });
      const token = response.data; // Assuming the token is returned directly
      sessionStorage.setItem('token', token); // Save token in sessionStorage
      navigate('/home'); // Redirect to the dashboard
    } catch (error) {
      if(error.response && error.response.data){
        setErrorMessage(error.response.data)
      }
        else {
          setErrorMessage('An unexpected error occurred. Please try again.'); // Handle other errors
        }
    }
  };

  // return (
  //   <div>
  //     <h1>Login</h1>
  //     <form onSubmit={handleLogin}>
  //       <input
          // type="text"
          // placeholder="Username"
          // value={username}
          // onChange={(e) => setUsername(e.target.value)}
          // required
  //       />
        // <input
        //   type="password"
        //   placeholder="Password"
        //   value={password}
        //   onChange={(e) => setPassword(e.target.value)}
        //   required
        // />
  //       <button type="submit">Login</button>
  //     </form>
  //     {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
  //   </div>

    

  // );


  return(
    <section className="bg-gray-50 dark:bg-gray-900 w-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Sign in to your account
                  </h1>
                  <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleLogin}>
                      <div>
                          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                          <input 
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required name="username" id="username" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                      </div>
                      <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                      </div>
                      <div className="flex items-center justify-between">
                      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
                      </div>
                      <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          Don’t have an account yet? <Link to="/register" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</Link>
                      </p>
                  </form>
              </div>
          </div>
      </div>
    </section>
  )
};

export default Login;