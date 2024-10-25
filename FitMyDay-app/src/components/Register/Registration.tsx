import { FormEvent, useRef, useState } from "react";
import { NavLink, Link, useNavigate, useOutletContext } from "react-router-dom";

import classes from "./Registration.module.css";
import { checkEmail } from "../../util/http";

export default function Registration() {
  const userCtx = useOutletContext();
  const [loginError, setLoginError] = useState();

  const handleUserData = userCtx.functions.handleUserData;

  const [error, setError] = useState({
    nameError: false,
    emailError: false,
    passwordError: false,
    repeatedPasswordError: false,
  });

  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const repeatedPasswordInput = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !nameInput.current?.value.trim() ||
      nameInput.current?.value.length < 3
    ) {
      setError((prevState) => ({ ...prevState, nameError: true }));
    } else {
      setError((prevState) => ({ ...prevState, nameError: false }));
    }

    if (
      !emailInput.current?.value.trim() ||
      !emailInput.current?.value.includes("@")
    ) {
      setError((prevState) => ({ ...prevState, emailError: true }));
    } else {
      setError((prevState) => ({ ...prevState, emailError: false }));
    }

    if (
      !passwordInput.current?.value.trim() ||
      passwordInput.current?.value.length < 8
    ) {
      setError((prevState) => ({ ...prevState, passwordError: true }));
    } else {
      setError((prevState) => ({ ...prevState, passwordError: false }));
    }

    if (repeatedPasswordInput.current?.value !== passwordInput.current?.value) {
      setError((prevState) => ({ ...prevState, repeatedPasswordError: true }));
    } else {
      setError((prevState) => ({ ...prevState, repeatedPasswordError: false }));
    }

    if (
      !nameInput.current?.value.trim() ||
      nameInput.current?.value.length < 3 ||
      !emailInput.current?.value.trim() ||
      !emailInput.current?.value.includes("@") ||
      !passwordInput.current?.value.trim() ||
      passwordInput.current?.value.length < 8 ||
      repeatedPasswordInput.current?.value !== passwordInput.current?.value
    ) {
      return;
    } else {
      handleUserData(
        nameInput.current.value,
        emailInput.current.value,
        passwordInput.current.value
      );

      try {
        await checkEmail(emailInput.current.value);
      } catch (error) {
        const loginError = await error.json();
        return setLoginError(loginError.message);
      }

      return navigate("BMI");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={classes.loginForm}>
      <div className={classes.loginOrRegister}>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive
              ? classes.loginOrRegisterSelected
              : classes.loginOrRegisterNotSelected
          }
        >
          Login
        </NavLink>
        <NavLink
          to="/register"
          className={({ isActive }) =>
            isActive
              ? classes.loginOrRegisterSelected
              : classes.loginOrRegisterNotSelected
          }
        >
          Register
        </NavLink>
      </div>
      <h1>Register</h1>
      <div className={classes.loginDiv}>
        <label>Name:</label>
        <input
          type="text"
          placeholder="Name"
          ref={nameInput}
          className={error.nameError ? classes.errorInput : classes.input}
        />
        <i className="fa-solid fa-user"></i>
        {error.nameError && (
          <p>Username must contain minimum of 3 characters.</p>
        )}
      </div>
      <div className={classes.loginDiv}>
        <label>Email:</label>
        <input
          type="email"
          placeholder="Email"
          ref={emailInput}
          className={error.emailError ? classes.errorInput : classes.input}
        />
        <i className="fa-solid fa-envelope"></i>
        {error.emailError && <p>Invalid email, please try again.</p>}
      </div>
      <div className={classes.loginDiv}>
        <label>Password:</label>
        <input
          type="password"
          placeholder="Password"
          ref={passwordInput}
          className={error.passwordError ? classes.errorInput : classes.input}
        />
        <i className="fa-solid fa-key"></i>
        {error.passwordError && (
          <p>Password must contain minimum of 8 characters.</p>
        )}
      </div>
      <div className={classes.loginDiv}>
        <label>Repeat password:</label>
        <input
          type="password"
          placeholder="Password"
          ref={repeatedPasswordInput}
          className={
            error.repeatedPasswordError ? classes.errorInput : classes.input
          }
        />
        <i className="fa-solid fa-key"></i>
        {error.repeatedPasswordError && <p>Passwords don`t match.</p>}
      </div>
      <button>Next step</button>
      {loginError && <p className={classes.loginError}>{loginError}</p>}
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
}
