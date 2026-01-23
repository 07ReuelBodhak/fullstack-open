const Filter = ({ filter, onChange }) => {
  return (
    <div>
      <p>filter shown with</p>
      <input value={filter} onChange={onChange} />
    </div>
  );
};

export default Filter;
