import { useState, useEffect, useContext } from "react";

import classes from "./ExercisesList.module.css";
import { useOutletContext } from "react-router-dom";
import ExercisesModal from "../Modals/ExerciseModal";
import { getMyExercises } from "../../util/http";
import AddExerciseModal from "../Modals/AddExerciseModal";
import { ExerciseContext } from "../../pages/Exercises";
import DeleteMyExercises from "../Modals/DeleteMyExercises";

export type exercise = {
  name: string;
  image: string;
  gif: string;
  equipment: string;
  level: string;
  category: string[];
  "main-targeted-area": string[];
  "other-targeted-muscles": string[];
  technique: string;
};

export default function MyExercisesList() {
  const [exercisesData, setExercisesData] = useState([]);

  const [exerciseData, setExerciseData] = useState<exercise | false>(false);
  const [heartIcon, setHeartIcon] = useState("");

  const {
    addExercise,
    handleAddExercise,
    deleteMyExercise,
    addDeleteExercise,
    handleConfirmDeleteMyExercises,
  } = useContext(ExerciseContext);

  const navSubCategory = useOutletContext();

  function handleExerciseClick(data: exercise | false) {
    setExerciseData(data);
  }

  function handleExitModal() {
    setExerciseData(false);
  }

  function handleHeartIcon(name: string) {
    setHeartIcon(name);
  }

  function handleExitHeartIcon() {
    setHeartIcon("");
  }

  /*async function handleDeleteFavExercise(event, exercise) {
    event.stopPropagation();

    const token = localStorage.getItem("accessToken");

    const data = await deleteFavExercise(token, exercise);

    setFavExercises(data);
  }*/

  //console.log(favExercises, exerciseData);

  console.log(deleteMyExercise);

  function deleteCheckBox(item: string) {
    if (
      deleteMyExercise.selectedExercises.includes(item) ||
      heartIcon === item
    ) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    async function fetchingData() {
      setExercisesData(await getMyExercises(token));
    }

    fetchingData();
  }, [handleAddExercise, handleConfirmDeleteMyExercises]);

  if (exercisesData && navSubCategory) {
    const filteredData = exercisesData.filter((item) =>
      item.category.includes(navSubCategory)
    );

    return filteredData.map((item) => (
      <div>
        <div
          className={classes.exerciseCard}
          onClick={() => handleExerciseClick(item)}
          key={item.name}
        >
          <img src={item.image} />

          <h2>{item.name}</h2>

          {deleteMyExercise.deleteActive && (
            <i
              onClick={(event) => addDeleteExercise(event, item.name)}
              onMouseOver={() => handleHeartIcon(item.name)}
              onMouseOut={handleExitHeartIcon}
              className={
                deleteCheckBox(item.name)
                  ? `fa-solid fa-square-check ${classes.fullSquareIcon}`
                  : `fa-regular fa-square ${classes.emptySquareIcon}`
              }
            ></i>
          )}
        </div>

        {exerciseData && (
          <ExercisesModal exercise={exerciseData} onClick={handleExitModal} />
        )}
        {addExercise && <AddExerciseModal />}
        {deleteMyExercise.openModal && <DeleteMyExercises />}
      </div>
    ));
  }

  return (
    <>
      {exercisesData.map((item) => (
        <div
          className={classes.exerciseCard}
          onClick={() => handleExerciseClick(item)}
          key={item.name}
        >
          <img src={item.image} />

          <h2>{item.name}</h2>

          {deleteMyExercise.deleteActive && (
            <i
              onClick={(event) => addDeleteExercise(event, item.name)}
              onMouseOver={() => handleHeartIcon(item.name)}
              onMouseOut={handleExitHeartIcon}
              className={
                deleteCheckBox(item.name)
                  ? `fa-solid fa-square-check ${classes.fullSquareIcon}`
                  : `fa-regular fa-square ${classes.emptySquareIcon}`
              }
            ></i>
          )}
        </div>
      ))}
      {exerciseData && (
        <ExercisesModal
          exercise={{ ...exerciseData, gif: exerciseData.image }}
          onClick={handleExitModal}
        />
      )}
      {addExercise && <AddExerciseModal />}
      {deleteMyExercise.openModal && <DeleteMyExercises />}
    </>
  );
}
