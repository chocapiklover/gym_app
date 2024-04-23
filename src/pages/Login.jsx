import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../hooks/useLogin.js'


//STILL IN DEVELOPMENT
const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const {login} = useLogin()

    const handleSubmit = async(e) => {
        e.preventDefault();
        await login(username, password)
    } 
    
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-xs p-8 space-y-3 bg-white rounded shadow-md">
                <h1 className="text-xl font-semibold text-center">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    />
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    >
                        Sign In
                    </button>
                </form>
                <p className="text-xs text-center text-gray-500">
                    No account? <Link to="../signup" className="text-blue-500 hover:text-blue-800">Register</Link>
                </p>
            </div>
        </div>
    );
 }

 export default Login;