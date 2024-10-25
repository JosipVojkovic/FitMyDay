import { json } from "react-router-dom";
import { myWorkout } from "./types";

export async function getWorkouts(
  token: string,
  category: string,
  equipment: string,
  level: string
) {
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify({ category, equipment, level }),
  };

  const response = await fetch("http://localhost:8080/workouts", request);

  const data = await response.json();

  if (!response.ok) {
    throw json({ message: "Could not get user exercises" }, { status: 500 });
  }

  return data;
}

export async function getMyWorkouts(token: string | null) {
  const request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
  };

  const response = await fetch(
    "http://localhost:8080/workouts/my-workouts",
    request
  );

  const data = await response.json();

  if (!response.ok) {
    throw json({ message: "Could not get user workouts" }, { status: 500 });
  }

  return data;
}

export async function getMyWorkout(token: string | null, workoutId: string) {
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify({ workoutId }),
  };

  const response = await fetch(
    "http://localhost:8080/workouts/my-workouts/workout",
    request
  );
  const data = await response.json();

  if (!response.ok) {
    throw json({ message: "Could not get a workout" }, { status: 500 });
  }

  return data;
}

export async function getExercises(token: string | null, exercises: number[]) {
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify({ exercises }),
  };

  const response = await fetch("http://localhost:8080/exercises", request);

  const data = await response.json();

  if (!response.ok) {
    throw json({ message: "Could not get exercises" }, { status: 500 });
  }

  return data;
}

export async function createMyWorkout(
  token: string | null,
  workout: myWorkout
) {
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify(workout),
  };

  const response = await fetch(
    "http://localhost:8080/workouts/my-workouts",
    request
  );
  const data = await response.json();

  if (!response.ok) {
    throw json({ message: "Could not get a workout" }, { status: 500 });
  }

  return data;
}
