import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

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
        await signup(inputs)// when the user submits form, calls useSignup hook to handle signup
    } 
    return (
        <h1>Sign Up</h1>
    );
}

export default SignUp;
