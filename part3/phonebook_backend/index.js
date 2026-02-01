require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const Person = require("./models/person");
const cors = require("cors");

app.use(express.json());
app.use(express.static("dist"));
app.use(cors());

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time :body"),
);

const request_logger = (req, res, next) => {
  next();
};

app.use(request_logger);

const error_handler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(error_handler);

app.get("/api/persons", (req, res) => {
  Person.find({}).then((person) => {
    console.log(person);
    res.json(person);
  });
});

app.get("/info", (req, res) => {
  const time = new Date();
  res.send(`<h2>Phone book has info for ${phonebook.length} people</h2>\n
    <h2>${time}</h2>
    `);
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id)
    .then((person) => {
      if (person) {
        res.status(200).json(person);
      } else;
      res.status(404).end();
    })
    .catch((err) => next(err));
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(404).json({
      error: "content missing",
    });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person.save().then((savedData) => {
    res.json(savedData);
  });
});

app.put("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  const update_data = req.body.number;
  Person.findByIdAndUpdate(id, {
    number: update_data,
  })
    .then((person) => {
      if (person) {
        res.status(200).json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server is running on port : ${PORT}`);
});
