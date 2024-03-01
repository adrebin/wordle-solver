import { calculateAnagramsFromGameData } from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// Make it easier to generate test cases
function generateGameData(specifiedRows) {
  let gameData = {
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
  };

  for (let i = 0; i < specifiedRows.length; i++) {
    const row = {};
    let counter = 1;
    for (const [letter, color] of specifiedRows[i]) {
      row[counter] = { value: letter, color: color }
      counter++;
    }
    gameData[i + 1] = row;
  }
  return gameData;
}

test('random case 1', () => {
  const specifiedRows = [
    [["r", "yellow"], ["a", "gray"], ["i", "gray"], ["s", "gray"], ["e", "yellow"]],
    [["c", "gray"], ["l", "green"], ["o", "gray"], ["u", "gray"], ["t", "gray"]],
    [["n", "gray"], ["y", "gray"], ["m", "gray"], ["p", "gray"], ["h", "gray"]],
  ];

  const gameData = generateGameData(specifiedRows);
  const anagrams = calculateAnagramsFromGameData(gameData);
  expect(anagrams).toEqual(["elder", "elver", "fleer"]);
});

test('random case 2', () => {
  const specifiedRows = [
    [["o", "gray"], ["r", "gray"], ["d", "gray"], ["e", "green"], ["r", "gray"]],
    [["p", "gray"], ["s", "yellow"], ["y", "gray"], ["c", "gray"], ["h", "gray"]],
    [["g", "gray"], ["a", "gray"], ["m", "gray"], ["e", "green"], ["s", "yellow"]],
  ];

  const gameData = generateGameData(specifiedRows);
  const anagrams = calculateAnagramsFromGameData(gameData);
  expect(anagrams).toEqual([
    'besee', 'beset', 'eisel', 'ensew',
    'fusee', 'fusel', 'inset', 'nisei',
    'seven', 'sewel', 'sewen', 'silen',
    'silex', 'sinew', 'sizel', 'skeef',
    'skeen', 'skeet', 'sleek', 'sleet',
    'steek', 'steel', 'steen', 'sujee',
    'sweel', 'sweet', 'unsee', 'unset',
    'unsew', 'unsex'
  ]);
});

test('random case 3', () => {
  const specifiedRows = [
    [["c", "gray"], ["r", "gray"], ["a", "gray"], ["n", "gray"], ["e", "green"]],
    [["h", "gray"], ["o", "gray"], ["i", "gray"], ["s", "gray"], ["t", "gray"]],
    [["b", "gray"], ["u", "yellow"], ["l", "yellow"], ["k", "gray"], ["y", "gray"]],
    [["l", "yellow"], ["e", "yellow"], ["d", "yellow"], ["g", "gray"], ["e", "green"]],
  ];

  const gameData = generateGameData(specifiedRows);
  const anagrams = calculateAnagramsFromGameData(gameData);
  expect(anagrams).toEqual(["elude"]);
});

test('random case 4', () => {
  const specifiedRows = [
    [["o", "gray"], ["p", "gray"], ["e", "yellow"], ["n", "gray"], ["s", "gray"]],
    [["b", "yellow"], ["a", "yellow"], ["b", "green"], ["e", "green"], ["s", "gray"]],
    [["k", "gray"], ["e", "yellow"], ["b", "green"], ["a", "yellow"], ["b", "yellow"]],
  ];

  const gameData = generateGameData(specifiedRows);
  const anagrams = calculateAnagramsFromGameData(gameData);
  expect(anagrams).toEqual(['abbed', 'abbey', 'albee', 'amber']);
});

test('random case 5', () => {
  const specifiedRows = [
    [["n", "gray"], ["a", "gray"], ["v", "gray"], ["a", "gray"], ["l", "yellow"]],
    [["e", "green"], ["v", "gray"], ["a", "gray"], ["d", "yellow"], ["e", "yellow"]],
    [["f", "gray"], ["l", "green"], ["u", "gray"], ["f", "gray"], ["f", "gray"]],
    [["s", "gray"], ["u", "gray"], ["n", "gray"], ["n", "gray"], ["y", "gray"]],
    [["t", "gray"], ["h", "gray"], ["r", "yellow"], ["e", "green"], ["e", "yellow"]],
    [["p", "gray"], ["a", "gray"], ["d", "green"], ["d", "gray"], ["y", "gray"]],
  ];

  const gameData = generateGameData(specifiedRows);
  const anagrams = calculateAnagramsFromGameData(gameData);
  expect(anagrams).toEqual(['elder']);
});

test('random case 6', () => {
  const specifiedRows = [
    [["a", "green"], ["l", "gray"], ["g", "gray"], ["a", "gray"], ["e", "yellow"]],
    [["k", "gray"], ["e", "yellow"], ["e", "gray"], ["p", "gray"], ["s", "gray"]],
    [["o", "gray"], ["r", "gray"], ["b", "green"], ["i", "gray"], ["t", "gray"]],
    [["a", "green"], ["b", "green"], ["a", "gray"], ["t", "gray"], ["e", "yellow"]],
  ];

  const gameData = generateGameData(specifiedRows);
  const anagrams = calculateAnagramsFromGameData(gameData);
  console.log(anagrams)
  expect(anagrams).toEqual(['abbed', 'abbey']);
});

test('weird duplicate letters edge case 1', () => {
  const specifiedRows = [
    [["a", "yellow"], ["d", "gray"], ["i", "yellow"], ["e", "yellow"], ["u", "gray"]],
    [["t", "gray"], ["a", "yellow"], ["m", "yellow"], ["a", "gray"], ["l", "gray"]],
  ];

  const gameData = generateGameData(specifiedRows);
  const anagrams = calculateAnagramsFromGameData(gameData);
  expect(anagrams).toEqual(["image", "minae"]);
});

test('weird duplicate letters edge case 2', () => {
  const specifiedRows = [
    [["a", "yellow"], ["n", "gray"], ["n", "green"], ["a", "green"], ["l", "green"]],
    [["u", "gray"], ["n", "yellow"], ["i", "gray"], ["o", "gray"], ["n", "gray"]],
    [["a", "yellow"], ["l", "yellow"], ["l", "gray"], ["o", "gray"], ["y", "gray"]],
  ];

  const gameData = generateGameData(specifiedRows);
  const anagrams = calculateAnagramsFromGameData(gameData);
  expect(anagrams).toEqual(["banal", "canal", "fanal", "genal", "penal", "renal", "venal"]);
});