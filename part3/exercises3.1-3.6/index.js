const express = require("express");
const app = express();

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.status(200).json(persons);
});

app.get("/info", (req, res) => {
  const phonebookLength = persons.length;
  const infoDisplay = `<div>
                        <p>
                        Phonebook has info for ${phonebookLength} people
                        </p>
                        <p>
                        ${new Date()}
                        </p>
                      </div>`;

  res.status(200).send(infoDisplay);
});

app.get("/api/persons/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const person = persons.find((person) => person.id === id);

  if (person) {
    res.status(200).json(person);
  } else {
    res.status(404).json({ error: `person of id: ${id} not found` });
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const person = persons.find((person) => person.id === id);

  if (!person) {
    return res
      .status(404)
      .json({ error: `person of id: ${id} not found in database` });
  }

  persons = persons.filter((person) => person.id !== id);
  res.status(200).json({ error: `person of id: ${id} deleted successfully` });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
