require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

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

//Morgan logger configuration
morgan.token("body", function (req, res) {
  const requestMethod = req.method;
  if (requestMethod === "POST") {
    const reqBody = JSON.stringify(req.body);
    return reqBody;
  }
});

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

//Database connection and config
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const connection_url = `mongodb+srv://martin-admin:${MONGO_PASSWORD}@cluster0.vts8w.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.connect(connection_url).then(() => {
  console.log("Database connection successfull.");
});

//GET all persons
app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.status(200).json(persons);
  });
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

  if (!name || !number || persons.find((person) => person.name === name)) {
    res.status(400).json({
      data: null,
      error: "name and number cannot be empty, and name must be unique",
    });
  }
  const newPerson = {
    id: randomIdGenerator(),
    name,
    number,
  };

  persons.concat(newPerson);

  res.status(201).json({
    data: `person of id: ${newPerson.id} added successfully`,
    error: null,
  });
});

//App listening
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
