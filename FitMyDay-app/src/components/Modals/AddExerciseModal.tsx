import { useContext, useRef, useState } from "react";
import classes from "./AddExerciseModal.module.css";
import { ExerciseContext } from "../../pages/Exercises";
import AddExerciseSelect from "./AddExerciseSelect";
import AddExerciseImage from "./AddExerciseImage";
import AddExerciseLevel from "./AddExerciseLevel";
import { addMyExercise } from "../../util/http";

const categories = [
  "pull",
  "push",
  "compound",
  "arms",
  "chest",
  "legs",
  "back",
  "core",
];

const muscles = [
  "biceps",
  "triceps",
  "shoulders",
  "chest",
  "upper back",
  "middle back",
  "lower back",
  "core",
  "glutes",
  "quadriceps",
  "hamstrings",
  "calf",
];

export default function AddExerciseModal() {
  const { handleAddExercise } = useContext(ExerciseContext);

  const [clickedLevel, setClickedLevel] = useState("");
  const [exerciseCategory, setExerciseCategory] = useState<string[]>([]);
  const [primaryMuscles, setPrimaryMuscles] = useState<string[]>([]);
  const [secondaryMuscles, setSecondaryMuscles] = useState<string[]>([]);

  const nameInput = useRef<HTMLInputElement>(null);
  const equipmentSelect = useRef<HTMLSelectElement>(null);
  const imageInput = useRef<HTMLInputElement>(null);
  const techniqueTextarea = useRef<HTMLTextAreaElement>(null);

  function onLevelClick(value: string) {
    setClickedLevel(value);
  }

  function handleAddCategory(event) {
    setExerciseCategory((prevState) => [...prevState, event.target.value]);
  }

  function handleDeleteCategory(name: string) {
    setExerciseCategory((prevState) =>
      prevState.filter((item) => item !== name)
    );
  }

  function handleAddMainMuscle(event) {
    setPrimaryMuscles((prevState) => [...prevState, event.target.value]);
  }

  function handleDeleteMainMuscle(name: string) {
    setPrimaryMuscles((prevState) => prevState.filter((item) => item !== name));
  }

  function handleAddSecondaryMuscle(event) {
    setSecondaryMuscles((prevState) => [...prevState, event.target.value]);
  }

  function handleDeleteSecondaryMuscle(name: string) {
    setSecondaryMuscles((prevState) =>
      prevState.filter((item) => item !== name)
    );
  }

  async function onSubmit(event) {
    event.preventDefault();

    console.log(
      clickedLevel,
      exerciseCategory,
      primaryMuscles,
      secondaryMuscles,
      nameInput.current?.value,
      equipmentSelect.current?.value,
      techniqueTextarea.current?.value,
      imageInput.current?.value
    );

    if (
      !clickedLevel ||
      !exerciseCategory ||
      !primaryMuscles ||
      !secondaryMuscles ||
      !nameInput.current?.value.trim() ||
      !equipmentSelect.current?.value ||
      !techniqueTextarea.current?.value.trim() ||
      !imageInput.current?.value.trim()
    ) {
      return;
    }

    const token = localStorage.getItem("accessToken");

    await addMyExercise(token, {
      name: nameInput.current?.value,
      equipment: equipmentSelect.current?.value,
      category: exerciseCategory,
      "main-targeted-area": primaryMuscles,
      "other-targeted-muscles": secondaryMuscles,
      level: clickedLevel,
      technique: techniqueTextarea.current?.value,
      image: imageInput.current?.value,
    });

    handleAddExercise();
  }

  return (
    <div className={classes.background}>
      <div className={classes.modal}>
        <h1>Add Exercise</h1>
        <form>
          <div className={classes.formDiv}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                ref={nameInput}
              />
            </div>
            <div>
              <label htmlFor="equipment">Equipment:</label>
              <select
                className={classes.select}
                name="equipment"
                ref={equipmentSelect}
              >
                <option value="bodyweight">Bodyweight</option>
                <option value="dumbells">Dumbells</option>
                <option value="barbell">Barbell</option>
                <option value="machine">Machine</option>
              </select>
            </div>
          </div>
          <AddExerciseLevel
            onLevelClick={onLevelClick}
            clickedLevel={clickedLevel}
          />
          <div className={classes.formDiv}>
            <AddExerciseSelect
              array={categories}
              onClick={handleAddCategory}
              onDelete={handleDeleteCategory}
              state={exerciseCategory}
            >
              Category:
            </AddExerciseSelect>
            <AddExerciseSelect
              array={muscles}
              onClick={handleAddMainMuscle}
              onDelete={handleDeleteMainMuscle}
              state={primaryMuscles}
            >
              Primary muscles:
            </AddExerciseSelect>
          </div>

          <div className={classes.formDiv}>
            <AddExerciseSelect
              array={muscles}
              onClick={handleAddSecondaryMuscle}
              onDelete={handleDeleteSecondaryMuscle}
              state={secondaryMuscles}
            >
              Secondary muscles:
            </AddExerciseSelect>
            <AddExerciseImage ref={imageInput} />
          </div>
          <div className={classes.formDiv}>
            <div className={classes.textareaDiv}>
              <label>Technique:</label>
              <textarea
                ref={techniqueTextarea}
                placeholder="Describe exercise technique..."
                required
              />
            </div>
          </div>

          <button
            onClick={onSubmit}
            type="submit"
            className={classes.submitButton}
          >
            Submit
          </button>
        </form>

        <i
          className={`fa-solid fa-circle-xmark ${classes.i}`}
          onClick={handleAddExercise}
        ></i>
      </div>
    </div>
  );
}
