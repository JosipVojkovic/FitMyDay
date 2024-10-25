import { useState } from "react";
import classes from "./WorkoutDetails.module.css";

export default function WorkoutComponent({ workout }) {
  const [currentExercise, setCurrentExercise] = useState(workout.exercises[0]);

  function handleCurrentExercise(index: number) {
    setCurrentExercise(workout.exercises[index]);
  }

  function handleNextExercise(direction: string) {
    setCurrentExercise((prevState) => {
      const currentExerciseIndex = workout.exercises.findIndex(
        (e) => prevState.id === e.id
      );

      return direction === "right"
        ? workout.exercises[currentExerciseIndex + 1]
        : workout.exercises[currentExerciseIndex - 1];
    });
  }

  return (
    <div className={classes.mainExerciseDiv}>
      {currentExercise && (
        <>
          <div className={classes.imageDiv}>
            {workout.exercises[0].id !== currentExercise.id ? (
              <i
                onClick={() => handleNextExercise("left")}
                className="fa-solid fa-angle-left"
              ></i>
            ) : (
              <i></i>
            )}
            <div key={currentExercise.id} className={classes.imageContainer}>
              <img src={currentExercise.gif} alt={currentExercise.name} />
              <p className={classes.sets}>Sets: {currentExercise.sets}</p>
              <p className={classes.reps}>Reps: {currentExercise.reps}</p>
            </div>

            {workout.exercises[workout.exercises.length - 1].id !==
            currentExercise.id ? (
              <i
                onClick={() => handleNextExercise("right")}
                className="fa-solid fa-angle-right"
              ></i>
            ) : (
              <i></i>
            )}
          </div>
          <div className={classes.exerciseNumbers}>
            {workout.exercises.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleCurrentExercise(index)}
                className={
                  item.id === currentExercise.id
                    ? classes.activeNumber
                    : undefined
                }
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div
            key={currentExercise.name}
            className={classes.exerciseDescriptionDiv}
          >
            <h1>{currentExercise.name}</h1>
            <p>
              <span>Targeted muscles:</span>{" "}
              {currentExercise["main-targeted-area"].join(", ")}
            </p>
            <p>
              <span>Technique:</span>
            </p>
            <ul>
              {currentExercise.technique.map((item) => (
                <li>{item}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
