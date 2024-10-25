import { NavLink } from "react-router-dom";

import classes from "./WorkoutsNavigation.module.css";

export default function WorkoutsNavigation() {
  return (
    <nav className={classes.nav}>
      <li>
        <NavLink
          to="."
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          end
        >
          Workouts
        </NavLink>
      </li>
      <li>
        <NavLink
          to="my-workouts"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          My Workouts
        </NavLink>
      </li>
      <li>
        <NavLink
          to="favourite-workouts"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Favourite
        </NavLink>
      </li>
    </nav>
  );
}
