import './App.css';
import { useState, useEffect } from 'react';
import { findAnagrams } from './anagram';
import { dictionary } from './dictionary';
import Row from './Row';

function App() {
  useEffect(() => {
    // const fs = require('./dictionary.txt');
    // const array = fs.readFileSync('file.txt').toString().split("\n");
    // console.log('pulled dict', array.length);
  });

  const [gameData, setGameData] = useState({
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
  });



  const setRowData = (row, data) => {
    console.log('hit', data)
    setGameData({...gameData, [row]: data})
    console.log(gameData);
    console.log("validating", data.color1);
    console.log("validating1", data.one);

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
    for(let i = 1; i <= 6; i++){
      let rowData = gameData[i];
      console.log("rowData", rowData);
      // TODO, need better way to say row isn't defined yet
      if(typeof rowData.color1 == 'undefined'){
        console.log("breaking out for", i);
        continue;
      }
      // for this row, parse all grays, yellows, greens
      // TODO, improve gameData so that this can be super simplified

      // checking first letter
      if(rowData.color1 == "gray"){
        absolute_nots[0] = absolute_nots[0] + rowData.one.toLowerCase();
      } else if(rowData.color1 == "yellow"){
        regex_nots[0] = regex_nots[0] + rowData.one.toLowerCase();
      } else {
        regex_musts[0] = rowData.one.toLowerCase();
      }

      // checking second letter
      if(rowData.color2 == "gray"){
        absolute_nots[1] = absolute_nots[1] + rowData.two.toLowerCase();
      } else if(rowData.color2 == "yellow"){
        regex_nots[1] = regex_nots[1] + rowData.two.toLowerCase();
      } else {
        regex_musts[1] = rowData.two.toLowerCase();
      }

      // checking third letter
      if(rowData.color3 == "gray"){
        absolute_nots[2] = absolute_nots[2] + rowData.three.toLowerCase();
      } else if(rowData.color3 == "yellow"){
        regex_nots[2] = regex_nots[2] + rowData.three.toLowerCase();
      } else {
        regex_musts[2] = rowData.three.toLowerCase();
      }

      // checking fourth letter
      if(rowData.color4 == "gray"){
        absolute_nots[3] = absolute_nots[3] + rowData.four.toLowerCase();
      } else if(rowData.color4 == "yellow"){
        regex_nots[3] = regex_nots[3] + rowData.four.toLowerCase();
      } else {
        regex_musts[3] = rowData.four.toLowerCase();
      }

      // checking fifth letter
      if(rowData.color5 == "gray"){
        absolute_nots[4] = absolute_nots[4] + rowData.five.toLowerCase();
      } else if(rowData.color5 == "yellow"){
        regex_nots[4] = regex_nots[4] + rowData.five.toLowerCase();
      } else {
        regex_musts[4] = rowData.five.toLowerCase();
      }
    }

    console.log("absolute nots", absolute_nots);
    console.log("nots", regex_nots);
    console.log("musts", regex_musts);

    // remove all "gray" (absolute nots) letters from the alphabet
    let letters = "abcdefghijklmnopqrstuvwxyz";
    let difference = [...absolute_nots.join("")].filter(x => ![...regex_musts.join("")].includes(x));
    console.log("difference for letters: ", difference);
    for(let l = 0; l < difference.length; l++){
      letters = letters.replace(difference[l], "");
    }


    // build up regex + must contains list
    // by condensing each column into regex
    let regex = "";
    let must_contain = ""
    for (let s = 0; s < 5; s++){
      if(regex_musts[s]){
        //all greens 
        regex = regex + "[" + regex_musts[s] + "]";
        must_contain = must_contain + regex_musts[s];
      } else if(regex_nots[s] != ""){
        // all yellows
        regex = regex + "[^" + regex_nots[s] + "]";
        must_contain = must_contain + regex_nots[s];
      } else {
        // if null or "", add .
        regex = regex + ".";
      }
    }

    // get unique must_contains list in case duplicates
    must_contain = Array.from(new Set([...must_contain])).join("");

    console.log("letters:", letters);
    console.log("regex", "^" + regex + "$");
    console.log("must contain: ", must_contain);
    findAnagrams(letters, "^" + regex + "$", must_contain);
  };
  

  return (
    <div className="App">
      <header className="App-header">
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
      </header>
    </div>
  );
}

export default App;
