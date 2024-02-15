import './App.css';
import { useEffect, useState } from 'react';
import { findAnagrams } from './anagram';
import Row from './Row';
import AnagramsList from './AnagramsList';

function App() {
  const [gameData, setGameData] = useState({
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
  });

  const [solverKey, setSolverKey] = useState(1);

  const [anagrams, setAnagrams] = useState();

  const getLetters = (absolute_nots, regex_musts) => {
    // remove all "gray" (absolute nots) letters from the alphabet
    let letters = "abcdefghijklmnopqrstuvwxyz";
    let difference = [...absolute_nots.join("")].filter(x => ![...regex_musts.join("")].includes(x));
    for (let l = 0; l < difference.length; l++) {
      letters = letters.replace(difference[l], "");
    }
    return letters;
  }

  const getAnagrams = (letters, regex_musts, regex_nots) => {
    // build up regex + must contains list
    // by condensing each column into regex
    let regex = "";
    let must_contain = ""
    for (let s = 0; s < 5; s++) {
      must_contain = must_contain + regex_nots[s];
      if (regex_musts[s]) {
        //all greens 
        regex = regex + "[" + regex_musts[s] + "]";
        must_contain = must_contain + regex_musts[s];
      } else if (regex_nots[s] != "") {
        // all yellows
        regex = regex + "[^" + regex_nots[s] + "]";
      } else {
        // if null or "", add .
        regex = regex + ".";
      }
    }

    // get unique must_contains list in case duplicates
    must_contain = Array.from(new Set([...must_contain])).join("");
    return findAnagrams(letters, "^" + regex + "$", must_contain);
  }

  const setRowData = (row, data) => {
    const tempGameData = { ...gameData, [row]: data };

    // letters that are grey
    // each entry here represents the concatenation of the column
    let absolute_nots = ["", "", "", "", ""];
    // letters that are yellow
    // each entry here represents the concatenation of the column
    let regex_nots = ["", "", "", "", ""];
    // letters that are green
    // each entry here represents the concatenation of the column
    let regex_musts = [null, null, null, null, null];
    // iterate through each row
    for (let i = 1; i <= 6; i++) {
      let rowData = tempGameData[i];
      if (Object.keys(rowData).length) {
        for (const [key, value] of Object.entries(rowData)) {
          switch (value.color) {
            case "gray":
              absolute_nots[key - 1] = absolute_nots[key - 1] + value.value;
              break;
            case "yellow":
              regex_nots[key - 1] = regex_nots[key - 1] + value.value;
              break;
            default:
              regex_musts[key - 1] = value.value;
          }
        }
      }
    }

    const letters = getLetters(absolute_nots, regex_musts);
    setAnagrams([...getAnagrams(letters, regex_musts, regex_nots)]);
    setGameData(tempGameData);
  };

  const clearGame = () => {
    console.log('Clearing', gameData)
    setAnagrams(null);
    setGameData({
      1: {},
      2: {},
      3: {},
      4: {},
      5: {},
      6: {},
    });
    setSolverKey((currentKey) => currentKey + 1);
  }

  return (
    <div className="App">
      <div className="App-header">
        <div className="title-container">
          <div className="spacer" />
          <div className="page-title">
            Welcome to Teralina's Wordle Solver
            <details className="hover-tooltip">
              <summary>(instructions)</summary>
              Type a letter in the grey box, press the white button until the color matches the wordle screen. Press submit to calculate anagrams, press clear to reset.
            </details>
          </div>
          <button className="clear-game" onClick={clearGame}>
            Clear Game
          </button>
        </div>
        <div className="solver-body" key={solverKey}>
          <Row
            setRowData={setRowData}
            rowNum={1}
          />
          <Row
            setRowData={setRowData}
            rowNum={2}
          />
          <Row
            setRowData={setRowData}
            rowNum={3}
          />
          <Row
            setRowData={setRowData}
            rowNum={4}
          />
          <Row
            setRowData={setRowData}
            rowNum={5}
          />
          <Row
            setRowData={setRowData}
            rowNum={6}
          />
        </div>
        <AnagramsList
          anagrams={anagrams}
        />

      </div>
    </div>
  );
}

export default App;
