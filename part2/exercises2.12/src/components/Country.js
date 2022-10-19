import React, { useState } from "react";

export const Country = ({ name, capital, area, languages, flag }) => {
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const handleShowInfo = () => {
    setIsInfoVisible(!isInfoVisible);
  };

  return (
    <div>
      {name}
      <button onClick={handleShowInfo}>show</button>
      {isInfoVisible ? (
        <div>
          <p>{capital}</p>
          <p>{area}</p>

          <h2>Languages</h2>
          <ul>
            {Object.keys(languages).map((key) => (
              <li key={languages[key]}>{languages[key]}</li>
            ))}
          </ul>
          <img src={flag.png} alt="" />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
