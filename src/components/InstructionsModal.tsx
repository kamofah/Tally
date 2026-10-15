import type { ReactNode } from "react";
import styles from "./InstructionsModal.module.css";
import PopupModal from "./ui/PopupModal";
import BoardTile from "./ui/BoardTile";

type TileVariant = "letter" | "cost" | "uncovered" | "misplaced" | "absent";
type TileSpec = { letter: string; variant?: TileVariant; position?: number };

/* ------------------------------------------------------------------ */
/* Small Components                                                    */
/* ------------------------------------------------------------------ */

// Static illustration built from the real board tiles. `inert` keeps the
// demo tiles out of the tab order and unclickable.
const TileRow = ({ tiles }: { tiles: TileSpec[] }) => (
  <div className={styles.tileRow} inert aria-hidden="true">
    {tiles.map(({ letter, variant = "letter", position }, index) => (
      <BoardTile
        key={`${letter}-${index}`}
        letter={letter}
        variant={variant}
        selectedPosition={position}
        size="small"
      />
    ))}
  </div>
);

const BudgetExample = () => (
  <div className={styles.budgetExample} aria-hidden="true">
    <div className={styles.budgetValueGroup}>
      <p className={styles.budgetValue}>$15</p>
      <p className={styles.budgetLabel}>Budget</p>
    </div>
    <span className={styles.budgetArrow}>→</span>
    <div className={styles.budgetValueGroup}>
      <p className={styles.budgetValue}>$10</p>
      <p className={styles.budgetLabel}>Budget</p>
    </div>
  </div>
);

const Step = ({
  number,
  title,
  children,
  illustration,
}: {
  number: number;
  title: string;
  children: ReactNode;
  illustration?: ReactNode;
}) => (
  <div className={styles.step}>
    <span className={styles.stepNumber}>{number}</span>
    <div className={styles.stepText}>
      <h3 className={styles.stepTitle}>{title}</h3>
      <p className={styles.stepDescription}>{children}</p>
    </div>
    {illustration && (
      <div className={styles.stepIllustration}>{illustration}</div>
    )}
  </div>
);

const ExampleRow = ({
  tiles,
  children,
}: {
  tiles: TileSpec[];
  children: ReactNode;
}) => (
  <div className={styles.exampleRow}>
    <TileRow tiles={tiles} />
    <p className={styles.exampleDescription}>{children}</p>
  </div>
);

const LightbulbIcon = () => (
  <svg
    className={styles.tipIcon}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.9.7 1.6 1.6 1.6 2.7V16h4v-.5c0-1.1.7-2 1.6-2.7A6 6 0 0 0 12 3z" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Modal                                                               */
/* ------------------------------------------------------------------ */

const InstructionsModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <PopupModal open={open} onClose={onClose} title="How To Play">
      <div className={styles.content}>
        <p className={styles.intro}>
          Every letter has a price. Find the hidden 5-letter word and stay
          within budget.
        </p>

        <hr className={styles.divider} />

        <div className={styles.steps}>
          <Step
            number={1}
            title="Build a word"
            illustration={
              <div className={styles.stepTiles}>
                <TileRow
                  tiles={[
                    { letter: "$5", variant: "cost" },
                    { letter: "E" },
                    { letter: "L", variant: "uncovered", position: 1 },
                    { letter: "S" },
                  ]}
                />
                <TileRow
                  tiles={[
                    { letter: "$4", variant: "cost" },
                    { letter: "D" },
                    { letter: "H" },
                    { letter: "A", variant: "uncovered", position: 2 },
                  ]}
                />
              </div>
            }
          >
            Tap letters from the grid to build a 5-letter word. Each letter
            costs the amount shown on its row.
          </Step>

          <Step
            number={2}
            title="Stay within budget"
            illustration={<BudgetExample />}
          >
            You have a limited budget for each puzzle. Your remaining budget
            updates as you select letters.
          </Step>

          <Step
            number={3}
            title="Submit and see feedback"
            illustration={
              <TileRow
                tiles={[
                  { letter: "C", variant: "uncovered", position: 2 },
                  { letter: "O", variant: "misplaced" },
                  { letter: "V", variant: "uncovered", position: 1 },
                  { letter: "E", variant: "absent" },
                  { letter: "D", variant: "absent" },
                ]}
              />
            }
          >
            After each guess, tiles will change color and show the position of
            letters that are in the word.
          </Step>

          <Step number={4} title="You have 6 attempts">
            Find the hidden word in 6 tries. Each guess must be a valid 5-letter
            word.
          </Step>
        </div>

        <hr className={styles.divider} />

        <section className={styles.examples}>
          <h2 className={styles.examplesTitle}>Examples</h2>
          <p className={styles.examplesIntro}>
            The hidden word is <strong>VOCAL</strong>.
          </p>

          <ExampleRow
            tiles={[
              { letter: "V", variant: "uncovered", position: 1 },
              { letter: "O", variant: "uncovered", position: 2 },
              { letter: "C", variant: "uncovered", position: 3 },
              { letter: "A", variant: "uncovered", position: 4 },
              { letter: "L", variant: "uncovered", position: 5 },
            ]}
          >
            A <strong>green</strong> tile means the letter is in the word and in
            the correct position.
          </ExampleRow>

          <ExampleRow
            tiles={[
              { letter: "C", variant: "uncovered", position: 3 },
              { letter: "O", variant: "misplaced" },
              { letter: "D", variant: "absent" },
              { letter: "E", variant: "absent" },
              { letter: "S", variant: "absent" },
            ]}
          >
            A <strong>yellow</strong> tile means the letter is in the word but
            in the wrong position.
          </ExampleRow>

          <ExampleRow
            tiles={[
              { letter: "T", variant: "absent" },
              { letter: "R", variant: "absent" },
              { letter: "U", variant: "absent" },
              { letter: "N", variant: "absent" },
              { letter: "K", variant: "absent" },
            ]}
          >
            A <strong>grey</strong> tile means the letter is not in the word.
          </ExampleRow>
        </section>

        <hr className={styles.divider} />

        <div className={styles.tip}>
          <LightbulbIcon />
          <p className={styles.tipText}>
            A new puzzle is released daily at midnight. Come back tomorrow for a
            new challenge!
          </p>
        </div>
      </div>
    </PopupModal>
  );
};

export default InstructionsModal;
