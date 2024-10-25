import { useEffect, useRef, useState } from "react";
import classes from "./CreateMyWorkout.module.css";
import CreateMyWorkoutModal from "../Modals/CreateMyWorkoutModal";
import { Link, useNavigate } from "react-router-dom";
import { createMyWorkout, getExercises } from "../../util/httpWorkouts";
import {
  exerciseObject,
  exerciseObjectWithSetsAndReps,
} from "../../util/types";

export default function CreateMyWorkout() {
  const [modal, setModal] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<number[]>([]);
  const [exercises, setExercises] = useState<exerciseObjectWithSetsAndReps[]>(
    []
  );

  const name = useRef<HTMLInputElement | null>(null);
  const [category, setCategory] = useState<string>("");
  const [equipment, setEquipment] = useState<string>("");
  const [level, setLevel] = useState<string>("");

  const [error, setError] = useState({
    nameError: false,
    categoryError: false,
    equipmentError: false,
    levelError: false,
    exercisesError: false,
  });

  const navigate = useNavigate();

  function toggleModal() {
    if (!modal) {
      setSelectedExercises([]);
    }
    setModal((prevState) => !prevState);
  }

  function handleSelectedExercises(selectedExercises: number[]) {
    setSelectedExercises((prevState) => [...prevState, ...selectedExercises]);
    setError((prevState) => ({ ...prevState, exercisesError: false }));
    setModal(false);
  }

  function handleRemoveExercise(exerciseIndex: number) {
    setExercises((prevState) =>
      prevState.filter((e, index) => index !== exerciseIndex)
    );
    setError((prevState) => ({ ...prevState, exercisesError: false }));
  }

  function handleCategory(event: React.ChangeEvent<HTMLSelectElement>) {
    setCategory(event.target.value);
  }

  function handleEquipment(event: React.ChangeEvent<HTMLInputElement>) {
    setEquipment(event.target.value);
  }

  function handleLevel(event: React.ChangeEvent<HTMLInputElement>) {
    setLevel(event.target.value);
  }

  function onRepsChange(
    event: React.ChangeEvent<HTMLInputElement>,
    exerciseIndex: number
  ) {
    setExercises((prevState) => {
      const newExercises = prevState.map((e, index) =>
        index === exerciseIndex ? { ...e, reps: event.target.value } : e
      );

      return newExercises;
    });
  }

  function onSetsChange(
    event: React.ChangeEvent<HTMLInputElement>,
    exerciseIndex: number
  ) {
    setExercises((prevState) => {
      const newExercises = prevState.map((e, index) =>
        index === exerciseIndex ? { ...e, sets: event.target.value } : e
      );

      return newExercises;
    });
  }

  async function handleSubmit() {
    if (!name.current?.value.trim()) {
      setError((prevState) => ({ ...prevState, nameError: true }));
    } else {
      setError((prevState) => ({ ...prevState, nameError: false }));
    }
    if (category.length < 1) {
      setError((prevState) => ({ ...prevState, categoryError: true }));
    } else {
      setError((prevState) => ({ ...prevState, categoryError: false }));
    }
    if (equipment.length < 1) {
      setError((prevState) => ({ ...prevState, equipmentError: true }));
    } else {
      setError((prevState) => ({ ...prevState, equipmentError: false }));
    }
    if (level.length < 1) {
      setError((prevState) => ({ ...prevState, levelError: true }));
    } else {
      setError((prevState) => ({ ...prevState, levelError: false }));
    }

    if (
      exercises.find((exercise) => {
        if (
          !exercise.reps ||
          Number(exercise.reps) < 1 ||
          !exercise.sets ||
          Number(exercise.sets) < 1
        ) {
          return true;
        }
        return false;
      })
    ) {
      setError((prevState) => ({ ...prevState, exercisesError: true }));
    } else {
      setError((prevState) => ({ ...prevState, exercisesError: false }));
    }

    if (
      name.current?.value.trim() &&
      category &&
      equipment &&
      level &&
      !exercises.find((exercise) => {
        if (
          !exercise.reps ||
          Number(exercise.reps) < 1 ||
          !exercise.sets ||
          Number(exercise.sets) < 1
        ) {
          return true;
        }
        return false;
      })
    ) {
      const token = localStorage.getItem("accessToken");
      await createMyWorkout(token, {
        name: name.current?.value,
        category: category.toLowerCase(),
        equipment,
        level,
        exercises: exercises.map((e) => ({
          id: e.id,
          name: e.name,
          sets: Number(e.sets),
          reps: Number(e.reps),
        })),
      });

      navigate("../");
    }
  }

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("accessToken");

      let data: exerciseObject[];

      if (selectedExercises.length > 0) {
        data = await getExercises(token, selectedExercises);
        setExercises((prevState) => [
          ...prevState,
          ...data.map((exercise) => ({ ...exercise, sets: "", reps: "" })),
        ]);
      }
    }

    fetchData();
  }, [selectedExercises]);

  console.log(exercises, selectedExercises, error);

  return (
    <div className={classes.mainDiv}>
      <Link to="../">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className={classes.back}
        >
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </svg>
      </Link>

      {modal && (
        <CreateMyWorkoutModal
          toggleModal={toggleModal}
          onClick={handleSelectedExercises}
        />
      )}
      <h1>Create your workout</h1>
      <div className={classes.inputTextDiv}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            ref={name}
            className={error.nameError ? classes.inputError : undefined}
          />
          {error.nameError && <span>Enter a name</span>}
        </div>
        <div>
          <label>Category:</label>
          <select
            className={error.categoryError ? classes.inputError : undefined}
            value={category}
            onChange={handleCategory}
          >
            <option>Abs</option>
            <option>Arms</option>
            <option>Back</option>
            <option>Cardio</option>
            <option>Chest</option>
            <option>Legs</option>
            <option>Lower body</option>
            <option>Shoulders</option>
            <option>Upper body</option>
          </select>
          {error.categoryError && <span>Choose category</span>}
        </div>
      </div>
      <div
        className={
          !error.equipmentError
            ? classes.inputRadioDiv
            : `${classes.inputRadioDiv} ${classes.inputError}`
        }
        key="equipment"
      >
        <p>Equipment</p>
        <div>
          <div>
            <input
              type="radio"
              name="equipment"
              value="bodyweight"
              onChange={handleEquipment}
              checked={equipment === "bodyweight"}
            />
            <label>Bodyweight</label>
          </div>
          <div>
            <input
              type="radio"
              name="equipment"
              value="dumbbells"
              onChange={handleEquipment}
              checked={equipment === "dumbbells"}
            />
            <label>Dumbbells</label>
          </div>
          <div>
            <input
              type="radio"
              name="equipment"
              value="gym"
              onChange={handleEquipment}
              checked={equipment === "gym"}
            />
            <label>Gym</label>
          </div>
        </div>
        {error.equipmentError && <span>Choose equipment</span>}
      </div>
      <div
        className={
          !error.levelError
            ? classes.inputRadioDiv
            : `${classes.inputRadioDiv} ${classes.inputError}`
        }
        key="level"
      >
        <p>Level</p>
        <div>
          <div>
            <input
              type="radio"
              name="level"
              value="beginner"
              onChange={handleLevel}
              checked={level === "beginner"}
            />
            <label>Beginner</label>
          </div>
          <div>
            <input
              type="radio"
              name="level"
              value="intermediate"
              onChange={handleLevel}
              checked={level === "intermediate"}
            />
            <label>Intermediate</label>
          </div>
          <div>
            <input
              type="radio"
              name="level"
              value="advanced"
              onChange={handleLevel}
              checked={level === "advanced"}
            />
            <label>Advanced</label>
          </div>
        </div>
        {error.levelError && <span>Choose level</span>}
      </div>
      <div className={classes.addExercise}>
        <h3>Exercises</h3>
        <div
          className={
            exercises.length < 1
              ? classes.addExerciseDiv
              : classes.smallAddExerciseDiv
          }
          onClick={toggleModal}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
          </svg>
          {exercises.length < 1 && <h2>Add Exercise</h2>}
        </div>
        {exercises.map((e, index) => (
          <div className={classes.exerciseDetailsDiv} key={index}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              onClick={() => handleRemoveExercise(index)}
            >
              <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
            </svg>
            <img src={e.gif} alt={e.name} />
            <div>
              <h3>{e.name}</h3>
              <span>Primary muscles: {e["main-targeted-area"].join(", ")}</span>
              <span>
                Secondary muscles: {e["other-targeted-muscles"].join(", ")}
              </span>
              <div className={classes.exerciseInputs}>
                <label>
                  Sets:
                  <input
                    type="number"
                    onChange={(event) => onSetsChange(event, index)}
                  />
                </label>
                <label>
                  Reps:
                  <input
                    type="number"
                    onChange={(event) => onRepsChange(event, index)}
                  />
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
      {error.exercisesError && (
        <span className={classes.exercisesError}>
          Please enter sets and reps for every exercise
        </span>
      )}
      {exercises.length > 0 && (
        <button onClick={handleSubmit} className={classes.submitButton}>
          Create
        </button>
      )}
    </div>
  );
}
