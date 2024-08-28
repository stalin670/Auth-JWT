import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"
import '../style/login.css'

export const Login = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault();
    
        try {
          const response = await fetch("http://localhost:4000/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          });
    
          const data = await response.json();

          if(data.user) {
            alert('Login Successful')
            navigate('/Dashboard')
          }
          else {
            alert('Username or Password is Incorrect')
          }
    
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <div className="Form-Container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type='submit' >Login</button>
        </form>
        <p>
            Don't have an account ? <button >Signup</button>
        </p>
    </div>
  )
}
