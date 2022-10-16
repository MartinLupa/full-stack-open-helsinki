import React from "react";

export const Filter = ({ eventHandler, filter }) => {
  return (
    <div>
      <p>
        Filter shown with{" "}
        <input type="text" onChange={eventHandler} value={filter} />
      </p>
    </div>
  );
};
