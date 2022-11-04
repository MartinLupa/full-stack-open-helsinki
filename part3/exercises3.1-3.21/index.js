require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const { response } = require("express");

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
app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((persons) => {
      if (persons) {
        response.json(persons);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

//DELETE person by id
app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((persons) => {
      if (persons) {
        response.json(persons);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

//POST new person
app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number || persons.find((person) => person.name === name)) {
    res.status(400).json({
      data: null,
      error: "name and number cannot be empty, and name must be unique",
    });
  }

  const person = new Person({
    name,
    number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => {
      next(error);
    });
});

//Error handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

//App listening
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
