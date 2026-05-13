import { createRoot } from "react-dom/client";
import { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"

function Typing_design() {
  const [quote, set_quote] = useState("");
  const [typed_quote, set_typed_quote] = useState("");
  const [start_time, set_start_time] = useState(null);
  const [end_time, set_end_time] = useState(null);
  const [result, set_result] = useState(null);
  const finished_ref = useRef(false); 

  async function Fetch_quote() {
    const response = await fetch(`https://api.quotable.io/quotes/random/?limit=3&cacheBust=${Date.now()}`);
    const data = await response.json();
    set_quote(data.map(q => q.content).join(" "));
  };

  async function Load_quote() {
    try {
      await Fetch_quote();
    } catch {
      set_quote("Failed to load quote. Refresh or check your Internet connection. Failed to load quote. Refresh or check your Internet connection. Failed to load quote. Refresh or check your Internet connection. Failed to load quote. Refresh or check your Internet connection.");
    }
  }

  async function Reset_fetch() {
    finished_ref.current = false;
    set_quote("");
    set_typed_quote("");
    set_start_time(null);
    set_end_time(null);
    set_result(null);
    Load_quote();
  }

  useEffect(() => {

    Load_quote();
  }, []);

  useEffect(() => {
    function Handle_key_down(e) {
      if (finished_ref.current) {
        if (e.key === "Enter") {
          Reset_fetch();
        } else {return}
      }

      if (!start_time) {
        set_start_time(Date.now());
      }
      
      if (e.key === " " && e.repeat) {
        return;
      } else if (e.key === " ") {
        if (typed_quote.length >= quote.length) return;
        let next_index = typed_quote.length;
        const max_index = quote.length - 1;
        let updated = typed_quote;
        if (quote[next_index] === " ") {
          updated += " ";
          next_index++;
        } else {
          while (next_index <= max_index && quote[next_index] !== " ") {
            updated += "█";
            next_index++;
          }
          if (next_index <= max_index && quote[next_index] === " ") {
            updated += " "
            next_index++;
          }
        }
        set_typed_quote(updated);
        set_end_time(Date.now());

        const last_quote_index = quote.length - 1;
        const last_quote_char = quote[last_quote_index];
        const last_typed_char = updated[last_quote_index] || "";
        if (updated.length - 1 >= last_quote_index && last_typed_char === last_quote_char) {
          End_typing(updated);
        }
      } else if (e.key.length === 1) {
        const updated = typed_quote + e.key;
        set_typed_quote(updated);
        set_end_time(Date.now());
        if (updated === quote) {
          End_typing(updated);
        }

        const last_quote_index = quote.length - 1;
        const last_quote_char = quote[last_quote_index];
        const last_typed_char = updated[last_quote_index] || "";
        if (updated.length - 1 >= last_quote_index && last_typed_char === last_quote_char) {
          End_typing(updated);
        }
      } else if (e.key === "Backspace") {
        set_typed_quote((prev) => prev.slice(0, -1));
        set_end_time(Date.now());
      } else if (e.key === "Enter") {
        Reset_fetch();
      }
    }
    window.addEventListener("keydown", Handle_key_down);
    return () => window.removeEventListener("keydown", Handle_key_down);
  }, [quote, start_time, typed_quote]);

  async function End_typing(final_typed_quote = typed_quote) {
    if (finished_ref.current) return;
    finished_ref.current = true;
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
      <div className="stickyheader container-fluid align-items-center d-flex flex-row justify-content-between px-4 py-1">
        <p className="headerlink fs-4 mb-0"><b>typing...</b></p>
        <p className="headerright fs-2 mb-0">o</p>
      </div>
      <div className="min-vh-100 d-flex flex-column justify-content-center">
        <div className="quotebox container align-items-center">
          <p className="quote text-center px-2 py-3 fs-4">
            {quote.split("").map((char, index) => {
              let typed_char = typed_quote[index]; 
              let sub_char = null;
              let correct_name = ""; 
              if (typed_char != null) {
                if (typed_char === char) {
                  correct_name = "correct";
                } else {
                  correct_name = "incorrect";
                  if (char === " ") {sub_char = typed_char}
                }
              }
              
              return (
                <span key={index} className={correct_name}>
                  {index === typed_quote.length && !finished_ref.current && <span className="cursor"></span>}
                  {sub_char ?? char}
                </span>
              );
            })}
          </p>
          <p onClick={Reset_fetch} className="newquote text-end mt-0"><b>New quote?</b></p>
        </div>

        <div>
          {result && (
            <div className = "resultbox container d-flex flex-row justify-content-center gap-4">
              <div className= "wpmextra text-center text-md-start d-flex flex-column">
                <p className="mb-0">Raw WPM: <b>{result.raw_wpm}</b></p>
                <p className="mb-0">Accuracy%: <b>{result.accuracy}</b></p>
                <div className="wpmlinks">
                  <p className="morestats mb-0"><b>More stats...</b></p>
                  <p onClick={Reset_fetch} className="redo mb-0"><b>Redo?</b></p>
                </div>
              </div>
              <div>
                <p className="wpm container mb-0">WPM<br></br><b>{result.wpm}</b></p>
              </div>
            </div>
          )}
        </div>

        <div> 
          <a href="https://github.com/amypearlt/typer" target="_blank">GitHub</a>
        </div>
      </div>
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <Typing_design/>
)