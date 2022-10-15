import { useState } from "react";

import React from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

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
      <h1>give feedback</h1>
      <div>
        <button onClick={setGoodHandler}>Good</button>
        <button onClick={setNeutralHandler}>Neutral</button>
        <button onClick={setBadHandler}>Bad</button>
      </div>
      <h1>statistics</h1>
      <div>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
      </div>
    </div>
  );
};

export default App;
