import React from "react";

export const Notification = ({ message, isVisible }) => {
  if (message === null) {
    return null;
  }

  return <div className={isVisible ? "error" : "hidden"}>{message}</div>;
};
