const mongoose = require("mongoose");

const url = process.env.MONGO_DB_URI;

mongoose.set("strictQuery", false);
mongoose
  .connect(url, { family: 4 })
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.error(err);
    console.log("error connecting database");
  });

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
  },
});

PersonSchema.set("toJSON", {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString();
    delete returnObject.__v;
    delete returnObject._id;
  },
});

module.exports = mongoose.model("Person", PersonSchema);
