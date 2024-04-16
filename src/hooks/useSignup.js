import { useState } from "react";
import { useAuthContext } from "../context/AuthContext.jsx"
import toast from "react-hot-toast"

const useSignup = () => {
    
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const signup = async ({ username,email,password,confirmPassword,height,weight,age,gender}) => {

        const success = handleInputValidation({username,email,password,confirmPassword,height,weight,age,gender})
        if (!success) return;

        setLoading(true);
        try {
            
            //sends to the backend where registration is happening
            const res = await fetch(`/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({username,email,password,confirmPassword,height,weight,age,gender})
            })

            //response from the backend after registration
            const data = await res.json();
            if (data.error) {
                toast.error(error.message)
            }

            console.log(data)

            //save to local storage
            localStorage.setItem('app-user', JSON.stringify(data))

            //set the user to auth context
            setAuthUser(data);

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    return { loading, signup }

}
export default useSignup

// input validation //

//check if all fields have values
function handleInputErrors({username,email,password,confirmPassword,height,weight,age,gender}) {
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