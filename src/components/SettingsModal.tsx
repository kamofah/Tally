import { useState } from "react";
import PopupModal from "./ui/PopupModal";
import styles from "./SettingsModal.module.css";

const ToggleSwitch = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <label className={styles.switchLabel}>
      <input
        type="checkbox"
        checked={isOn}
        onChange={() => setIsOn(!isOn)}
        className={styles.switchInput}
      />
      <span className={styles.switchSlider} />
    </label>
  );
};

const SettingsModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <PopupModal open={open} onClose={onClose} title="Settings">
      <div>
        <h1>Settings</h1>
        <ToggleSwitch />
      </div>
    </PopupModal>
  );
};

export default SettingsModal;
