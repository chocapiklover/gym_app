import React from 'react';
import { Link } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import { useAuthContext } from '../context/AuthContext.jsx';


const Navbar = () => {

  const logout = useLogout();
  const { authUser } = useAuthContext();
  console.log(authUser);


  return (
    <nav className="bg-gray-800 text-white p-4 fixed inset-x-0 bottom-0 z-50 rounded-full mx-6 my-4">
    <div className="container mx-auto flex justify-between items-center">
      <div className="text-lg font-bold">
        <Link to="/" className="hover:text-gray-300">Workouts</Link>
      </div>
      <div>
        <ul className="flex space-x-4">
          {authUser && authUser.user ? (
            <>
              <li>
                <Link to="/profile" className="hover:text-gray-300">
                  {authUser.user.username}
                </Link>
              </li>
              <li>
                <button className="hover:text-gray-300" onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  </nav>
);
}

export default Navbar;