import { useParams } from "react-router-dom";
import classes from "./WorkoutDetails.module.css";
import WorkoutDetailsNav from "./WorkoutDetailsNav";
import { useEffect, useState } from "react";
import { getWorkouts } from "../../util/httpWorkouts";

type subCategory = { equipment: null | string; level: null | string };

function capitalizeAfterSpace(sentence: string) {
  // Split the sentence into words
  let words = sentence.split(" ");

  // Capitalize the first letter of each word
  for (let i = 0; i < words.length; i++) {
    words[i] =
      words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
  }

  // Join the words back into a sentence
  return words.join(" ");
}

export default function WorkoutDetails() {
  const { id } = useParams();
  const workoutType = id?.replace(/-/g, " ");
  const header = capitalizeAfterSpace(workoutType);

  const [category, setCategory] = useState<string | null>(null);
  const [subCategory, setSubCategory] = useState<subCategory>({
    equipment: null,
    level: null,
  });
  const [currentWorkout, setCurrentWorkout] = useState([]);
  const [exerciseIndex, setExerciseIndex] = useState(0);

  let currentExercise = exerciseIndex
    ? currentWorkout[exerciseIndex]
    : currentWorkout[0];

  let paragraph = false;

  if (!subCategory.equipment || !subCategory.level) {
    paragraph = true;
  }

  function handleCategory(value: string) {
    setCategory((prevState) => (prevState === value ? null : value));
  }

  function handleSubCategory(value: string) {
    setSubCategory((prevState) =>
      category === "Equipment"
        ? { ...prevState, equipment: value }
        : { ...prevState, level: value }
    );
    setCategory(null);
    setExerciseIndex(0);
  }

  function handleExerciseIndex(index: number) {
    setExerciseIndex(index);
  }

  function handleNextExercise(direction: string) {
    setExerciseIndex((prevState) =>
      direction === "right" ? prevState + 1 : prevState - 1
    );
  }

  function handleRemoveSubCategory(subCategory: string) {
    setSubCategory((prevState) =>
      subCategory === "equipment"
        ? { ...prevState, equipment: null }
        : { ...prevState, level: null }
    );
  }

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("accessToken");

      if (subCategory.equipment && subCategory.level) {
        const data = await getWorkouts(
          token,
          workoutType,
          subCategory.equipment?.toLowerCase(),
          subCategory.level?.toLowerCase()
        );

        setCurrentWorkout(data);
      }
    }

    fetchData();
  }, [subCategory]);

  return (
    <div className={classes.mainDiv}>
      <h1 className={classes.header}>{header}</h1>
      <WorkoutDetailsNav
        category={category}
        subCategory={subCategory}
        handleCategory={handleCategory}
        handleSubCategory={handleSubCategory}
      />
      <div className={classes.subCategoryDiv}>
        {subCategory.equipment && (
          <h3>
            {subCategory.equipment}{" "}
            <i
              className="fa-solid fa-xmark"
              onClick={() => handleRemoveSubCategory("equipment")}
            ></i>
          </h3>
        )}
        {subCategory.level && (
          <h3>
            {subCategory.level}{" "}
            <i
              className="fa-solid fa-xmark"
              onClick={() => handleRemoveSubCategory("level")}
            ></i>
          </h3>
        )}
      </div>
      {paragraph && <p>Please pick a equipment and level for your workout.</p>}

      {!paragraph && (
        <div className={classes.mainExerciseDiv}>
          {currentExercise && (
            <>
              <div className={classes.imageDiv}>
                {exerciseIndex ? (
                  <i
                    onClick={() => handleNextExercise("left")}
                    className="fa-solid fa-angle-left"
                  ></i>
                ) : (
                  <i></i>
                )}
                <div
                  key={
                    currentExercise.id +
                    currentExercise.name +
                    subCategory.equipment +
                    subCategory.level
                  }
                  className={classes.imageContainer}
                >
                  <img src={currentExercise.gif} alt={currentExercise.name} />
                  <p className={classes.sets}>Sets: {currentExercise.sets}</p>
                  <p className={classes.reps}>Reps: {currentExercise.reps}</p>
                </div>

                {exerciseIndex !== currentWorkout.length - 1 ? (
                  <i
                    onClick={() => handleNextExercise("right")}
                    className="fa-solid fa-angle-right"
                  ></i>
                ) : (
                  <i></i>
                )}
              </div>
              <div className={classes.exerciseNumbers}>
                {currentWorkout.map((item, index) => (
                  <button
                    onClick={() => handleExerciseIndex(index)}
                    className={
                      exerciseIndex === index ? classes.activeNumber : undefined
                    }
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <div
                key={currentExercise.name}
                className={classes.exerciseDescriptionDiv}
              >
                <h1>{currentExercise.name}</h1>
                <p>
                  <span>Targeted muscles:</span>{" "}
                  {currentExercise["main-targeted-area"].join(", ")}
                </p>
                <p>
                  <span>Technique:</span>
                </p>
                <ul>
                  {currentExercise.technique.map((item) => (
                    <li>{item}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
