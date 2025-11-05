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
  const [finished, set_finished] = useState(false);

  async function Fetch_quote() {
    const response = await fetch(`https://api.quotable.io/quotes/random/?limit=3&cacheBust=${Date.now()}`);
    const data = await response.json();
    set_quote(data.map(q => q.content).join(" "));
  };

  async function Load_quote() {
    try {
      await Fetch_quote();
    } catch {
      set_quote("Failed to load quote. Please refresh.");
    }
  }

  async function Reset_fetch () {
    set_typed_quote("");
    set_start_time(null);
    set_end_time(null);
    set_result(null);
    set_finished(false);

    Load_quote();
  }

  useEffect(() => {
    Load_quote();
  }, []);

  useEffect(() => {
    function Handle_key_down(e) {
      if (finished) return;

      if (!start_time) {
        set_start_time(Date.now());
      }

      if (e.key.length === 1) {
        const updated = typed_quote + e.key;
        set_typed_quote(updated);
        set_end_time(Date.now());
        if (updated === quote) {
          End_typing(updated);
        }

        const quote_words = quote.trim().split(/\s+/);
        const quote_last_word = quote_words[quote_words.length - 1];
        const typed_words = updated.trim().split(/\s+/);
        const typed_last_word = typed_words[typed_words.length - 1];

        if (typed_last_word === quote_last_word) {
          End_typing(updated);
        }
      } else if (e.key === "Backspace") {
        set_typed_quote((prev) => prev.slice(0, -1));
        set_end_time(Date.now());
      } else if (e.key === "Enter") {
        End_typing();
      }
    }
    window.addEventListener("keydown", Handle_key_down);
    return () => window.removeEventListener("keydown", Handle_key_down);
  }, [quote, start_time, typed_quote]);

  async function End_typing(final_typed_quote = typed_quote) {
    if (finished) return;
    set_finished(true);
    const final_quote = quote;
    const final_start_time = start_time;
    const final_end_time = Date.now(); 
    const payload = {
      quote: final_quote,
      typed_quote: final_typed_quote,
      start_time: final_start_time,
      end_time: final_end_time
    };
    console.log("Sending to backend:", payload);

    const response = await fetch("http://localhost:8081/api/typing/result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    set_result(data);
  }

  return (
    <>
      <div className="header"><h2>typing...</h2></div>
      <div>
        <p className="quote">
          {quote.split("").map((char, index) => {
            let typed_char = typed_quote[index]; 
            let correct_name = ""; 
            if (typed_char != null) {
              correct_name = typed_char === char ? "correct" : "incorrect";
            }
            
            return (
              <span key={index} className={correct_name}>
                {char}
                {index === typed_quote.length - 1 && !finished && <span className="cursor"></span>}
              </span>
            );
            
          })}
        </p>

        {result && (
          <div>
            <p>Raw WPM: <b>{result.raw_wpm}</b></p>
            <p>Accuracy%: <b>{result.accuracy}</b></p>
            <p>WPM: <b>{result.wpm}</b></p>
            <p onClick={Reset_fetch}><b>Redo?</b></p>
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