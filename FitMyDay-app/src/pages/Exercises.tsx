import { createContext, useState } from "react";
import classes from "./Exercises.module.css";

import NavExercises from "../components/Exercises/NavExercises";
import ExercisesMainNav from "../components/Exercises/ExercisesMainNavigation";
import { Outlet } from "react-router-dom";
import { deleteMyExercises } from "../util/http";

type deleteMyExercise = {
  deleteActive: boolean;
  selectedExercises: string[];
  openModal: boolean;
};

export const ExerciseContext = createContext({
  addExercise: false,
  handleAddExercise: () => {},
  deleteMyExercise: {
    deleteActive: false,
    selectedExercises: [],
    openModal: false,
  },
  handleDeleteMyExercise: (message: string) => {},
  addDeleteExercise: (item: string) => {},
  handleConfirmDeleteMyExercises: () => {},
});

export default function Exercises() {
  const [navCategory, setNavCategory] = useState("all");
  const [navSubCategory, setNavSubCategory] = useState("");
  const [addExercise, setAddExercise] = useState(false);
  const [deleteMyExercise, setDeleteMyExercise] = useState<deleteMyExercise>({
    deleteActive: false,
    selectedExercises: [],
    openModal: false,
  });

  function handleClickedCategory(category: string) {
    setNavCategory(category);
    setNavSubCategory((prevState) => (category === "all" ? "" : prevState));
  }

  function handleSubCategory(subCategory: string) {
    setNavSubCategory(subCategory);
  }

  function handleAddExercise() {
    setAddExercise((prevState) => !prevState);
  }

  async function handleConfirmDeleteMyExercises() {
    const token = localStorage.getItem("accessToken");

    await deleteMyExercises(token, deleteMyExercise.selectedExercises);

    setDeleteMyExercise({
      openModal: false,
      deleteActive: false,
      selectedExercises: [],
    });
  }

  function handleDeleteMyExercise(message: string) {
    if (message === "cancel") {
      setDeleteMyExercise({
        openModal: false,
        deleteActive: false,
        selectedExercises: [],
      });

      return;
    }

    if (
      deleteMyExercise.deleteActive &&
      deleteMyExercise.selectedExercises.length > 0
    ) {
      setDeleteMyExercise((prevState) => ({
        ...prevState,
        openModal: true,
      }));

      return;
    }

    setDeleteMyExercise((prevState) => ({
      ...prevState,
      deleteActive: !prevState.deleteActive,
    }));
  }

  function addDeleteExercise(event, item: string) {
    event.stopPropagation();

    setDeleteMyExercise((prevState) => {
      let newSelectedExercises = [...prevState.selectedExercises];

      if (prevState.selectedExercises.includes(item)) {
        newSelectedExercises = newSelectedExercises.filter((e) => e !== item);
      } else {
        newSelectedExercises = [item, ...newSelectedExercises];
      }

      return { ...prevState, selectedExercises: newSelectedExercises };
    });
  }

  return (
    <ExerciseContext.Provider
      value={{
        addExercise,
        handleAddExercise,
        deleteMyExercise,
        handleDeleteMyExercise,
        addDeleteExercise,
        handleConfirmDeleteMyExercises,
      }}
    >
      <section className={classes.exercises}>
        <div className={classes.headingDiv}>
          <h1 className={classes.h1}>EXERCISES</h1>
          <h1 className={classes.bgHeading}>EXERCISES</h1>
        </div>

        <p>Here you can browse and look for any exercise you need.</p>
        <ExercisesMainNav />
        <div className={classes.exercisesDiv}>
          <NavExercises
            navCategory={navCategory}
            navSubCategory={navSubCategory}
            handleClickedCategory={handleClickedCategory}
            handleSubCategory={handleSubCategory}
          />
          <div className={classes.mainDiv}>
            <Outlet context={navSubCategory} />
          </div>
        </div>
      </section>
    </ExerciseContext.Provider>
  );
}
