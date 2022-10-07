import { useEffect, useState } from "react";
import { UserAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { loginUser } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await loginUser(loginEmail, loginPassword);
      navigate("/home");
    } catch (e) {
      if (e.message == "Firebase: Error (auth/user-not-found).") {
        setError("Invalid Login");
      } else if ((e.message = "Firebase: Error (auth/wrong-password).")) {
        setError("Invalid Password");
      }
    }
  };

  return (
    <section>
      <div className="wrapper">
        <div className="signupPage">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Sign In</legend>
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
          <div className="login-message">{error}</div>
          <div className="account-exists">
            Please contact Shannon to create an account 🙂
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
