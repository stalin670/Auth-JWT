import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {

  const navigate = useNavigate();
  const [quote, setQuote] = useState("");
  const [tempquote, setTempQuote] = useState("");

  async function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  async function populateQuote() {
    const req = await fetch('http://localhost:4000/api/quote', {
      headers : {
        'x-access-token' : localStorage.getItem('token'),
      },
    })

    const data = await req.json();
    if(data.success) {
      setQuote(data.quote);
    }
    else {
      alert(data.error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) { 
      const user = parseJwt(token);
      if(!user) {
        localStorage.removeItem('token');
        navigate('/login');
      }
      else {
        populateQuote()
      }
    }

  }, []);

  async function updateQuote(event) {
    event.preventDefault();
    const req = await fetch('http://localhost:4000/api/quote', {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
        'x-access-token' : localStorage.getItem('token'),
      },
      body : JSON.stringify({
        quote : tempquote,
      }),
    })

    const data = await req.json();
    if(data.success) {
      setQuote(tempquote);
      setTempQuote('');
    }
    else {
      alert(data.error);
    }
  }

  return (
    <div>
      <h1> Your quote : { quote || 'No quote found' } </h1>
      <form onSubmit={updateQuote}>
        <input type = 'text' 
              placeholder='Quote' 
              value={tempquote} 
              onChange = {(e) => setTempQuote(e.target.value)} />
        <input type='submit' value="Update Quote" />
      </form>
    </div>
  )
}
