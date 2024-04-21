import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 fixed inset-x-0 bottom-0 z-50">
    <div className="container mx-auto flex justify-between items-center">
      <div className="text-lg font-bold">
        <Link to="/" className="hover:text-gray-300">MyApp</Link>
      </div>
      <div>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
          <li><Link to="/login" className="hover:text-gray-300">Login</Link></li>
          <li><Link to="/signup" className="hover:text-gray-300">Sign Up</Link></li>
        </ul>
      </div>
    </div>
  </nav>
  
  );
}

export default Navbar;