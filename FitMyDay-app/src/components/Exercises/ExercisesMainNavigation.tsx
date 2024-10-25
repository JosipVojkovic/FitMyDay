import { NavLink, useLocation } from "react-router-dom";

import classes from "./ExercisesMainNavigation.module.css";
import { useContext } from "react";
import { ExerciseContext } from "../../pages/Exercises";

export default function ExercisesMainNav() {
  const { pathname } = useLocation();
  const { handleAddExercise, handleDeleteMyExercise, deleteMyExercise } =
    useContext(ExerciseContext);

  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <NavLink
            to="."
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            Exercises
          </NavLink>
        </li>
        <li>
          <NavLink
            to="my-exercises"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            My Exercises
          </NavLink>
        </li>
        <li>
          <NavLink
            to="favourite-exercises"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Favourite
          </NavLink>
        </li>
      </ul>
      {pathname === "/exercises/my-exercises" && (
        <div>
          <button onClick={handleAddExercise}>
            Add <i className="fa-solid fa-plus"></i>
          </button>
          <button
            className={
              deleteMyExercise.deleteActive
                ? classes.activeButton
                : classes.button
            }
            onClick={handleDeleteMyExercise}
          >
            {deleteMyExercise.deleteActive ? "Confirm" : "Delete"}
            <i className="fa-solid fa-trash">
              {deleteMyExercise.deleteActive && (
                <span>{deleteMyExercise.selectedExercises.length}</span>
              )}
            </i>
          </button>
        </div>
      )}
    </nav>
  );
}
