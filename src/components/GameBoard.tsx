import type { GameState, GameAction, GameBoardData } from "../types/game";
import styles from "./GameBoard.module.css";
import BoardTile from "./ui/BoardTile";

const getTilePosition = (letter: string, selectedLetters: string[]) => {
  return selectedLetters.includes(letter)
    ? selectedLetters.indexOf(letter) + 1
    : undefined;
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
          letters.map((letter) => (
            <BoardTile
              key={letter}
              letter={letter}
              variant="letter"
              selectedPosition={getTilePosition(letter, state.selectedLetters)}
              onClick={() => {
                dispatch({
                  type: "TOGGLE_LETTER",
                  payload: { letter, budget: getTilePrice(price) },
                });
              }}
            />
          )),
        )}
      </div>
    </div>
  );
};

export default GameBoard;
