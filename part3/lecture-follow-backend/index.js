const express = require("express");
const app = express();
const cors = require("cors");
const Note = require("./models/note");

//Custom middlewares and helper functions --------------------------------------------------------------

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

//Routes -----------------------------------------------------------------------------------------------
//Fetch all notes
app.get("/api/notes", (request, response, next) => {
  Note.find({})
    .then((notes) => {
      if (notes) {
        response.json(notes);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

//Fetch one resource
app.get("/api/notes/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

//Add a resource
app.post("/api/notes", (request, response, next) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((error) => next(error));
});

//Delete a resource
app.delete("/api/notes/:id", (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then((note) => {
      response.status(204).json({
        data: `Note of id: ${note.id} deleted successfully.`,
        error: null,
      });
    })
    .catch((error) => next(error));
});

//Update a resource
app.put("/api/notes/:id", (request, response, next) => {
  const { content, important } = request.body;

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

//Unknown endpoint middleware
app.use(unknownEndpoint);

//Error handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
