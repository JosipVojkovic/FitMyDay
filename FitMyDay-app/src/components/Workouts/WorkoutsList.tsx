import { Link } from "react-router-dom";
import classes from "./WorkoutsList.module.css";

const workouts = {
  firstColumn: [
    { id: "lower-body", name: "Lower Body" },
    { id: "abs", name: "Abs" },
    { id: "chest", name: "Chest" },
  ],
  secondColumn: [
    { id: "upper-body", name: "Upper Body" },
    { id: "back", name: "Back" },
    { id: "shoulders", name: "Shoulders" },
  ],
  thirdColumn: [
    { id: "cardio", name: "Cardio" },
    { id: "legs", name: "Legs" },
    { id: "arms", name: "Arms" },
  ],
};

export default function WorkoutsList() {
  return (
    <div className={classes.mainDiv}>
      <div className={classes.firstColumn}>
        {workouts.firstColumn.map((item) => (
          <Link to={item.id} key={item.id}>
            <h2>{item.name}</h2>
          </Link>
        ))}
      </div>
      <div className={classes.secondColumn}>
        {workouts.secondColumn.map((item) => (
          <Link to={item.id} key={item.id}>
            <h2>{item.name}</h2>
          </Link>
        ))}
      </div>
      <div className={classes.thirdColumn}>
        {workouts.thirdColumn.map((item) => (
          <Link to={item.id} key={item.id}>
            <h2>{item.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
