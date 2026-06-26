const TallyIcon = () => {
  return (
    <svg
      className="tallyIcon"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="10" y="10" width="14" height="80" rx="4" fill="#111111" />
      <rect x="30" y="10" width="14" height="80" rx="4" fill="#111111" />
      <rect x="50" y="10" width="14" height="80" rx="4" fill="#111111" />
      <rect x="70" y="10" width="14" height="80" rx="4" fill="#111111" />

      <rect
        x="43"
        y="-10"
        width="14"
        height="120"
        rx="4"
        fill="#111111"
        transform="rotate(50, 50, 50)"
      />
    </svg>
  );
};

export default TallyIcon;
