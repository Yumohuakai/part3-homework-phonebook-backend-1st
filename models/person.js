const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URL;

console.log("connecting to", url);

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        // return /\d{2}-\d{5}/.test(v);
        // return /\d{2}-\d+|\d{3}-\d+/.test(v);

        const myRe = /\d{2}-\d+|\d{3}-\d+/;
        return myRe.exec(v) ? myRe.exec(v).includes(v) : false;
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    minLength: 8,
    required: true,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
