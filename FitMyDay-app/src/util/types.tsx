export type exercise = {
  id: number;
  name: string;
  sets: number;
  reps: number;
};
export type workout = {
  userId: string;
  id: string;
  name: string;
  category: string;
  equipment: string;
  level: string;
  exercises: exercise[];
};

export type workouts = workout[];

export type exerciseObject = {
  id: number;
  name: string;
  image: string;
  gif: string;
  equipment: string;
  level: string;
  category: string[];
  "main-targeted-area": string[];
  "other-targeted-muscles": string[];
  technique: string[];
};

export type exerciseObjectWithSetsAndReps = {
  id: number;
  name: string;
  image: string;
  gif: string;
  equipment: string;
  level: string;
  category: string[];
  "main-targeted-area": string[];
  "other-targeted-muscles": string[];
  technique: string[];
  sets: string;
  reps: string;
};

export type exercises = exerciseObject[];

export type myWorkout = {
  name: string;
  category: string;
  equipment: string;
  level: string;
  exercises: exercise[];
};
