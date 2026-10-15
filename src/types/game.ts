type GameBoardData = Record<`$${number}`, string[]>;

type GameDispatch = React.Dispatch<GameAction>;

type GameStatus = "pending" | "won" | "lost";

type ButtonState = "disabled" | "clear" | "submit";

// A tile whose colour changed on the latest submission, and the variant it
// had before, so the board can animate the change.
type RevealedLetter = { letter: string; from: "letter" | "misplaced" };

type GameState = {
  attempts: number;
  budget: number;
  letterCount: number;
  startingBudget: number;
  startingLetterCount: number;
  uncoveredLetters: string[];
  misplacedLetters: string[];
  absentLetters: string[];
  revealedLetters: RevealedLetter[];
  selectedLetters: string[];
  buttonState: ButtonState;
  gameStatus: GameStatus;
  solution: string;
};

type GameAction =
  | { type: "TOGGLE_LETTER"; payload: { letter: string; budget: number } }
  | { type: "SUBMIT_WORD" }
  | { type: "CLEAR_SELECTED_LETTERS" };

export type {
  GameBoardData,
  GameState,
  GameAction,
  GameStatus,
  ButtonState,
  GameDispatch,
  RevealedLetter,
};
