import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

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
}