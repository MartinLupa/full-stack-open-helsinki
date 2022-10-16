import React from "react";
import { Part } from "./Part";

export const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => (
        <Part name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};
