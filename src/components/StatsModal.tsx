import styles from "./StatsModal.module.css";
import PopupModal from "./ui/PopupModal";
import BarChart from "./BarChart";
import MetricCounter from "./ui/MetricCounter";
import { useEffect, useState } from "react";

const calculateTimeBetweenTallies = () => {
  const now = new Date();
  const nextDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
  );
  return nextDay.getTime() - now.getTime();
};

type PlayerStats = {
  guessDistribution: { guess: string; count: number }[];
  gamesPlayed: number;
  winPercentage: number;
  currentStreak: number;
  maxStreak: number;
};

const formatCountdown = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((unit) => unit.toString().padStart(2, "0"))
    .join(":");
};

const StatsModal = ({ data }: { data: PlayerStats }) => {
  const [time, setTime] = useState(() => calculateTimeBetweenTallies());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTimeBetweenTallies());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <PopupModal open={true} onClose={() => {}} title="Statistics">
      <div className={styles.statsModalContainer}>
        <div className={styles.statsContainer}>
          <MetricCounter label="Played" value={data.gamesPlayed.toString()} />
          <MetricCounter label="Win %" value={data.winPercentage.toString()} />
          <MetricCounter
            label="Current Streak"
            value={data.currentStreak.toString()}
          />
          <MetricCounter label="Max Streak" value={data.maxStreak.toString()} />
        </div>
      </div>
      <div className={styles.statsChartContainer}>
        <p className={styles.statsChartTitle}>Guess Distribution</p>
        <BarChart data={data.guessDistribution} />
      </div>
      <div className={styles.statsTimerContainer}>
        <p className={styles.statsTimerTitle}>Next Tally</p>
        <p className={styles.statsTimer}>{formatCountdown(time)}</p>
      </div>
    </PopupModal>
  );
};

export default StatsModal;
