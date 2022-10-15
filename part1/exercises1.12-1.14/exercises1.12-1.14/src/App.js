import { useState, useEffect } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  let pointsInitialState = new Uint8Array(anecdotes.length);

  const [randomNum, setRandomNum] = useState(0);
  const [selected, setSelected] = useState(0);
  const [points, setPoint] = useState(pointsInitialState);
  const [mostVotedAnecdote, setMostVotedAnecdote] = useState({
    anecdote: anecdotes[0],
    votes: points[0],
  });

  const handleNextAnecdote = () => {
    let randomNum = Math.floor(Math.random() * anecdotes.length);
    setRandomNum(randomNum);
    setSelected(randomNum);
  };

  const handleVote = () => {
    //Update the points
    const pointsCopy = Array.from(points);
    pointsCopy[randomNum] = points[randomNum] + 1;
    setPoint(pointsCopy);
  };

  useEffect(() => {
    for (let i = 0; i < points.length; i++) {
      if (points[i] > mostVotedAnecdote.votes) {
        setMostVotedAnecdote({
          anecdote: anecdotes[i],
          votes: points[i],
        });
      }
    }
  }, [points]);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNextAnecdote}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <p>{mostVotedAnecdote.anecdote}</p>
      <p>has {mostVotedAnecdote.votes} votes</p>
    </div>
  );
};

export default App;
