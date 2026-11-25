import { useState, type ReactNode } from "react";
import PopupModal from "./ui/PopupModal";
import { useTheme, type ThemePreference } from "../utils/theme";
import styles from "./SettingsModal.module.css";

const THEME_OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* Stroke icons used only in this modal                                */
/* ------------------------------------------------------------------ */

const StrokeIcon = ({ children }: { children: ReactNode }) => (
  <svg
    className={styles.icon}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const SunIcon = () => (
  <StrokeIcon>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </StrokeIcon>
);

const ContrastIcon = () => (
  <StrokeIcon>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
  </StrokeIcon>
);

const BellIcon = () => (
  <StrokeIcon>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </StrokeIcon>
);

const TrashIcon = () => (
  <StrokeIcon>
    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
  </StrokeIcon>
);

const ChevronIcon = () => (
  <svg
    className={styles.chevron}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Small Components                                                    */
/* ------------------------------------------------------------------ */

const ToggleSwitch = ({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) => (
  <label className={styles.switchLabel}>
    <input
      type="checkbox"
      role="switch"
      aria-label={label}
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
      className={styles.switchInput}
    />
    <span className={styles.switchSlider} />
  </label>
);

const ThemeSelector = () => {
  const [theme, setTheme] = useTheme();

  return (
    <div className={styles.segmented} role="radiogroup" aria-label="Theme">
      {THEME_OPTIONS.map(({ value, label }) => (
        <label key={value} className={styles.segment}>
          <input
            type="radio"
            name="theme"
            value={value}
            checked={theme === value}
            onChange={() => setTheme(value)}
            className={styles.segmentInput}
          />
          <span className={styles.segmentLabel}>{label}</span>
        </label>
      ))}
    </div>
  );
};

const SettingRow = ({
  icon,
  title,
  description,
  control,
  interactive = false,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  control?: ReactNode;
  interactive?: boolean;
}) => {
  const content = (
    <>
      <span className={styles.rowIcon}>{icon}</span>
      <span className={styles.rowText}>
        <span className={styles.rowTitle}>{title}</span>
        <span className={styles.rowDescription}>{description}</span>
      </span>
      {control && <span className={styles.rowControl}>{control}</span>}
    </>
  );

  return interactive ? (
    <button type="button" className={`${styles.row} ${styles.rowButton}`}>
      {content}
    </button>
  ) : (
    <div className={styles.row}>{content}</div>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <section className={styles.section}>
    <h3 className={styles.sectionTitle}>{title}</h3>
    {children}
  </section>
);

/* ------------------------------------------------------------------ */
/* Modal                                                               */
/* ------------------------------------------------------------------ */

// Only the theme setting is wired up so far; the other controls are UI only.
const SettingsModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [highContrast, setHighContrast] = useState(false);
  const [dailyReminder, setDailyReminder] = useState(false);

  return (
    <PopupModal open={open} onClose={onClose} title="Settings">
      <div className={styles.content}>
        <Section title="Appearance">
          <SettingRow
            icon={<SunIcon />}
            title="Theme"
            description="Choose your preferred appearance."
            control={<ThemeSelector />}
          />
        </Section>

        <Section title="Accessibility">
          <SettingRow
            icon={<ContrastIcon />}
            title="High Contrast Mode"
            description="Make puzzle feedback easier to distinguish."
            control={
              <ToggleSwitch
                checked={highContrast}
                onChange={setHighContrast}
                label="High Contrast Mode"
              />
            }
          />
        </Section>

        <Section title="Notifications">
          <SettingRow
            icon={<BellIcon />}
            title="Daily Reminder"
            description="Get notified when a new puzzle is available."
            control={
              <ToggleSwitch
                checked={dailyReminder}
                onChange={setDailyReminder}
                label="Daily Reminder"
              />
            }
          />
          <div
            className={`${styles.subRow} ${dailyReminder ? "" : styles.subRowDisabled}`}
          >
            <span>Reminder Time</span>
            <span className={styles.subRowValue}>
              9:00 AM
              <ChevronIcon />
            </span>
          </div>
        </Section>

        <Section title="Data">
          <SettingRow
            interactive
            icon={<TrashIcon />}
            title="Reset Progress"
            description="Clear your saved puzzle progress and statistics."
            control={<ChevronIcon />}
          />
        </Section>
      </div>
    </PopupModal>
  );
};

export default SettingsModal;
