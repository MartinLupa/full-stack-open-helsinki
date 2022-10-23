import React from "react";
import phoneService from "../services/phones";

export const Phonebook = ({
  persons,
  setPersons,
  handleNotificationVisibility,
}) => {
  const handleDelete = (id) => {
    phoneService.remove(id);
    setPersons(persons.filter((person) => person.id !== id));
    handleNotificationVisibility(`Person with id: ${id} was deleted.`);
  };

  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            {person.name} - {person.number}
            <button onClick={() => handleDelete(person.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
