{/*import { StrictMode } from 'react'*/}
import { createRoot } from 'react-dom/client';
import { useState } from "react";
{/*import './index.css'*/}
{/*import App from './App.jsx'*/}

function Typing_design() {
  const quote = "The quick brown fox jumps over the lazy dog.";
  const [typed_quote, set_typed_quote] = useState("");
  const [start_time, set_start_time] = useState(null);
  const [end_time, set_end_time] = useState(null);
  const [result, set_result] = useState(null);

  function Start_typing() {
    set_start_time(Date.now());
  }

  function Now_typing(e) {
    set_end_time(Date.now());
    set_typed_quote(e.target.value);
  }

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
    <div>
      <h3>typing speed test</h3>
      <p>{quote}</p>
      <textarea rows="3" cols="50" onFocus={Start_typing} onChange={Now_typing}/>
      <button onClick={End_typing}>Submit</button>

      {result && (
        <div>
          <p>{result.raw_wpm}</p>
          <p>{result.accuracy}</p>
          <p>{result.wpm}</p>
        </div>
      )}

    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <Typing_design/>
)
