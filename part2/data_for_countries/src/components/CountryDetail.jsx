import React from "react";

const CountryDetail = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital?.[0]}</div>
      <div>area {country.area}</div>

      <h1>languages:</h1>
      <ul>
        {Object.values(country.languages || {}).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img
        src={country.flags.png}
        alt={`flag of ${country.name.common}`}
        width="150"
      />
    </div>
  );
};

export default CountryDetail;
