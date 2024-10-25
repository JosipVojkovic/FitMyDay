import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMyWorkout } from "../../util/httpWorkouts";
import { workout } from "../../util/types";
import classes from "./MyWorkoutDetails.module.css";
import WorkoutComponent from "./WorkoutComponent";

export default function MyWorkoutDetails() {
  const { id } = useParams();
  const [workout, setWorkout] = useState<workout | null>(null);
  const navigate = useNavigate();

  function handleBack() {
    navigate("..");
  }

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("accessToken");

      let data;

      if (id) {
        data = await getMyWorkout(token, id);
        setWorkout(data);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={classes.mainDiv}>
      <h1>{workout?.name}</h1>
      <div>
        <h2>Category: {workout?.category}</h2>
        <h2>Equipment: {workout?.equipment}</h2>
        <h2>Level: {workout?.level}</h2>
      </div>
      {workout && <WorkoutComponent workout={workout} />}
      <div className={classes.back} onClick={handleBack}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </svg>
        <p>Back</p>
      </div>
    </div>
  );
}
