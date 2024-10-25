import { useState } from "react";

import classes from "./AddExerciseLevel.module.css";

export default function AddExerciseLevel({ onLevelClick, clickedLevel }) {
  const [exerciseLevel, setExerciseLevel] = useState("");

  function onMouseOver(value: string) {
    setExerciseLevel(value);
  }

  function onMouseLeave() {
    setExerciseLevel("");
  }

  let paragraphStyle: string;
  let divStyle: string;
  let paragraph;

  if (exerciseLevel === "beginner") {
    paragraphStyle = classes.paragraphBeginner;
  } else if (exerciseLevel === "intermediate") {
    paragraphStyle = classes.paragraphIntermediate;
  } else if (exerciseLevel === "advanced") {
    paragraphStyle = classes.paragraphAdvanced;
  }

  if (clickedLevel === "beginner") {
    paragraphStyle = classes.paragraphBeginner;
    divStyle = classes.beginner;
  } else if (clickedLevel === "intermediate") {
    paragraphStyle = classes.paragraphIntermediate;
    divStyle = classes.intermediate;
  } else if (clickedLevel === "advanced") {
    paragraphStyle = classes.paragraphAdvanced;
    divStyle = classes.advanced;
  }

  if (!exerciseLevel && !clickedLevel) {
    paragraph = <p>Select Exercise Level</p>;
  } else if (exerciseLevel || clickedLevel) {
    paragraph = (
      <p className={`${paragraphStyle} ${classes.exerciseLevel}`}>
        {clickedLevel ? clickedLevel : exerciseLevel}
      </p>
    );
  }

  function intermediateDiv() {
    if (clickedLevel === "intermediate" || clickedLevel === "advanced") {
      return divStyle;
    }
  }
  return (
    <>
      <div className={classes.level}>
        <div>
          <div
            onMouseOver={() => onMouseOver("beginner")}
            onMouseLeave={onMouseLeave}
            onClick={() => onLevelClick("beginner")}
            className={divStyle}
          ></div>
        </div>
        <div>
          <div
            onMouseOver={() => onMouseOver("intermediate")}
            onMouseLeave={onMouseLeave}
            onClick={() => onLevelClick("intermediate")}
            className={intermediateDiv()}
          ></div>
        </div>
        <div>
          <div
            onMouseOver={() => onMouseOver("advanced")}
            onMouseLeave={onMouseLeave}
            onClick={() => onLevelClick("advanced")}
            className={clickedLevel === "advanced" ? divStyle : ""}
          ></div>
        </div>
      </div>
      {paragraph}
    </>
  );
}
