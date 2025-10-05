{/*import { StrictMode } from 'react'*/}
import { createRoot } from 'react-dom/client';
import { useState, useEffect } from "react";
import './index.css'
{/*import App from './App.jsx'*/}

function Typing_design() {
  const [quote, set_quote] = useState("");
  const [typed_quote, set_typed_quote] = useState("");
  const [start_time, set_start_time] = useState(null);
  const [end_time, set_end_time] = useState(null);
  const [result, set_result] = useState(null);

  async function Fetch_quote() {
    const response = await fetch("http://localhost:8080/api/typing/quote");
    const data = await response.json();
    set_quote(data.quote);
  }

  useEffect(() => {
    async function loadQuote() {
      try {
        await Fetch_quote();
      } catch {
        set_quote("Failed to load quote. Please refresh.");
      }
    }
    loadQuote();
    function Handle_key_down(e) {
      if (!start_time) {
        set_start_time(Date.now());
      }

      if (e.key.length === 1) {
        set_typed_quote((prev) => prev + e.key);
        set_end_time(Date.now());
      } else if (e.key === "Backspace") {
        set_typed_quote((prev) => prev.slice(0, -1));
        set_end_time(Date.now());
      } else if (e.key === "Enter") {
        End_typing();
      }
    }
    window.addEventListener("keydown", Handle_key_down);
    return () => window.removeEventListener("keydown", Handle_key_down);
  }, []);

  async function End_typing() {
    const response = await fetch("http://localhost:8080/api/typing/result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quote,
        typed_quote,
        start_time,
        end_time
      }),
    });

    const data = await response.json();
    set_result(data);
  }

  return (
    <>
      <div>
        <h3>typing speed test</h3>
        <p>{quote}</p>
        <p>
          {quote.split("").map((char, index) => {
            let typed_char = typed_quote[index]; 
            let correct_name = ""; 
            if (typed_char != null) {
              correct_name = typed_char === char ? "correct" : "incorrect";
            } 
            
            return (
              <span key={index} className={correct_name}>
                {char}
              </span>
            );
            
            })}
          </p>

        {result && (
          <div>
            <p>Raw WPM: <b>{result.raw_wpm}</b></p>
            <p>Accuracy%: <b>{result.accuracy}</b></p>
            <p>WPM: <b>{result.wpm}</b></p>
          </div>
        )}
      </div>

      <div>
        <a href="https://github.com/amypearlt/typer">GitHub</a>
      </div>
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <Typing_design/>
)