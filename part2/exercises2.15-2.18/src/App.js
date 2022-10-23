import { useEffect, useState } from "react";
import { AddPersonForm } from "./components/AddPersonForm";
import { Filter } from "./components/Filter";
import { Phonebook } from "./components/Phonebook";
import phoneService from "./services/phones";

//Run server by executing: json-server --port 3001 --watch data.json

const App = () => {
  const [persons, setPersons] = useState([]);
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

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    persons.forEach((person) => {
      if (person.name === newName) {
        alert("Person already exists, do you want to update the phone number?");
        phoneService.update(newPerson, person.id);
      }
      return;
    });

    phoneService
      .create(newPerson)
      .then((response) => persons.concat(response.data));

    phoneService.getAll().then((initialPhones) => setPersons(initialPhones));
    setNewName("");
    setNewNumber("");
  };

  useEffect(() => {
    phoneService.getAll().then((initialPhones) => setPersons(initialPhones));
  }, []);

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

      <Phonebook persons={persons} setPersons={setPersons} />
    </div>
  );
};

export default App;
