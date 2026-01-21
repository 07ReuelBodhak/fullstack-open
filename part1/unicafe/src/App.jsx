import { useState } from "react";

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const Button = ({ name, onclick }) => {
  return <button onClick={onclick}>{name}</button>;
};

const StaticLine = ({ text, value }) => {
  return (
    <p>
      {text} : {value}
    </p>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = total === 0 ? 0 : (good - bad) / total;
  const positive = total === 0 ? 0 : (good / total) * 100;
  return (
    <div>
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <>
          <StaticLine text={"good"} value={good} />
          <StaticLine text={"neutral"} value={neutral} />
          <StaticLine text={"bad"} value={bad} />
          <StaticLine text={"all"} value={total} />
          <StaticLine text={"average"} value={average} />
          <StaticLine text={"positive"} value={positive} />
        </>
      )}
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };
  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header title={"give feedback"} />
      <Button name={"good"} onclick={handleGoodClick} />
      <Button name={"neutral"} onclick={handleNeutralClick} />
      <Button name={"bad"} onclick={handleBadClick} />
      <Header title={"statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
