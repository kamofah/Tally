import styles from "./Auth.module.css";
import GoogleIcon from "../components/icons/GoogleIcon";
import AppleIcon from "../components/icons/AppleIcon";

const OAuthButton = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => {
  return (
    <button className={styles.oauthButton}>
      <div className={styles.oauthIcon}>{icon}</div>
      <p className={styles.oauthButtonText}>{text}</p>
    </button>
  );
};

const Auth = () => {
  return (
    <div className={styles.container}>
      <main>
        <div className={styles.header}>
          <h1 className={styles.title}>Tally</h1>
          <p className={styles.description}>
            Log in or create an account to get started.
          </p>
        </div>
        <form className={styles.formContainer}>
          <label htmlFor="email" className={styles.label}>
            Email address
          </label>
          <input id="email" type="email" placeholder="Email" />
          <button
            className={`${styles.button} ${styles.buttonFilled}`}
            type="submit"
          >
            Login
          </button>
        </form>
        <div className={styles.separator}>
          <hr />
          <p className={styles.separatorText}>or</p>
          <hr />
        </div>
        <div className={styles.oauthButtons}>
          <OAuthButton icon={<GoogleIcon />} text="Continue with Google" />
          <OAuthButton icon={<AppleIcon />} text="Continue with Apple" />
        </div>
        <p className={styles.terms}>
          By continuing, you agree to the Terms of Sale, Terms of Service, and
          Privacy Policy.
        </p>
      </main>
    </div>
  );
};

export default Auth;
