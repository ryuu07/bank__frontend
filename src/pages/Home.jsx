import { useEffect, useState } from 'react'
import api from '../services/Api';
import TransactionHistoryComponent from '../components/TransactionHistoryComponent';

function Home() {

  const [text,setText] = useState("");
  const [errorMessage, setErrorMessage] = useState(''); 

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const res = await api.get("/home");
        setText(res.data)
      } catch (error) {
        if(error.response && error.response.data){
          setErrorMessage(error.response.data)
        }
          else {
            setErrorMessage('An unexpected error occurred. Please try again.'); // Handle other errors
          }
      }
    };
    fetchData();
  },[]);

  return (
    <div>
      <h1 className=' pt-4 font-extrabold text-xl'> Welcome Home, {text} !!</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
      <TransactionHistoryComponent/>
    </div>
  )
}

export default Home