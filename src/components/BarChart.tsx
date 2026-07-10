import styles from "./BarChart.module.css";

const BarChart = ({ data }: { data: { guess: string; count: number }[] }) => {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div>
      {data.map((item) => (
        <div className={styles.row} key={item.guess}>
          <span className={styles.label}>{item.guess}</span>

          {item.count > 0 && (
            <div
              className={styles.bar}
              style={{
                width: `${(item.count / max) * 100}%`,
                backgroundColor:
                  item.count === max
                    ? "var(--success-state-color)"
                    : "var(--gray-state-color)",
              }}
            >
              {item.count}
            </div>
          )}
          {item.count === 0 && (
            <div
              className={styles.bar}
              style={{
                width: `${(item.count / max) * 100}%`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: "8px",
              }}
            >
              0
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BarChart;
