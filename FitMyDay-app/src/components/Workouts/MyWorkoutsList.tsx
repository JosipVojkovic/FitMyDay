import { useEffect, useState } from "react";
import { getMyWorkouts } from "../../util/httpWorkouts";

import classes from "./MyWorkoutList.module.css";
import { workoutImage } from "../../util/customHooks";
import { workouts } from "../../util/types";
import { Link, useOutletContext } from "react-router-dom";
import { contextType } from "../../pages/RootMyWorkouts";

export default function MyWorkoutsList() {
  const [workouts, setWorkouts] = useState<workouts | []>([]);

  const { handleWorkoutClick } = useOutletContext<contextType>();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    async function fetchData() {
      const data = await getMyWorkouts(token);

      setWorkouts(data);
    }

    fetchData();
  }, []);

  console.log(workouts);

  return (
    <div className={classes.mainDiv}>
      {workouts.length < 1 && <h1>You have no workouts</h1>}
      <Link to="create-workout">
        <div
          className={
            workouts.length > 0 ? classes.scaleDown : classes.addWorkoutDiv
          }
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
          </svg>
          {workouts.length < 1 && <h2>Create your workout</h2>}
        </div>
      </Link>

      {workouts.length > 0 &&
        workouts.map((item) => (
          <Link
            to={item.id}
            onClick={() => handleWorkoutClick(item)}
            key={item.id}
          >
            <div
              className={classes.workoutDiv}
              style={{ backgroundImage: `url(${workoutImage(item.category)})` }}
            >
              <div>
                <h1>{item.name}</h1>
                <h2>Category: {item.category}</h2>
                <h2>Equipment: {item.equipment}</h2>
                <h2>Level: {item.level}</h2>
                <h2>Exercises: {item.exercises.length}</h2>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}
