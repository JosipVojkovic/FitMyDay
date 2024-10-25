import { FormEvent, useContext, useRef, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

import classes from "./RegistrationSecondStep.module.css";
import genderMale from "../../assets/gender-malee.png";
import genderFemale from "../../assets/gender-femalee.png";
import activityData from "./activityData";
import { LoginContext } from "../../pages/RootLayout";
import { postData } from "../../util/http";

export default function RegistrationSecondStep() {
  const { handleLogin } = useContext(LoginContext);
  const userCtx = useOutletContext();
  const handleUserAttributes = userCtx.functions.handleUserAttributes;

  const heightInput = useRef<HTMLInputElement>(null);
  const weightInput = useRef<HTMLInputElement>(null);
  const ageInput = useRef<HTMLInputElement>(null);
  const targetWeightInput = useRef<HTMLInputElement>(null);

  const [descriptionIcon, setDescriptionIcon] = useState(false);
  const [genderImageClick, setGenderImageClick] = useState("");
  const [activityLevel, setActivityLevel] = useState("");

  const navigate = useNavigate();

  console.log(userCtx);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      heightInput.current?.value &&
      weightInput.current?.value &&
      ageInput.current?.value &&
      targetWeightInput.current?.value &&
      genderImageClick &&
      activityLevel
    ) {
      handleUserAttributes(
        heightInput.current?.value,
        weightInput.current?.value,
        ageInput.current?.value,
        genderImageClick,
        targetWeightInput.current?.value,
        activityLevel
      );

      return navigate("../BMI-results");
    }
  }

  console.log(typeof heightInput.current?.value);

  async function handleRegister() {
    try {
      await postData(userCtx.name, userCtx.email, userCtx.password, null);
    } catch (error) {
      return;
    }
    handleLogin(true);
    navigate("/exercises");
  }

  function handleDescriptionIcon() {
    setDescriptionIcon((prevState) => !prevState);
  }

  function handleGenderImage(gender: string) {
    setGenderImageClick(gender);
  }

  function handleOnradio(index: string) {
    setActivityLevel(index);
  }

  let activityDataIndex;

  switch (activityLevel) {
    case "Not active":
      activityDataIndex = "Not active";
      break;
    case "Lightly active":
      activityDataIndex = "Lightly active";
      break;
    case "Moderately active":
      activityDataIndex = "Moderately active";
      break;
    case "Very active":
      activityDataIndex = "Very active";
      break;
  }

  return (
    <form onSubmit={handleSubmit} className={classes.loginForm}>
      <h1>Your BMI</h1>
      <p
        style={{ cursor: "pointer", marginTop: "-15px" }}
        onClick={handleDescriptionIcon}
      >
        <i
          className={`fa-solid fa-angle-right ${classes.bmiDescriptionIcon}
          ${descriptionIcon && classes.bmiDescriptionIconClicked}`}
        ></i>
        What is BMI?
      </p>

      {descriptionIcon && (
        <p style={{ marginTop: "-15px" }}>
          BMI (body mass index) is a measurment to determine whether a person is
          underweight, normal weight, overweight, or obese.
        </p>
      )}

      <div style={{ marginTop: "20px" }} className={classes.loginDiv}>
        <div>
          <label>Height:</label>
          <input
            type="number"
            placeholder="cm"
            ref={heightInput}
            className={classes.input}
          />
        </div>
        <div>
          <label>Weight:</label>
          <input
            type="number"
            placeholder="kg"
            ref={weightInput}
            className={classes.input}
          />
        </div>
      </div>
      <div className={classes.loginDiv}>
        <div>
          <label>Age:</label>
          <input
            type="number"
            placeholder="Age"
            ref={ageInput}
            className={classes.input}
          />
        </div>
        <div>
          <label>Target weight:</label>
          <input
            type="number"
            placeholder="kg"
            ref={targetWeightInput}
            className={classes.input}
          />
        </div>
      </div>
      <h2>Choose your gender</h2>
      <div className={`${classes.loginDiv} ${classes.genderMainDiv}`}>
        <div className={classes.genderDiv}>
          <img
            src={genderMale}
            alt="fitness man"
            className={`${classes.male} ${
              genderImageClick === "male" && classes.maleClicked
            }`}
            onClick={() => handleGenderImage("male")}
          />
          <h3>
            Male{" "}
            <i style={{ color: "#7CB9E8" }} className="fa-solid fa-mars"></i>
          </h3>
        </div>
        <div className={classes.genderDiv}>
          <img
            src={genderFemale}
            alt="fitness girl"
            className={`${classes.female} ${
              genderImageClick === "female" && classes.femaleClicked
            }`}
            onClick={() => handleGenderImage("female")}
          />
          <h3>
            Female{" "}
            <i style={{ color: "#ed213a" }} className="fa-solid fa-venus"></i>
          </h3>
        </div>
      </div>
      <div style={{ marginTop: "20px" }} className={classes.activityMainDiv}>
        <p style={{ fontSize: "18px" }}>How active are you?</p>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className={classes.activityDiv}>
            <div>
              <input
                type="radio"
                className={classes.input}
                name="activity"
                onClick={() => handleOnradio("Not active")}
              />
              <label>Not active</label>
            </div>

            <div>
              <input
                type="radio"
                className={classes.input}
                name="activity"
                onClick={() => handleOnradio("Lightly active")}
              />
              <label>Lightly active</label>
            </div>
          </div>

          <div className={classes.activityDiv}>
            <div>
              <input
                type="radio"
                className={classes.input}
                name="activity"
                onClick={() => handleOnradio("Moderately active")}
              />
              <label>Moderately active</label>
            </div>

            <div>
              <input
                type="radio"
                className={classes.input}
                name="activity"
                onClick={() => handleOnradio("Very active")}
              />
              <label>Very active</label>
            </div>
          </div>
          {activityDataIndex && (
            <ul className={classes.list}>
              {activityData &&
                activityData[activityLevel].map(
                  (item: string, index: number) => <li key={index}>{item}</li>
                )}
            </ul>
          )}
        </div>
      </div>
      {/*<div className={classes.pageNumDiv}>
        <input type="radio" name="pageNum" />
        <input type="radio" name="pageNum" />
        </div>*/}

      <button className={classes.button}>Calculate</button>
      <button
        type="button"
        className={classes.skipAndRegister}
        onClick={handleRegister}
      >
        Skip and register
      </button>
      <p style={{ textAlign: "center" }}>
        Want to go back?{"  "}
        <Link style={{ marginTop: "-10px" }} to="..">
          Click here!
        </Link>
      </p>
    </form>
  );
}
