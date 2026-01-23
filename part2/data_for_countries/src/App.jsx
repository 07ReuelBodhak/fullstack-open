import React, { useEffect, useState } from "react";
import countryService from "./services/countries";
import CountryDetail from "./components/CountryDetail";

const App = () => {
  const [countryName, setCountryName] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countryService.getAllCountries().then((data) => {
      setCountries(data);
    });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(countryName.toLowerCase()),
  );

  return (
    <div>
      <div>
        find countries{" "}
        <input
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
        />
      </div>

      {filteredCountries.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}

      {filteredCountries.length <= 10 &&
        filteredCountries.length > 1 &&
        filteredCountries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}{" "}
            <button onClick={() => setCountryName(country.name.common)}>
              show
            </button>
          </div>
        ))}

      {filteredCountries.length === 1 && (
        <CountryDetail country={filteredCountries[0]} />
      )}
    </div>
  );
};

export default App;
