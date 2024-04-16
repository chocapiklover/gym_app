import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import useSignup from '../hooks/useSignup.js'

//STILL IN DEVELOPMENT
const SignUp = () => {
    const [inputs, setInputs] = useState({
        username: '',
        email:'',
        password: '',
        confirmPassword: '',
        height:'',
        weight: '',
        age: '',
        gender: '',
    })

    const { loading, signup } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs)// when the user submits form, calls useSignup hook to handle signup
    } 

    //TODO: Form for signup
    return (
        <h1>Sign Up</h1>
    );
}

export default SignUp;