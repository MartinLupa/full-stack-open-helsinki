import React from "react";

export const Total = ({ exercises }) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {exercises.exercises1 + exercises.exercises2 + exercises.exercises3}
      </p>
    </div>
  );
};
