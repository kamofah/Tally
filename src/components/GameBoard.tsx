import LetterTile from "./LetterTile";
import "./GameBoard.css";

type LetterState = {
  selectedLetters: string[];
  setSelectedLetters: (letters: string[]) => void;
  letterCount: number;
  setLetterCount: (letterCount: number) => void;
  budget: number;
  setBudget: (budget: number) => void;
};

const getPrice = (letter: string, gameBoard: typeof GameBoard): string => {
  return Object.keys(gameBoard).find((price) =>
    gameBoard[price].includes(letter),
  ) as string;
};

const toggleLetter = (
  letter: string,
  price: string,
  {
    selectedLetters,
    setSelectedLetters,
    letterCount,
    setLetterCount,
    budget,
    setBudget,
  }: LetterState,
) => {
  const isSelected = selectedLetters.includes(letter);
  if (isSelected) {
    // Deselecting a letter refunds its price back to the budget
    setSelectedLetters(selectedLetters.filter((l) => l !== letter));
    setLetterCount(letterCount + 1);
    setBudget(budget + parseInt(price.replace("$", "")));
  } else if (letterCount > 0) {
    // Selecting a letter spends its price from the budget
    setSelectedLetters([...selectedLetters, letter]);
    setLetterCount(letterCount - 1);
    setBudget(budget - parseInt(price.replace("$", "")));
  }
  // no letters left and not selected → do nothing
};

const GameBoard = ({
  selectedLetters,
  setSelectedLetters,
  letterCount,
  setLetterCount,
  budget,
  setBudget,
  gameBoard,
}: {
  selectedLetters: string[];
  setSelectedLetters: (letters: string[]) => void;
  letterCount: number;
  setLetterCount: (letterCount: number) => void;
  budget: number;
  setBudget: (budget: number) => void;
  gameBoard: typeof GameBoard;
}) => {
  return (
    <div className="gameBoardContainer">
      <div className="costColumn">
        {Object.keys(gameBoard).map((price) => (
          <LetterTile key={price} letter={price} />
        ))}
      </div>
      <div className="letterGrid">
        {Object.values(gameBoard)
          .flat()
          .map((letter) => (
            <LetterTile
              key={letter as string}
              letter={letter as string}
              selectedPosition={selectedLetters.indexOf(letter as string) + 1}
              onClick={() => {
                toggleLetter(
                  letter as string,
                  getPrice(letter as string, gameBoard),
                  {
                    selectedLetters,
                    setSelectedLetters,
                    letterCount,
                    setLetterCount,
                    budget,
                    setBudget,
                  },
                );
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default GameBoard;
