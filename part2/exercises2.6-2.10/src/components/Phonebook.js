import React from "react";

export const Phonebook = ({ persons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>
            {person.name} - {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};
