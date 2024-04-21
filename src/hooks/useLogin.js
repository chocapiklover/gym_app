import { useState } from "react";
import { toast } from'react-hot-toast';
import { useAuthContext } from "../context/AuthContext";


const useLogin = () => {

    const [loading, setLoading] = useState(false);

    const { setAuthUser } = useAuthContext();

    const login = async (username, password) => {
        
        const success = handleInputErrors(username, password)
        if (!success) return;

        setLoading(true);
        try {
            //attempt to log in by sending POST req to 
            const res = await fetch('http://localhost:5000/api/auth/loginuser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })

            //parse the JSON response from the server
            const data = await res.json();

            //if there was an error, throw exception
            if(data.error) {
                throw new Error(data.error);
            }

            //on successful login, set user to local storage
            localStorage.setItem('app-user', JSON.stringify(data));
            console.log('app-user set to local storage');

            //set user to auth context
            setAuthUser(data);

            toast.success('Successfully logged in');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }

    }
    return { login, loading };
}

export default useLogin;

function handleInputErrors(username, password) {
    if (!username || !password){
        toast.error('Please fill in all fields')
        return false;
    }
    return true;
}