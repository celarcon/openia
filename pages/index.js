import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [skillInput, setskillInput] = useState("");
  const [answerInput, setanswerInput] = useState("");
  const [result, setResult] = useState();
  const submitButton = `Submit \"${skillInput}\"`;
  const [saved, setSaved] = useState();
  const [updateResponses, setUpdateResponses] = useState();
  const [allResponses, setAllResponses] = useState([]);

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answerInput, skill: skillInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setskillInput("");
    setSaved(localStorage.getItem('response'));
    setUpdateResponses(saved);
    setAllResponses([localStorage.getItem('allResponses')].concat(allResponses));
  }

// add result to local storage as a response
useEffect(() => {
    localStorage.setItem('response', JSON.stringify(result || "" ));
}, [result]);

 useEffect(() => {
 //getting stored value
  const saved = localStorage.getItem('response');
  const newResponse = JSON.parse(saved);
  localStorage.setItem('allResponses', JSON.stringify(newResponse || ""));
 });

  return (
    <div>
      <Head>
        <title>Santi ejemplo ia</title>
      </Head>

      <main className={styles.main}>
        <h3>Dale enter para generar</h3>
        <form onSubmit={onSubmit}>
          <textarea 
           onChange={(e) => setanswerInput(e.target.value)}
           name="answer" rows="4" cols="50">
            {answerInput}
          </textarea>
          <input
            type="text"
            name="skill"
            placeholder="Enter an skill"
            value={skillInput}
            onChange={(e) => setskillInput(e.target.value)}
          />
          <input type="submit" value={submitButton}/>
        </form>
        <div className="response-container">
        <div className={styles.result}>
            <h2>Última respueseta</h2>
            {result}
            </div>
        <h3>Todas las respuestas</h3>
        {allResponses}
        </div>
      </main>
    </div>
  );
}
