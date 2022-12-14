require("dotenv").config();
const mongoose = require("mongoose");
const connection_url = process.env.DATABASE_CONNECTION_URL;

console.log("connecting to database");
mongoose
  .connect(connection_url)
  .then((result) => {
    console.log("database connection successfully");
  })
  .catch((error) => {
    console.log("database connection error: ", error);
  });

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  important: Boolean,
});

//Deletes _id and __v from the object sent to the frontend, and transforms to String the Mongo id Object.
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);
