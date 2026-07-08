import styles from "./Game.module.css";
import { useMemo, useReducer } from "react";
import GameBoard from "../components/GameBoard";
import { formatPuzzleNumber } from "../utils/formatPuzzleMetadata";
import { InfoIcon, StatsIcon, SettingsIcon } from "../components/icons";
import { Link } from "react-router";
import {
  formatGameAttempts,
  formatGameBudget,
  formatGameLetterCount,
} from "../utils/formatGameMetrics";
import type { GameState, GameDispatch } from "../types/game";
import gameReducer from "../reducers/gameReducer";
import { generatePuzzle } from "../utils/puzzleConfig";

/* ------------------------------------------------------------------ */
/* Small Components                                                    */
/* Simple, presentational building blocks                             */
/* ------------------------------------------------------------------ */
const GameWord = ({ word }: { word: string }) => {
  return (
    <div className={styles.gameWordContainer}>
      <p className={styles.gameWord}>{word}</p>
    </div>
  );
};

const GameCounter = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className={styles.gameCounterContainer}>
      <p className={styles.gameCounterValue}>{value}</p>
      <p className={styles.gameCounterLabel}>{label}</p>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Large Components                                                    */
/* Composite sections that hold state or combine smaller components    */
/* ------------------------------------------------------------------ */

const GameHeader = () => {
  return (
    <header>
      <p className={styles.gameHeaderTitle}>Tally</p>
      <div className={styles.gameHeaderIcons}>
        <InfoIcon />
        <StatsIcon />
        <SettingsIcon />
        {/* Login/ Signout Button*/}
      </div>
    </header>
  );
};

const GameFooter = () => {
  return (
    <footer>
      <Link to="/" className={`${styles.footerText} ${styles.footerLink}`}>
        © 2026 Tally
      </Link>
      <Link to="/game" className={`${styles.footerText} ${styles.footerLink}`}>
        Puzzle No. {formatPuzzleNumber()}
      </Link>
      <p className={styles.footerText}>How to Play</p>
      <p className={styles.footerText}>Privacy Policy</p>
      <Link
        to="https://www.linkedin.com/in/kamofah/"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.footerText} ${styles.footerLink}`}
      >
        More about Developer
      </Link>
    </footer>
  );
};

const GameButton = ({
  state,
  dispatch,
}: {
  state: GameState;
  dispatch: GameDispatch;
}) => {
  const handleClick = () => {
    if (state.buttonState === "submit") {
      dispatch({ type: "SUBMIT_WORD" });
    } else if (state.buttonState === "clear") {
      dispatch({ type: "CLEAR_SELECTED_LETTERS" });
    } else {
      return; // do nothing
    }
  };

  return (
    <button
      className={styles.gameButton}
      style={{
        backgroundColor:
          state.buttonState === "submit"
            ? "var(--success-state-color)"
            : state.buttonState === "clear" && "var(--reset-state-color)",
      }}
      onClick={handleClick}
      disabled={state.buttonState === "disabled"}
    >
      {state.buttonState === "clear" ? "Clear" : "Submit"}
    </button>
  );
};

const GameMetrics = ({
  letterCount,
  budget,
  attempts,
}: {
  letterCount: number;
  budget: number;
  attempts: number;
}) => {
  return (
    <div className={styles.gameMetricsContainer}>
      <GameCounter label="Letters" value={formatGameLetterCount(letterCount)} />
      <GameCounter label="Budget" value={formatGameBudget(budget)} />
      <GameCounter label="Attempts" value={formatGameAttempts(attempts)} />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Layout                                                      */
/* Top-level component that assembles the full screen                  */
/* ------------------------------------------------------------------ */

const Game = () => {
  const puzzle = useMemo(() => generatePuzzle(), []);
  const [state, dispatch] = useReducer(gameReducer, puzzle, (puzzle) => ({
    attempts: 1,
    budget: puzzle.budget,
    letterCount: puzzle.letterCount,
    startingBudget: puzzle.budget,
    startingLetterCount: puzzle.letterCount,
    uncoveredLetters: [],
    selectedLetters: [],
    buttonState: "disabled",
    gameStatus: "pending",
    solution: puzzle.solution,
  }));

  return (
    <div className={styles.gameContainer}>
      <GameHeader />
      <main>
        <GameMetrics
          letterCount={state.letterCount}
          budget={state.budget}
          attempts={state.attempts}
        />
        <GameBoard
          state={state as GameState}
          dispatch={dispatch}
          gameBoard={puzzle.gameBoard}
        />
        <div className={styles.gameInputContainer}>
          <GameWord word={state.selectedLetters.join("")} />
          <GameButton state={state as GameState} dispatch={dispatch} />
        </div>
      </main>
      <GameFooter />
    </div>
  );
};

export default Game;
