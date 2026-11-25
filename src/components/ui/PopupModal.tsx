import { useEffect, useRef } from "react";
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
  const dialogRef = useRef<HTMLDialogElement>(null);

  // showModal() (rather than the `open` attribute) puts the dialog in the top
  // layer: the page behind becomes inert and unclickable, ::backdrop draws the
  // overlay, focus is trapped, and Escape closes it (firing onClose).
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog ref={dialogRef} className={styles.popupModal} onClose={onClose}>
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
