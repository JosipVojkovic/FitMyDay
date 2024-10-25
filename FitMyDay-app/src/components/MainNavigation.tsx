import { Link, NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import { LoginContext } from "../pages/RootLayout";
import UserInfo from "./UserInfo/UserInfo";

export default function MainNavigation() {
  const { isLogged } = useContext(LoginContext);

  return (
    <div className={classes.header}>
      <h2>
        <Link to={isLogged ? "/exercises" : "/"}>FitMyDay</Link>
      </h2>
      {isLogged && (
        <nav>
          <ul className={classes.list}>
            <li>
              <NavLink
                to="/exercises"
                className={({ isActive }) =>
                  isActive ? classes.active : "link"
                }
                end
              >
                Exercises
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/workouts"
                className={({ isActive }) =>
                  isActive ? classes.active : "link"
                }
                end
              >
                Workouts
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/nutrition"
                className={({ isActive }) =>
                  isActive ? classes.active : "link"
                }
                end
              >
                Nutrition
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
      {isLogged ? (
        <UserInfo />
      ) : (
        <NavLink to="/login" className={classes.login}>
          <span>Login</span>
          <i className="fa-solid fa-right-to-bracket"></i>
        </NavLink>
      )}
    </div>
  );
}
