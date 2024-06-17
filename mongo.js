const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
} else {
  const password = process.argv[2];
  const url = `mongodb+srv://fullstack-linjing:${password}@cluster0.mngw1ve.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

  mongoose.set("strictQuery", false);
  mongoose.connect(url);

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  });

  const Person = mongoose.model("Person", personSchema);

  if (process.argv.length === 3) {
    console.log("phonebook:");
    Person.find({}).then((result) => {
      result.forEach((person) => {
        console.log(person.name, " ", person.number);
      });
      mongoose.connection.close();
    });
  }

  if (process.argv.length === 5) {
    const person = new Person({
      name: process.argv[3],
      number: process.argv[4],
    });

    person.save().then((result) => {
      console.log("person saved!");
      mongoose.connection.close();
    });
  }

  if (process.argv.length > 5) {
    console.log("too many arguments");
    process.exit(1);
  }
}
