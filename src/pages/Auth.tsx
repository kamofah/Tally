import "./Auth.css";
import GoogleIcon from "../components/icons/GoogleIcon";
import AppleIcon from "../components/icons/AppleIcon";

const Auth = () => {
  return (
    <div className="container">
      <main>
        <div className="header">
          <h1 className="title">Tally</h1>
          <p className="description">
            Log in or create an account to get started.
          </p>
        </div>
        <div className="form">
          <label htmlFor="email">Email address</label>
          <input id="email" type="email" placeholder="Email" />
          <button className="button button-filled" type="submit">
            Login
          </button>
        </div>
        <div className="separator">
          <hr />
          <p className="separator-text">or</p>
          <hr />
        </div>
        <div className="oauth-buttons">
          <button className="oauth-button">
            <div className="oauth-icon">
              <GoogleIcon />{" "}
            </div>{" "}
            <p className="oauth-button-text">Continue with Google</p>
          </button>
          <button className="oauth-button">
            <div className="oauth-icon">
              <AppleIcon />{" "}
            </div>{" "}
            <p className="oauth-button-text">Continue with Apple</p>
          </button>
        </div>
        <p className="terms">
          By continuing, you agree to the Terms of Sale, Terms of Service, and
          Privacy Policy.
        </p>
      </main>
    </div>
  );
};

export default Auth;
