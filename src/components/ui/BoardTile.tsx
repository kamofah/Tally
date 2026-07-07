import styles from "./BoardTile.module.css";

const BoardTile = ({
  letter,
  selectedPosition,
  onClick,
  variant = "letter",
}: {
  letter: string;
  selectedPosition?: number;
  onClick?: () => void;
  variant?: "letter" | "cost" | "uncovered";
}) => {
  return (
    <button
      className={`${styles.boardTile} ${variant === "letter" ? styles.letterTile : variant === "cost" ? styles.costTile : styles.uncoveredTile}`}
      onClick={onClick}
    >
      {letter}
      {selectedPosition !== undefined && (
        <p className={styles.position}>{selectedPosition}</p>
      )}
    </button>
  );
};

export default BoardTile;
