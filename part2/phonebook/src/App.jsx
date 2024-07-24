import axios from "axios";
import { useEffect, useState } from "react";
import personService from "./services/persons";

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <>
      filter <input value={filter} onChange={handleFilterChange} />
    </>
  );
};

const PersonForm = ({
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
  handleAddPerson,
}) => {
  return (
    <>
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

const Person = ({ person, handleDeletePerson }) => {
  return (
    <>
      <div>
        {person.name} {person.number}
        <button onClick={handleDeletePerson}>delete</button>
      </div>
    </>
  );
};

const Persons = ({ persons, handleDeletePerson }) => {
  const showPersons = () => {
    return persons.map((person) => (
      <Person
        key={person.id}
        person={person}
        handleDeletePerson={() => {
          if (!window.confirm(`Delete ${person.name}?`)) {
            return;
          }
          handleDeletePerson(person.id);
        }}
      />
    ));
  };

  return (
    <>
      <div>{showPersons()}</div>
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);

  const [filter, setFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  useEffect(() => {
    setFilteredPersons(
      persons.filter((person) => {
        return person.name.toLowerCase().includes(filter.toLowerCase());
      })
    );
  }, [persons, filter]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleAddPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    personService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleDeletePerson = (id) => {
    personService.erase(id).then((returnedPerson) => {
      setPersons(
        persons.filter((person) => {
          return returnedPerson.id !== person.id;
        })
      );
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleAddPerson={handleAddPerson}
      />
      <h3>Numbers</h3>
      <Persons
        persons={filteredPersons}
        handleDeletePerson={(id) => {
          handleDeletePerson(id);
        }}
      />
    </div>
  );
};

export default App;
