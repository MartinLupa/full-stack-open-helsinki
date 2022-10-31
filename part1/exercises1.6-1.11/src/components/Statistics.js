import React from "react";
import { StatisticLine } from "./StatisticLine";

export const Statistics = ({ props }) => {
  if (props.all === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <div>
      <h1>Statistics</h1>

      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <StatisticLine text={"Good"} value={props.good} />
          <StatisticLine text={"Neutral"} value={props.neutral} />
          <StatisticLine text={"Bad"} value={props.bad} />
          <StatisticLine text={"All"} value={props.all} />
          <StatisticLine text={"Average"} value={props.average} />
          <StatisticLine text={"Positive"} value={props.positive} />
        </tbody>
      </table>
    </div>
  );
};
