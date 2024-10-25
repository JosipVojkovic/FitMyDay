import { Link, NavLink } from "react-router-dom";
import classes from "./LoginPage.module.css";
import { FormEvent, useContext, useRef, useState } from "react";
import { LoginContext } from "./RootLayout";
import { useNavigate } from "react-router-dom";
import { login } from "../util/http";

export default function LoginPage() {
  const [error, setError] = useState({
    emailError: false,
    passwordError: false,
  });

  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();
  const { handleLogin } = useContext(LoginContext);

  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let data;

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

    if (
      emailInput.current?.value.trim() &&
      emailInput.current?.value.includes("@") &&
      passwordInput.current?.value.trim() &&
      passwordInput.current?.value.length > 7
    ) {
      try {
        data = await login(
          emailInput.current?.value,
          passwordInput.current?.value
        );
      } catch (error) {
        const loginError = await error.json();
        return setLoginError(loginError.message);
      }

      localStorage.setItem("accessToken", data.token);
      setLoginError(null);
      handleLogin(data.auth);
      return navigate("../exercises");
    }
  }

  return (
    <section className={classes.loginSection}>
      <form className={classes.loginForm} onSubmit={handleSubmit}>
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
        <h1>Login</h1>
        <div className={classes.loginDiv}>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
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
            name="password"
            minLength={8}
            ref={passwordInput}
            className={error.passwordError ? classes.errorInput : classes.input}
          />
          <i className="fa-solid fa-key"></i>
          {error.passwordError && (
            <p>Password must contain minimum of 8 characters.</p>
          )}
        </div>
        <button>Login</button>
        {loginError && <p className={classes.loginError}>{loginError}</p>}
        <p>
          Don`t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </section>
  );
}
