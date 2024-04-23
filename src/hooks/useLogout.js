const useLogout = () => {
  const logout = async () => {
    try {
      // Making a POST request to the backend logout endpoint using Fetch
      const response = await fetch('http://localhost:5000/api/auth/logoutuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to logout');
      }

      const data = await response.json();
      console.log(data.message); // Log the success message from the server

      // Clear local storage or any other storage where authentication data is stored
      localStorage.removeItem('app-user');  // Assuming the key 'user' is used to store user data
      localStorage.removeItem('token'); // Clear the token if stored in local storage

      // Optionally, handle post-logout logic here, like redirecting
      window.location.href = '/login'; // Redirects to the login page after logout
    } catch (error) {
      console.error("Failed to logout:", error.message);
    }
  };

  return logout;
};

export default useLogout;