import { useState } from "react";

import React from "react";
import { Statistics } from "./components/Statistics";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = good / all;

  const setGoodHandler = () => {
    setGood(good + 1);
  };

  const setNeutralHandler = () => {
    setNeutral(neutral + 1);
  };

  const setBadHandler = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <button onClick={setGoodHandler}>Good</button>
        <button onClick={setNeutralHandler}>Neutral</button>
        <button onClick={setBadHandler}>Bad</button>
      </div>
      <Statistics props={{ good, neutral, bad, all, average, positive }} />
    </div>
  );
};

export default App;
