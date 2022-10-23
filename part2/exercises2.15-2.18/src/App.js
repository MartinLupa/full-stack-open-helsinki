import { useEffect, useState } from "react";
import { AddPersonForm } from "./components/AddPersonForm";
import { Filter } from "./components/Filter";
import { Notification } from "./components/Notification";
import { Phonebook } from "./components/Phonebook";
import "./index.css";
import phoneService from "./services/phones";

//Run server by executing: json-server --port 3001 --watch data.json

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleNotificationVisibility = (message) => {
    setErrorMessage(message);
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
      setErrorMessage(null);
    }, 1500);
  };

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

    if (persons.some((person) => person.name === newName)) {
      alert("Person already exists, do you want to update the phone number?");
      const updatePerson = persons.filter((person) => person.name === newName);
      phoneService.update(newPerson, updatePerson[0].id);
      handleNotificationVisibility(`${newName} was updated.`);
    } else {
      handleNotificationVisibility(`${newName} was added.`);
      phoneService
        .create(newPerson)
        .then((response) => persons.concat(response.data));

      setNewName("");
      setNewNumber("");
    }
    phoneService.getAll().then((initialPhones) => setPersons(initialPhones));
  };

  useEffect(() => {
    phoneService.getAll().then((initialPhones) => setPersons(initialPhones));
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} isVisible={isVisible} />

      <Filter eventHandler={handleFilterChange} filter={filter} />

      <AddPersonForm
        submitHandler={handleSubmit}
        nameHandler={handleNameInput}
        numberHandler={handleNumberInput}
        name={newName}
        number={newNumber}
      />

      <Phonebook
        persons={persons}
        setPersons={setPersons}
        handleNotificationVisibility={handleNotificationVisibility}
      />
    </div>
  );
};

export default App;
