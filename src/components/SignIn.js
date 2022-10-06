import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const SignIn = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logIn = async () => {};

  const logOut = async () => {};

  return (
    <section>
      <div className="landingImage"></div>
      <div className="signupPage">
        <form action="">
          <fieldset>
            <legend>Sign In</legend>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => {
                setRegisterEmail(e.target.value);
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
                setRegisterPassword(e.target.value);
              }}
            />
          </fieldset>
        </form>
        <button onClick={register}>Log In</button>

        <div className="account-exists">
          Please contact Shannon to create an account 🙂
        </div>
      </div>
    </section>
  );
};

export default SignIn;
