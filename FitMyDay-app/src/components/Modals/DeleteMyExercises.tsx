import { useContext } from "react";
import classes from "./DeleteMyExercises.module.css";
import { ExerciseContext } from "../../pages/Exercises";

export default function DeleteMyExercises() {
  const { handleDeleteMyExercise, handleConfirmDeleteMyExercises } =
    useContext(ExerciseContext);

  return (
    <div className={classes.background}>
      <div className={classes.modal}>
        <h1>Are you sure you want to delete these exercises?</h1>
        <div>
          <button onClick={handleConfirmDeleteMyExercises}>Yes</button>
          <button onClick={() => handleDeleteMyExercise("cancel")}>No</button>
        </div>
      </div>
    </div>
  );
}
