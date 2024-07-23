import { useState } from "react";

const AddForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleAddPerson = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(
      persons.concat({
        name: newName,
        number: newNumber,
      })
    );
    setNewName("");
    setNewNumber("");
  };

  return (
    <>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={handleAddPerson}>
            add
          </button>
        </div>
      </form>
    </>
  );
};

const Numbers = ({ persons }) => {
  const showPersons = () => {
    return persons.map((person) => (
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    ));
  };

  return (
    <>
      <h2>Numbers</h2>
      <div>{showPersons()}</div>
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [filter, setFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const showPersons = () => {
    return persons.map((person) => (
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    ));
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setFilteredPersons(
      persons.filter((person) => {
        return person.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      })
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with
      <input value={filter} onChange={handleFilterChange} />
      <AddForm persons={persons} setPersons={setPersons} />
      <Numbers persons={filteredPersons} />
    </div>
  );
};

export default App;
