import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import personService from "./services/persons";
import Notification from "./components/Notification";
import ErrorMessage from "./components/Error";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notifications, setNotifications] = useState(null);

  const hook = () => {
    console.log("effect");
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  };

  useEffect(hook, []);

  const addPerson = (event) => {
    event.preventDefault();
    const PersonObject = {
      name: newName,
      number: newNumber,
    };
    const nameExists = persons.filter((person) => person.name === newName);
    if (nameExists.length > 0) {
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`,
      ) &&
        personService
          .update(nameExists[0].id, PersonObject)
          .then((returnedPerson) => {
            console.log(returnedPerson);
            setPersons(
              persons.map((person) =>
                person.id !== nameExists[0].id ? person : returnedPerson,
              ),
            );
          });
    } else {
      personService.create(PersonObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });
      setNotifications(`Added ${newName}`);
      setTimeout(() => {
        setNotifications(null);
      }, 5000);
    }
    setNewName("");
    setNewNumber("");
    setFilter("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    const filteredPersons = persons.filter((person) => {
      return person.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    event.target.value === ""
      ? setPersons(persons)
      : setPersons(filteredPersons);
  };

  const handleDeletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    window.confirm(`Delete ${person.name}?`) &&
      personService
        .deletePerson(id)
        .then((newData) => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((error) => {
          setNotifications(
            `Information of ${person.name} has already been removed from server`,
          );
          setTimeout(() => {
            setNotifications(null);
          }, 5000);
          setPersons(persons.filter((p) => p.id !== id));
        });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifications} />
      <ErrorMessage message={notifications} />
      <Filter filter={filter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Person
          key={person.id}
          person={person}
          onClick={() => handleDeletePerson(person.id)}
        />
      ))}
    </div>
  );
};

export default App;
