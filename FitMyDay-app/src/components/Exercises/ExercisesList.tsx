import { useState, useEffect } from "react";

import classes from "./ExercisesList.module.css";
import { useOutletContext } from "react-router-dom";
import ExercisesModal from "../Modals/ExerciseModal";
import {
  deleteFavExercise,
  favouriteExercises,
  getFavouriteExercises,
} from "../../util/http";

export type exercise = {
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

export default function ExercisesList() {
  const [exercisesData, setExercisesData] = useState([]);
  const [hoverImage, setHoverImage] = useState("");
  const [exerciseData, setExerciseData] = useState<exercise | false>(false);
  const [heartIcon, setHeartIcon] = useState<null | number>(null);
  const [favExercises, setFavExercises] = useState([]);

  const navSubCategory = useOutletContext();

  function handleHoverImage(image: string) {
    setHoverImage(image);
  }

  function handleExitImage() {
    setHoverImage("");
  }

  function handleExerciseClick(data: exercise | false) {
    setExerciseData(data);
  }

  function handleExitModal() {
    setExerciseData(false);
  }

  function handleHeartIcon(id: number) {
    setHeartIcon(id);
  }

  function handleExitHeartIcon() {
    setHeartIcon(null);
  }

  async function handleDeleteFavExercise(event, exercise) {
    event.stopPropagation();

    const token = localStorage.getItem("accessToken");

    const data = await deleteFavExercise(token, exercise);

    setFavExercises(data);
  }

  async function handleHeartClick(event) {
    event.stopPropagation();

    const token = localStorage.getItem("accessToken");

    const data = await favouriteExercises(token, heartIcon);

    setFavExercises(data.user["favourite-exercises"]);
  }

  useEffect(() => {
    async function fetchingData() {
      const response = await fetch("http://localhost:8080/exercises");
      const data = await response.json();
      setExercisesData(data);
    }

    fetchingData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    async function fetchingData() {
      const data = await getFavouriteExercises(token);

      const favouriteExercisesArray = data.map((e) => e.id);
      setFavExercises(favouriteExercisesArray);
    }

    fetchingData();
  }, []);

  console.log(favExercises);

  if (favExercises && exercisesData && navSubCategory) {
    const filteredData = exercisesData.filter((item) =>
      item.category.includes(navSubCategory)
    );

    return filteredData.map((item) => (
      <div>
        <div
          className={classes.exerciseCard}
          onMouseOver={() => handleHoverImage(item.name)}
          onMouseOut={handleExitImage}
          onClick={() => handleExerciseClick(item)}
          key={item.id}
        >
          {hoverImage === item.name ? (
            <img src={item.gif} />
          ) : (
            <img src={item.image} />
          )}
          <h2>{item.name}</h2>
          {!favExercises.includes(item.id) ? (
            <i
              onMouseOver={() => handleHeartIcon(item.id)}
              onMouseOut={handleExitHeartIcon}
              onClick={handleHeartClick}
              className={`${
                heartIcon === item.id ? "fa-solid" : "fa-regular"
              } fa-heart ${classes.emptyHeartIcon}`}
            ></i>
          ) : (
            <i
              onClick={(event) => handleDeleteFavExercise(event, item.id)}
              className={`fa-solid fa-heart ${classes.emptyHeartIcon}`}
            ></i>
          )}
        </div>

        {exerciseData && (
          <ExercisesModal exercise={exerciseData} onClick={handleExitModal} />
        )}
      </div>
    ));
  }

  return (
    <>
      {exercisesData.map((item) => (
        <div
          className={classes.exerciseCard}
          onMouseOver={() => handleHoverImage(item.name)}
          onMouseOut={handleExitImage}
          onClick={() => handleExerciseClick(item)}
          key={item.id}
        >
          {hoverImage === item.name ? (
            <img src={item.gif} />
          ) : (
            <img src={item.image} />
          )}
          <h2>{item.name}</h2>
          {!favExercises.includes(item.id) ? (
            <i
              onMouseOver={() => handleHeartIcon(item.id)}
              onMouseOut={handleExitHeartIcon}
              onClick={handleHeartClick}
              className={`${
                heartIcon === item.id ? "fa-solid" : "fa-regular"
              } fa-heart ${classes.emptyHeartIcon}`}
            ></i>
          ) : (
            <i
              onClick={(event) => handleDeleteFavExercise(event, item.id)}
              className={`fa-solid fa-heart ${classes.emptyHeartIcon}`}
            ></i>
          )}
        </div>
      ))}
      {exerciseData && (
        <ExercisesModal exercise={exerciseData} onClick={handleExitModal} />
      )}
    </>
  );
}
