import { useState } from "react";
import { Outlet } from "react-router-dom";
import { workout } from "../util/types";

export type contextType = {
  selectedWorkout: workout | null;
  handleWorkoutClick: (workout: workout) => void;
};

export default function RootMyWorkouts() {
  const [selectedWorkout, setSelectedWorkout] = useState<workout | null>(null);

  function handleWorkoutClick(workout: workout) {
    setSelectedWorkout(workout);
  }

  return (
    <Outlet
      context={{ selectedWorkout, handleWorkoutClick } satisfies contextType}
    />
  );
}
