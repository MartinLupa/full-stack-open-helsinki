import React from "react";
import { Part } from "./Part";

export const Content = ({ parts, exercises }) => {
  return (
    <div>
      <Part parts={parts.part1} exercises={exercises.exercises1} />
      <Part parts={parts.part2} exercises={exercises.exercises2} />
      <Part parts={parts.part3} exercises={exercises.exercises3} />
    </div>
  );
};
