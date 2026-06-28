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
  variant?: "letter" | "cost";
}) => {
  return (
    <button
      className={`${styles.boardTile} ${variant === "letter" ? styles.letterTile : styles.costTile}`}
      onClick={onClick}
    >
      {letter}
      {selectedPosition && (
        <p className={styles.position}>{selectedPosition}</p>
      )}
    </button>
  );
};

export default BoardTile;
