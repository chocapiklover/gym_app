import React from 'react';
import { useAuthContext } from '../context/AuthContext.jsx';

const UserProfile = () => {
    // Access the authentication context
    const { authUser } = useAuthContext();
    console.log(authUser);


    // Check if there is an authenticated user and display the username
    return (
        <div>
            {authUser && authUser.user ? (  // Ensure both authUser and authUser.user are not null
                <p>Welcome, {authUser.user.username}!</p>
            ) : (
                <p>No user is currently logged in.</p>
            )}
        </div>
    );
};

export default UserProfile;
