import type { GameState, GameAction, GameBoardData } from "../types/game";
import styles from "./GameBoard.module.css";
import BoardTile from "./ui/BoardTile";

const getSelectedPosition = (letter: string, selectedLetters: string[]) => {
  return selectedLetters.includes(letter)
    ? selectedLetters.indexOf(letter) + 1
    : undefined;
};

const getSolutionPosition = (letter: string, solution: string) => {
  const index = solution.toUpperCase().indexOf(letter.toUpperCase());
  return index === -1 ? undefined : index + 1;
};

const getTileDisplayPosition = (letter: string, state: GameState) => {
  if (state.uncoveredLetters.includes(letter)) {
    return getSolutionPosition(letter, state.solution);
  }
  return getSelectedPosition(letter, state.selectedLetters);
};

const getTileVariant = (letter: string, state: GameState) => {
  if (state.uncoveredLetters.includes(letter)) return "uncovered";
  if (state.misplacedLetters.includes(letter)) return "misplaced";
  if (state.absentLetters.includes(letter)) return "absent";
  return "letter";
};

const getTilePrice = (price: string) => {
  return parseInt(price.replace("$", ""));
};

const GameBoard = ({
  state,
  dispatch,
  gameBoard,
}: {
  state: GameState;
  dispatch: (action: GameAction) => void;
  gameBoard: GameBoardData;
}) => {
  return (
    <div className={styles.gameBoardContainer}>
      <div className={styles.costColumn}>
        {Object.keys(gameBoard).map((price) => (
          <BoardTile key={price} letter={price} variant="cost" />
        ))}
      </div>
      <div className={styles.letterGrid}>
        {Object.entries(gameBoard).flatMap(([price, letters]) =>
          letters.map((letter) => {
            const variant = getTileVariant(letter, state);
            const revealIndex = state.revealedLetters.findIndex(
              (revealed) => revealed.letter === letter,
            );
            return (
              <BoardTile
                // The variant is part of the key so a tile that changes colour
                // again (misplaced -> uncovered) remounts and replays the swipe.
                key={`${letter}-${variant}`}
                letter={letter}
                variant={variant}
                reveal={
                  revealIndex === -1
                    ? undefined
                    : {
                        index: revealIndex,
                        from: state.revealedLetters[revealIndex].from,
                      }
                }
                selectedPosition={getTileDisplayPosition(letter, state)}
                onClick={() => {
                  dispatch({
                    type: "TOGGLE_LETTER",
                    payload: { letter, budget: getTilePrice(price) },
                  });
                }}
              />
            );
          }),
        )}
      </div>
    </div>
  );
};

export default GameBoard;
