import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [quote, setQuote] = useState("");

  useEffect(() => {
    async function populateQuote() {
      const req = await fetch("http://localhost:4000/api/quote", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await req.json();
      console.log(data);
      if (data.success) {
        setQuote(data.quote);
      } else {
        if (req.status == 401) {
          navigate("/login");
        } else {
          alert("OOPs something went wrong!");
        }
      }
    }
    populateQuote();
  }, []);

  async function updateQuote(event) {
    event.preventDefault();
    const req = await fetch("http://localhost:4000/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        quote: quote,
      }),
    });

    const data = await req.json();
    if (data.success) {
      setQuote(quote);
    } else {
      alert(data);
    }
  }

  return (
    <div>
      <h1> Your quote : {quote || "No quote found"} </h1>
      <form onSubmit={updateQuote}>
        <input
          type="text"
          placeholder="Quote"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
        />
        <input type="submit" value="Update Quote" />
      </form>
    </div>
  );
};
