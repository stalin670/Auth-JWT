import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://auth-jwt-tqb4.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log("amitist", data)
        alert("Login Successful");
        // localStorage.setItem('token', data.token);
        navigate("/Dashboard");
      } else {
        alert("Email or Password is Incorrect");
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Form-Container-Login">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account ?{" "}
        <button onClick={() => navigate("/register")}>Signup</button>
      </p>
    </div>
  );
};
