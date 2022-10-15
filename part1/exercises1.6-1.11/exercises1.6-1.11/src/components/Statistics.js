import React from "react";

export const Statistics = ({ props }) => {
  if (props.all === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <div>
      <h1>Statistics</h1>
      <div>
        <p>Good: {props.good}</p>
        <p>Neutral: {props.neutral}</p>
        <p>Bad: {props.bad}</p>
        <p>All: {props.all}</p>
        <p>Average: {props.average}</p>
        <p>Positive: {props.positive} %</p>
      </div>
    </div>
  );
};
