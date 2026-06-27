import {
  formatPuzzleDate,
  formatPuzzleNumber,
} from "../utils/formatPuzzleMetadata";
import { Link } from "react-router";
import { TallyIcon } from "../components/icons";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.header}>
          <TallyIcon />
          <h1 className={styles.title}>Tally</h1>
          <p className={styles.description}>
            Every letter has a price. Find the hidden word and stay within
            budget.
          </p>
        </div>
        <div className={styles.buttons}>
          <Link className={styles.button} to="/auth">
            Log in
          </Link>
          <Link
            className={`${styles.button} ${styles.buttonFilled}`}
            to="/game"
            viewTransition
          >
            Play
          </Link>
        </div>
        <div className={styles.footer}>
          <p className={styles.date}>{formatPuzzleDate(new Date())}</p>
          <p className={styles.number}>Puzzle No. {formatPuzzleNumber()}</p>
          <p className={styles.built}>Built by Kwaku Amofah-Boafo</p>
          <p className={styles.copyright}>© Tally</p>
        </div>
      </main>
    </div>
  );
};

export default Home;
