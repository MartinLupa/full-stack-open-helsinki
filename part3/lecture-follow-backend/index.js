const { response, request } = require("express");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Note = require("./models/note");

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true,
  },
];

const connection_url = `mongodb+srv://martin-admin:${password}@cluster0.vts8w.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.connect(connection_url);

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

//Custom middlewares and helper functions
//Generate ID
const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

//Request logger
const requestLogger = (request, response, next) => {
  console.log("Method", request.method);
  next();
};

//No route found
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

//Middlewares
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(express.static("build"));

app.get("/", (request, response) => {
  response.send("<h1>hello world!</h1>");
});

//Fetch all notes
app.get("/api/notes", (request, response) => {
  response.json(notes);
});

//Fetch one resource
app.get("/api/notes/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.status(200).json(note);
  } else {
    response.status(404).end();
  }
});

//Add a resource
app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (body.content === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

//Delete a resource
app.delete("/api/notes/:id", (request, response) => {
  const id = parseInt(request.params.id);

  notes = notes.filter((note) => note.id !== id);
  response
    .status(204)
    .json({ data: `Note of id: ${id} deleted successfully.`, error: null });
});

//Unknown endpoint middleware
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
