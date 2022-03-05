import './AnagramsList.css';

function AnagramsList(props) {
  const displayAnagramsList = () => {
    if (props.anagrams) {
      return props.anagrams.map((word) => (
        <li key={word} className="anagram">{word}</li>
      ));
    }
    return "No Anagrams";
  }

  return (
    <div>
      <div className="solutions-title"> Possible Solutions </div>
      <div className="counter">
        {'Count: ' + (props.anagrams ? props.anagrams.length : 0)}
      </div>
      <ul className="anagram-container">
        {displayAnagramsList()}
      </ul>
    </div>
  );
}

export default AnagramsList;
