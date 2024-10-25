import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import ExercisesModal from "../Modals/ExerciseModal";
import { deleteFavExercise, getFavouriteExercises } from "../../util/http";
import classes from "./ExercisesList.module.css";

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

export default function FavouriteExercisesList() {
  const [hoverImage, setHoverImage] = useState("");
  const [exerciseData, setExerciseData] = useState<exercise | false>(false);
  const [heartIcon, setHeartIcon] = useState("");
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

  function handleHeartIcon(name: string) {
    setHeartIcon(name);
  }

  function handleExitHeartIcon() {
    setHeartIcon("");
  }

  async function handleDeleteFavExercise(event, exercise: number) {
    event.stopPropagation();

    const token = localStorage.getItem("accessToken");

    const data = await deleteFavExercise(token, exercise);

    setFavExercises(data);
  }

  //console.log(favExercises, exerciseData);

  // useEffect(() => {
  //   async function fetchingData() {
  //     const response = await fetch("http://localhost:8080/exercises");
  //     const data = await response.json();
  //     setExercisesData(data);
  //   }

  //   fetchingData();
  // }, [favExercises, exerciseData]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    async function fetchingData() {
      const data = await getFavouriteExercises(token);
      setFavExercises(data);
    }

    fetchingData();
  }, []);

  let filteredData = favExercises;

  if (navSubCategory && favExercises && filteredData) {
    filteredData = filteredData.filter((item) =>
      item.category.includes(navSubCategory)
    );
  }

  if (!favExercises) {
    filteredData = false;
  }

  console.log(filteredData);

  return (
    <>
      {filteredData && filteredData.length > 0 ? (
        filteredData.map((item) => (
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

            <i
              onMouseOver={() => handleHeartIcon(item.name)}
              onMouseOut={handleExitHeartIcon}
              onClick={(event) => handleDeleteFavExercise(event, item.id)}
              className={`${
                heartIcon === item.name ? "fa-solid" : "fa-regular"
              } fa-square-minus ${classes.emptyHeartIcon}`}
            ></i>
          </div>
        ))
      ) : (
        <h1>You have no favourite exercises.</h1>
      )}
      {exerciseData && (
        <ExercisesModal exercise={exerciseData} onClick={handleExitModal} />
      )}
    </>
  );
}
