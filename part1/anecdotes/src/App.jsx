import { useState } from "react";

const Header = ({ title }) => <h1> {title}</h1>;

const DisplayAnecdote = ({ anecdote, vote }) => (
  <div>
    <p>{anecdote}</p>
    <p>has {vote} votes</p>
  </div>
);
const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [votes, setVotes] = useState([1, 3, 4, 2, 10, 6, 11, 9]);

  const [selected, setSelected] = useState(0);

  const handleChangeAnecdotes = () => {
    const index = selected + 1;
    if (index == anecdotes.length) {
      setSelected(0);
    } else {
      setSelected(index);
    }
  };

  const castVote = (index) => {
    const copy = [...votes];
    copy[index] += 1;
    setVotes(copy);
  };

  const maxVotes = Math.max(...votes);
  const maxIndex = votes.indexOf(maxVotes);

  return (
    <>
      <Header title={"Anecdote of the day"} />
      <DisplayAnecdote anecdote={anecdotes[selected]} vote={votes[selected]} />
      <Button text={"vote"} onClick={() => castVote(selected)} />
      <Button text={"next anecdote"} onClick={handleChangeAnecdotes} />
      <Header title={"Anecdote with most votes"} />
      <DisplayAnecdote anecdote={anecdotes[maxIndex]} vote={votes[maxIndex]} />
    </>
  );
};

export default App;
