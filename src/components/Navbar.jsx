import React from 'react';
import { Link } from 'react-router-dom';
import useLogout from '../hooks/useLogout';

const Navbar = () => {

  const logout = useLogout();


  return (
    <nav className="bg-gray-800 text-white p-4 fixed inset-x-0 bottom-0 z-50 rounded-full mx-6 my-4">
    <div className="container mx-auto flex justify-between items-center">
      <div className="text-lg font-bold">
        <Link to="/" className="hover:text-gray-300">Workouts</Link>
      </div>
      <div>
        <ul className="flex space-x-4">
          <li><Link to="/profile" className="hover:text-gray-300">usernamehere</Link></li>
          <button onClick={logout}>Logout</button>
        </ul>
      </div>
    </div>
  </nav>
  
  );
}

export default Navbar;