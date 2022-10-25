import { useEffect, useState } from "react";
import logo from "./kitman_logo.png";
import "./App.css";
import { athletesData } from "./athletes";

// Given more time I would:
// -- have put this into a few different components.
// -- sorted the medals with gold first and bronze last using a simple sorting array. e.g [Gold, Silver, Bronze]
//    using the indexes to compare against to create the sort.
// -- obviously styled beautifully with CSS

function App() {
  const [athletes, setAthletes] = useState([]);
  const [groupByKey, setGroupByKey] = useState("country");

  // const getData = async () => {
  //   try {
  //     await axios
  //       .get("http://localhost:5001/api/athletes")
  //       .then((res) => setAthletes(res.data));
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  useEffect(() => {
    setAthletes(athletesData);
  }, []);

  function groupBy(array, key) {
    const groupedArray = array.reduce((acc, current) => {
      if (!acc[current[key]]) {
        acc[current[key]] = [];
      }
      acc[current[key]].push(current);
      return acc;
    }, {});
    return groupedArray;
  }

  const groupedByX = groupBy(athletes, groupByKey);
  const sorted = Object.fromEntries(Object.entries(groupedByX).sort());

  // const sorted = Object.keys(groupedByCountry)
  //   .sort()
  //   .reduce((object, key) => {
  //     object[key] = groupedByCountry[key];
  //     return object;
  //   }, {});

  return (
    <div className="App">
      <header className="App-header">
        <img
          data-testid="kitman-logo"
          src={logo}
          className="App-logo"
          alt="logo"
        />
        <h2>Welcome to the Kitman Frontend Code Challenge</h2>
        <div>
          <label>Group By </label>
          <select
            value={groupByKey}
            onChange={(e) => setGroupByKey(e.target.value)}
          >
            <option value="country">country</option>
            <option value="sex">sex</option>
            <option value="medal">medal</option>
          </select>
          <br />
        </div>
        <div>
          {athletes &&
            Object.keys(sorted).map((groupKey) => {
              return (
                <>
                  <br></br>
                  <h1>{groupKey}</h1>
                  {Object.entries(groupBy(sorted[groupKey], "event")).map(
                    (sortKey) => {
                      return (
                        <>
                          <h2>{sortKey[0]}</h2>
                          <p></p>
                          {sortKey[1].map((athlete) => {
                            return (
                              <p>{`${athlete.medal} - ${athlete.athlete} - ${athlete.country}`}</p>
                            );
                          })}
                          <br />
                        </>
                      );
                    }
                  )}
                </>
              );
            })}
        </div>
      </header>
    </div>
  );
}

export default App;
