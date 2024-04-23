
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
  
        // Optionally, handle post-logout logic here, like redirecting
        window.location.href = '/login'; // Redirects to the login page after logout
      } catch (error) {
        console.error("Failed to logout:", error.message);
      }
    };
  
    return logout;
  };
  
export default useLogout;
  