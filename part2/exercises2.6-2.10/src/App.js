import { useEffect, useState } from "react";
import { AddPersonForm } from "./components/AddPersonForm";
import { Filter } from "./components/Filter";
import { Phonebook } from "./components/Phonebook";

const phonebookInitialState = [
  { name: "Arto Hellas", number: "040-123456", id: 1 },
  { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
  { name: "Dan Abramov", number: "12-43-234345", id: 3 },
  { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
];

const App = () => {
  const [persons, setPersons] = useState(phonebookInitialState);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let isNewName = true;

    persons.forEach((person) => {
      if (person.name === newName) {
        alert(`${newName} is already added to phonebook`);
        isNewName = false;
      }
    });

    if (isNewName) {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    }
  };

  useEffect(() => {
    if (filter.length === 0) {
      setPersons(phonebookInitialState);
    } else {
      const filteredPersons = persons.filter((person) =>
        person.name.includes(filter)
      );
      setPersons(filteredPersons);
    }
  }, [filter]);

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter eventHandler={handleFilterChange} filter={filter} />

      <AddPersonForm
        submitHandler={handleSubmit}
        nameHandler={handleNameInput}
        numberHandler={handleNumberInput}
        name={newName}
        number={newNumber}
      />

      <Phonebook persons={persons} />
    </div>
  );
};

export default App;
