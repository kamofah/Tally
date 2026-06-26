const LetterTile = ({
  letter,
  selectedPosition,
  onClick,
}: {
  letter: string;
  selectedPosition?: number | undefined;
  onClick?: () => void | undefined;
}) => {
  return (
    <button
      style={{
        position: "relative",
        border: onClick ? `2px solid var(--tertiary-color)` : "none",
        backgroundColor: onClick
          ? "var(--quaternary-color)"
          : "var(--tertiary-color)",
        borderRadius: "8px",
        padding: "20px",
        width: "2.5em",
        height: "2.5em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: onClick ? "pointer" : "default",
        fontSize: "1.6em",
        fontWeight: onClick ? "bold" : "bold",
        fontFamily: "Rethink Sans",
        textTransform: "uppercase",
        color: "#000",
      }}
      onClick={onClick}
    >
      {letter}
      <p
        style={
          selectedPosition
            ? {
                position: "absolute",
                width: "15px",
                height: "15px",
                bottom: "2px",
                right: "2px",
                fontSize: "10px",
                fontWeight: "bold",
                color: "#000",
              }
            : { display: "none" }
        }
      >
        {selectedPosition}
      </p>
    </button>
  );
};

export default LetterTile;
