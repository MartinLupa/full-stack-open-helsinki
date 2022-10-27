const { response, request } = require("express");
const express = require("express");
const app = express();

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

app.use(express.json());

//Generate ID
const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
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

  if (!body.content) {
    response.status(400).json({ error: "content missing" });
  }

  const newNote = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  };

  notes.concat(newNote);
  response.status(201).json(newNote);
});

//Delete a resource
app.delete("/api/notes/:id", (request, response) => {
  const id = parseInt(request.params.id);

  notes = notes.filter((note) => note.id !== id);
  response.status(204).json(`Note of id: ${id} deleted successfully.`);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
