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

app.use(express.json());

//GET all persons
app.get("/api/persons", (req, res) => {
  res.status(200).json(persons);
});

//GET info
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

//GET person by id
app.get("/api/persons/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const person = persons.find((person) => person.id === id);

  if (person) {
    res.status(200).json(person);
  } else {
    res
      .status(404)
      .json({ data: null, error: `person of id: ${id} not found` });
  }
});

//DELETE person by id
app.delete("/api/persons/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const person = persons.find((person) => person.id === id);

  if (!person) {
    return res
      .status(404)
      .json({ data: null, error: `person of id: ${id} not found in database` });
  }

  persons = persons.filter((person) => person.id !== id);
  res
    .status(200)
    .json({ data: `person of id: ${id} deleted successfully`, error: null });
});

//POST new person
app.post("/api/persons", (req, res) => {
  const randomIdGenerator = () => {
    return (randomId = Math.ceil(Math.random() * 10000));
  };
  const { name, number } = req.body;

  const newPerson = {
    id: randomIdGenerator(),
    name,
    number,
  };

  persons.concat(newPerson);

  res
    .status(201)
    .json({
      data: `person of id: ${newPerson.id} added successfully`,
      error: null,
    });
});

//App listening
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
