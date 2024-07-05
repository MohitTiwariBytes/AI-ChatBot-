import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./Home.css";

const Home = () => {
  const [result, setResult] = useState("");
  const [promptInp, setPrompt] = useState("");
  const [typingEffect, setTypingEffect] = useState("");

  const genAI = new GoogleGenerativeAI(
    "AIzaSyB6k9SJiJs7981zxqQ_2V2H9G8UU0Z4Na8"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  function handleInput(e) {
    setPrompt(e.target.value);
  }

  async function run() {
    const prompt = promptInp;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Simulate typing effect with faster speed
    const characters = text.split("");
    let typingResult = "";

    for (let i = 0; i < characters.length; i++) {
      typingResult += characters[i];
      await new Promise((resolve) => setTimeout(resolve, 5)); // Faster typing speed (adjust as needed)
      setTypingEffect(typingResult);
    }

    setResult(text); // Set the full text after typing effect completes
  }

  return (
    <div style={{ height: "100%" }}>
      <div className="input">
        <input onChange={handleInput} type="text" placeholder="Chat with AI!" />
        <div className="button">
          <button onClick={run}>
            <i className="fa-solid fa-arrow-up fa-2x"></i>
          </button>
        </div>
      </div>
      <div className="content">
        <p>{typingEffect}</p>
      </div>
    </div>
  );
};

export default Home;
