import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {loading, login} = useLogin()

    const handleSubmit = async(e) => {
        e.preventDefault();
        await login(username, password)
    }
    return (
        <h1>Login</h1>
    );
 }

 export default Login;