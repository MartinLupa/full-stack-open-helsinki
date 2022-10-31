import { useState } from "react";

import React from "react";
import { Button } from "./components/Button";
import { Statistics } from "./components/Statistics";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = good / all;

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button eventHandler={handleGoodClick} text="Good" />
        <Button eventHandler={handleNeutralClick} text="Neutral" />
        <Button eventHandler={handleBadClick} text="Bad" />
      </div>
      <Statistics props={{ good, neutral, bad, all, average, positive }} />
    </div>
  );
};

export default App;
