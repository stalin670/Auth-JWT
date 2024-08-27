import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import '../style/register.css'

export const Register = (event) => {
    event.preventDefault();

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    // const navigate = useNavigate()

    async function handleSignup() {
        const response = await fetch('http://localhost:4000/api/register', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                name,
                email, 
                password,
            }),
        })

        const data = await response.json();

        console.log(data);
    }

  return (
    <div className="Form-Container">
        <h2>Sign Up</h2>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        <button onClick={handleSignup}>Signup</button>
        <p>
            Already have an account ? <button>Login</button>
        </p>
    </div>
  )
}
