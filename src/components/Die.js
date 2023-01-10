export default function Die({ die, holdDice }) {
  const styles = {
    backgroundColor: die.isHeld ? "#59e391" : "white",
  };

  return (
    <div className="die-face" style={styles} onClick={holdDice}>
      <h2 className="die-num">{die.num}</h2>
    </div>
  );
}
