import { useState } from "react"
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";


function NavBar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () =>{
    setIsMenuOpen(!isMenuOpen)
  }


  return (
    <nav className="bg-gray-900 p-4">
      <div className="flex items-center justify-between">
        <div className="text-white text-2xl font-bold">BankLogo</div>

        <div className="md:hidden">
          <button className="text-white" onClick={toggleMenu}>
            <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth= '2'
                viewBox="0 0 24 24"
                className="w-6 h-6"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <ul className="hidden md:flex space-x-4 items-center">
          <li className="px-2 "><Link to="/home" className="text-white">Home</Link></li>
          <li className="px-2 "><Link to="/transaction" className="text-white">Transactions</Link></li>
          <li className="px-2 "><Link to="/investment" className="text-white">investments</Link></li>
          <li className="px-2 "><Link to="/profile" className="text-white">Profile</Link></li>
          <li className="px-2 "><LogoutButton/></li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen ? (
          <ul className="flex-col md:hidden">
            <li className="py-2 "><Link to="/home" className="text-white">Home</Link></li>
            <li className="py-2 "><Link to="/transaction" className="text-white">Transactions</Link></li>
            <li className="py-2 "><Link to="/investment" className="text-white">investments</Link></li>
            <li className="py-2 "><Link to="/profile" className="text-white">Profile</Link></li>
            <li className="py-2"><LogoutButton/></li>
        </ul>
      ): null}

    </nav>
  )
}

export default NavBar