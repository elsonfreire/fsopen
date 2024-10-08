const morgan = require("morgan");
const cors = require("cors");
const express = require("express");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(express.static("dist"));

persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("Hello world!!!");
});

const getNumberOfPersons = () => {
  return persons.length;
};

const getCurrentDateTime = () => {
  const date = new Date();
  return date;
};

app.get("/info", (request, response) => {
  response.send(`<p>Phonebook has info for ${getNumberOfPersons()} people</p>
  <p>${getCurrentDateTime()}</p>`);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons[id];

  if (person) {
    response.json(persons[id]);
  } else {
    response.status(204).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;

  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

app.post("/api/persons", (request, response) => {
  let person = request.body;

  if (!person.name || !person.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  if (persons.find((p) => p.name === person.name)) {
    return response.status(409).json({
      error: "name must be unique",
    });
  }

  person = {
    name: person.name,
    number: person.number,
    id: String(getRandomInt(10000)),
  };

  persons = persons.concat(person);

  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
