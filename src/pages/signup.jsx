import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        height: '',
        weight: '',
        age: '',
        gender: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle the sign up logic
        console.log("Signup info:", inputs);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-xs p-8 space-y-3 bg-white rounded shadow-md">
                <h1 className="text-xl font-semibold text-center">Sign Up</h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {Object.keys(inputs).map(input => (
                        <input
                            key={input}
                            type={input.includes('password') ? 'password' : input === 'email' ? 'email' : 'text'}
                            name={input}
                            placeholder={input.charAt(0).toUpperCase() + input.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                            value={inputs[input]}
                            onChange={handleChange}
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        />
                    ))}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-xs text-center text-gray-500">
                    Already have an account? <Link to="../login" className="text-blue-500 hover:text-blue-800">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
