type GameBoardData = Record<`$${number}`, string[]>;


type GameDispatch = React.Dispatch<GameAction>;

type GameStatus = "pending" | "won" | "lost";

type ButtonState = "disabled" | "clear" | "submit";

type GameState = {
  attempts: number;
  budget: number;
  letterCount: number;
  selectedLetters: string[];
  buttonState: ButtonState;
  gameStatus: GameStatus;
  solution: string;
};

type GameAction = 
| {type: "TOGGLE_LETTER", payload: {letter: string, budget: number}} 
| {type: "SUBMIT_WORD"}
| {type: "CLEAR_SELECTED_LETTERS"}


export type { GameBoardData, GameState, GameAction, GameStatus, ButtonState, GameDispatch };