const Person = ({ person, onClick }) => {
  return (
    <div>
      <p>
        {person.name}: {person.number}
      </p>
      <button onClick={onClick}>Delete</button>
    </div>
  );
};

export default Person;
