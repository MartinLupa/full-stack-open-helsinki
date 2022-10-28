const mongoose = require("mongoose");

const password = process.argv[2];
const connection_url = `mongodb+srv://martin-admin:${password}@cluster0.vts8w.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

//savePersonToDatabase receives a connection string and console parameters and saves a new Person.
const savePersonToDatabase = (connection_url, process) => {
  mongoose
    .connect(connection_url)
    .then(() => {
      console.log("Database connection successfull.");

      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      });

      return person.save();
    })
    .then((person) => {
      console.log(`added ${person.name} number ${person.number} to phonebook`);
      return mongoose.connection.close();
    })
    .catch((error) => {
      console.log(error);
    });
};

//retrievePersonsInfo receives a connection_url and retrieves all persons from database.
const retrievePersonsInfo = (connection_url) => {
  mongoose
    .connect(connection_url)
    .then(() => {
      console.log("Database connection successfull.");
      Person.find({}).then((result) => {
        console.log("Phonebook:");
        result.forEach((person) => {
          console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

//Check console arguments and execute action
if (process.argv.length === 3) {
  retrievePersonsInfo(connection_url);
} else if (process.argv.length < 5) {
  console.log(
    "Please provide the password, name and phone as an argument: node mongo.js yourpassword Anna 040-1234556"
  );
  process.exit(1);
} else if (process.argv.length === 5) {
  savePersonToDatabase(connection_url, process);
}
