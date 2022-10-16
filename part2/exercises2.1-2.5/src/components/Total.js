import React from "react";

export const Total = ({ course }) => {
  const total = course.parts.reduce(
    (total, part) => (total += part.exercises),
    0
  );

  return (
    <div>
      <h2>total of {total} exercises</h2>
    </div>
  );
};
