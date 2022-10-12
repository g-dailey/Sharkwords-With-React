'use strict';

function Sharkwords(props){
  //current letter guessed
  //letterGuessed is needed by Letters and Word
  const letterGuessed = React.useState(0)
   // number of wrong guesses
  const wrongGuesses = React.useState(0)

return (
  <div>

    <div>Sharkwords Game </div>
    <Letters />
    <Word />
  </div>
);

}

function Letters(props) {
  return <div>Letters to Guess</div>
}

function Word(props){
  return <div> Word Guess So Far</div>
}

ReactDOM.render(<Sharkwords />, document.querySelector('#root'))