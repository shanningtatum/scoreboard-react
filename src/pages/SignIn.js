import { useEffect, useState } from "react";
import { UserAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { loginUser, anonUser } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await loginUser(loginEmail, loginPassword);
      navigate("/");
    } catch (e) {
      if (e.message == "Firebase: Error (auth/user-not-found).") {
        setError("Invalid Login");
      } else if ((e.message = "Firebase: Error (auth/wrong-password).")) {
        setError("Invalid Password");
      }
    }
  };
  const handleAnon = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await anonUser();
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <section className="signin-section">
      <div className="wrapper">
        <h2>Sign In</h2>
        <div className={error ? "login-message active" : "login-message"}>
          {error}
        </div>
        <div className="signupPage">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => {
                  setLoginEmail(e.target.value);
                }}
                placeholder="Enter Email"
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                }}
              />
            </fieldset>
            <button>Log In</button>
          </form>
          <button onClick={handleAnon}>Login Anonymously</button>
          <div className="account-exists">
            Need an account? Contact Shannon 😗
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
