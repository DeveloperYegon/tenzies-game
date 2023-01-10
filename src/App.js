import "./styles/style.css";
import Die from "./components/Die";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
// other imports
import { nanoid } from "nanoid";

export default function App() {
  // state
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  // create a new die
  function generateNewDie() {
    let random = Math.ceil(Math.random() * 6);
    return {
      id: nanoid(),
      num: random,
      isHeld: false,
    };
  }

  // create new dice
  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  // rolling dice
  function rollDice() {
    tenzies
      ? setDice(allNewDice())
      : setDice((prevDice) =>
          prevDice.map((die) => (die.isHeld ? die : generateNewDie()))
        );
  }

  // hold dice
  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  // dice elements
  const diceElements = dice.map((die) => (
    <Die key={die.id} die={die} holdDice={() => holdDice(die.id)} />
  ));

  //HOOKS
  // check if the user has completed the game
  useEffect(() => {
    //check if game is done
    let allDiceHeld = dice.every((die) => die.isHeld);
    let allDiceSame = dice.every((die) => die.num === dice[0].num);
    if (allDiceHeld && allDiceSame) setTenzies(true);
    else setTenzies(false);
  }, [dice]);

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it's value
        between rolls
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-button" onClick={rollDice}>
        {tenzies ? "New Game🎉" : "Roll"}
      </button>
    </main>
  );
}
