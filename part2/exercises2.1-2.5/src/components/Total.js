import React from "react";

export const Total = ({ course }) => {
  let total = 0;

  course.parts.forEach((part) => {
    total += part.exercises;
  });

  return (
    <div>
      <h2>total of {total} exercises</h2>
    </div>
  );
};
