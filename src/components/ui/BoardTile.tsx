import type { CSSProperties } from "react";
import styles from "./BoardTile.module.css";

const BoardTile = ({
  letter,
  selectedPosition,
  onClick,
  variant = "letter",
  reveal,
  size = "default",
}: {
  letter: string;
  selectedPosition?: number;
  onClick?: () => void;
  variant?: "letter" | "cost" | "uncovered" | "misplaced" | "absent";
  // Plays the top-to-bottom fill swipe. `index` is the tile's place in the
  // sequence, `from` the variant it is changing away from.
  reveal?: { index: number; from: "letter" | "misplaced" };
  size?: "default" | "small";
}) => {
  const variantClass = {
    letter: styles.letterTile,
    cost: styles.costTile,
    uncovered: styles.uncoveredTile,
    misplaced: styles.misplacedTile,
    absent: styles.absentTile,
  }[variant];

  const revealClass = reveal
    ? `${styles.revealTile} ${reveal.from === "misplaced" ? styles.revealFromMisplaced : ""}`
    : "";

  return (
    <button
      className={`${styles.boardTile} ${variantClass} ${revealClass} ${size === "small" ? styles.smallTile : ""}`}
      style={
        reveal ? ({ "--reveal-index": reveal.index } as CSSProperties) : undefined
      }
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
