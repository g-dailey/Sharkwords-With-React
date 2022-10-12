const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

const Word = (props) => {
  const charDivs = [];
  for (const [i, letter] of Object.entries(props.word)) {
    let displayLetter = null;
    if (props.guessedLetters.includes(letter)) {
      displayLetter = letter;
    }

    charDivs.push(
      <div key={i} className="letter-box">
        {displayLetter}
      </div>,
    );
  }

  return <section className="word-container">{charDivs}</section>;
};

const Letters = (props) => {
  const letterBtns = [];
  for (const letter of ALPHABET) {
    letterBtns.push(
      <button
        type="button"
        key={letter}
        disabled={props.disableAll || props.guessedLetters.includes(letter)}
        onClick={() => props.handleGuessLetter(letter)}
      >
        {letter}
      </button>,
    );
  }

  return <section className="letter-buttons">{letterBtns}</section>;
};

const Sharkwords = (props) => {
  const [guessedLetters, setGuessedLetters] = React.useState([]);
  const [numWrong, setNumWrong] = React.useState(0);
  const [numCorrect, setNumCorrect] = React.useState(0);

  const guessLetter = (guessedLetter) => {
    if (!props.word.includes(guessedLetter)) {
      setNumWrong((currentNumWrong) => currentNumWrong + 1);
    } else {
      for (const letter of props.word) {
        if (letter === guessedLetter) {
          setNumCorrect((currentNumCorrect) => currentNumCorrect + 1);
        }
      }
    }

    setGuessedLetters((prevLetters) => [...prevLetters, guessedLetter]);
  };

  const hasWon = numCorrect === props.word.length;
  const hasLost = numWrong > 5;
  return (
    <div>
      {hasWon ? (
        <a id="win" href="/sharkwords-final">
          Congratulations! 🥳 You won! Click here to play again.
        </a>
      ) : null}
      <section id="shark-img">
        {hasLost ? (
          <a id="win" href="/sharkwords-final">
            Game over :( Click here to play again
          </a>
        ) : (
          <img src={`/static/images/guess${numWrong}.png`} alt={`${numWrong}-guesses-wrong`} />
        )}
      </section>
      <Word word={props.word} guessedLetters={guessedLetters} />
      <Letters
        guessedLetters={guessedLetters}
        handleGuessLetter={guessLetter}
        disableAll={hasWon || hasLost}
      />
    </div>
  );
};
const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

// Math.random() gives us a random number between 0 and 1
// we multiply it by the length of the list to get a random
// index in the list and then round down since it may be a decimal
const word = WORDS[Math.floor(Math.random() * WORDS.length)];

ReactDOM.render(<Sharkwords word={word} />, document.querySelector('#root'));
