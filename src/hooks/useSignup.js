import { useState } from "react";
import { useAuthContext } from "../context/AuthContext.jsx"
import toast from "react-hot-toast"

const useSignup = () => {
    
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const signup = async ({ username,email,password,confirmPassword,height,weight,age,gender}) => {

        const success = handleInputValidation({username,email,password,confirmPassword,height,weight,age,gender})
        console.log('success')
        if (!success) return;

        setLoading(true);
        try {
            
            //sends to the backend where registration is happening
            const res = await fetch(`/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({username,email,password,confirmPassword,height,weight,age,gender})
            })

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            
            let data = {};
            if (res.headers.get("content-type")?.includes("application/json")) {
                data = await res.json(); // Parse JSON only once here

                if (data.error) {
                    toast.error(data.error);
                } else {
                    console.log(data);

                    // Save to local storage
                    localStorage.setItem('app-user', JSON.stringify(data));
                    console.log('app-user');

                    // Set the user to auth context
                    setAuthUser(data);
                }
            } else {
                console.error("Did not receive JSON");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, signup }

}
export default useSignup

// input validation //

//check if all fields have values
function handleInputValidation({username,email,password,confirmPassword,height,weight,age,gender}) {
    if (!username || !email || !password || !confirmPassword || !gender || !height || !weight || !age ){
        toast.error('Please fill in all the fields')
        return false;
    }

    if (password !== confirmPassword) {
        toast.error('Password must be matching')
        return false;
    }

    if (password.length < 6) {
        toast.error('Password must be at least 6 characters')
        return false;
    }

    return true;
}