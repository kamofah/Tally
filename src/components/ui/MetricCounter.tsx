import styles from "./MetricCounter.module.css";

const MetricCounter = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className={styles.metricCounterContainer}>
      <p className={styles.metricCounterValue}>{value}</p>
      <p className={styles.metricCounterLabel}>{label}</p>
    </div>
  );
};

export default MetricCounter;
