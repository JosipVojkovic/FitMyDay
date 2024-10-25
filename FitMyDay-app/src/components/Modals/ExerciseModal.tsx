import classes from "./ExerciseModal.module.css";
import { exercise } from "../Exercises/ExercisesList";

export default function ExercisesModal(props: {
  exercise: exercise;
  onClick: () => void;
}) {
  const exerciseData = props.exercise;

  let levelIcon;

  if (exerciseData.level === "beginner") {
    levelIcon = {
      color: "#39ff14",
      marginLeft: "10px",
    };
  } else if (exerciseData.level === "intermediate") {
    levelIcon = {
      color: "yellow",
      marginLeft: "10px",
    };
  } else {
    levelIcon = {
      color: "red",
      marginLeft: "10px",
    };
  }

  console.log(exerciseData);
  return (
    <div className={classes.background}>
      <div className={classes.modal}>
        <div className={classes.modalDiv}>
          <div>
            <h1>{exerciseData.name}</h1>
            <h3>
              Equipment: <span>{exerciseData.equipment}</span>
            </h3>
            <h3>
              Level:{" "}
              <span>
                {exerciseData.level}{" "}
                <i className="fa-solid fa-signal" style={levelIcon}></i>
              </span>
            </h3>
            <h3>
              Category: <span>{exerciseData.category.join(", ")}</span>
            </h3>
            <h3>
              Main targeted muscles:{" "}
              <span>{exerciseData["main-targeted-area"].join(", ")}</span>
            </h3>
            <h3>
              Other targeted muscles:{" "}
              <span>{exerciseData["other-targeted-muscles"].join(", ")}</span>
            </h3>
          </div>
          <img src={exerciseData.gif} />
        </div>
        <p>
          Techinque:
          {Array.isArray(exerciseData.technique) ? (
            <ul>
              {exerciseData.technique.map((item) => (
                <li>{item}</li>
              ))}
            </ul>
          ) : (
            <span>{exerciseData.technique}</span>
          )}
        </p>
        <i
          className={`fa-solid fa-circle-xmark ${classes.i}`}
          onClick={props.onClick}
        ></i>
      </div>
    </div>
  );
}
