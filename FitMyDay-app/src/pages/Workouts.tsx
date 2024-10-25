import { Outlet } from "react-router-dom";
import classes from "./Workouts.module.css";
import WorkoutsNavigation from "../components/Workouts/WorkoutsNavigation";

export default function Workouts() {
  return (
    <section className={classes.workouts}>
      <div className={classes.headingDiv}>
        <h1 className={classes.h1}>WORKOUTS</h1>
        <h1 className={classes.bgHeading}>WORKOUTS</h1>
      </div>

      <p>
        Here you can browse through workouts, you can make your own workouts and
        <br />
        you can favourize workouts.
      </p>
      <WorkoutsNavigation />
      <Outlet />
    </section>
  );
}
