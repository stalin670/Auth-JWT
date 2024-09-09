import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/register.css";

export const Register = () => {
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          email,
          password,
        }),
      });

      const data = await response.json();
      // console.log(data)
      if (data.success) {
        alert("Registered Successful");
        navigate("/login");
      } else {
        alert("User Already Exist, Please Login !");
        navigate("/login");
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Form-Container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          value={userName}
          onChange={(e) => setuserName(e.target.value)}
          placeholder="userName"
        />
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
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an account ?{" "}
        <button onClick={() => navigate("/login")}>Login</button>
      </p>
    </div>
  );
};
