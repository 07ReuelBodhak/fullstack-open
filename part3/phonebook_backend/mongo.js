const mongoose = require("mongoose");

if (process.argv.length < 4) {
  console.log("password and other credentials required");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0.ppsjcqe.mongodb.net/?appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });

const PersonSchema = mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", PersonSchema);

const newPerson = new Person({
  name,
  number,
});

newPerson.save().then((res) => {
  console.log(`added ${name} number ${number} to phonebook`);
});

Person.find({}).then((res) => {
  console.log("Phonebook");
  res.forEach((person) => {
    console.log(`${person.name} ${person.number}`);
  });
  mongoose.connection.close();
});
