import styles from "./PopupModal.module.css";
import CloseIcon from "../icons/CloseIcon";

const PopupModal = ({
  children,
  open,
  onClose,
  title,
}: {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  title: string;
}) => {
  return (
    <dialog className={styles.popupModal} open={open} onClose={onClose}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <button className={styles.closeButton} onClick={() => onClose()}>
          <CloseIcon />
        </button>
      </div>
      {children}
    </dialog>
  );
};

export default PopupModal;
