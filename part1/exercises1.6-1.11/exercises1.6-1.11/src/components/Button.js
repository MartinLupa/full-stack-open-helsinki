import React from "react";

export const Button = ({ eventHandler, text }) => {
  return (
    <div>
      <button onClick={eventHandler}>{text}</button>
    </div>
  );
};
