import React from "react";

export const Content = ({ parts, exercises }) => {
  return (
    <div>
      <p>
        {parts.part1} {exercises.exercises1}
      </p>
      <p>
        {parts.part1} {exercises.exercises2}
      </p>
      <p>
        {parts.part1} {exercises.exercises3}
      </p>
    </div>
  );
};
