import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { LoginContext } from "../../pages/RootLayout";
import { useContext } from "react";

import classes from "./CalculatedBMI.module.css";
import arrow from "../../assets/arrow.png";
import underweight from "../../assets/underweight.png";
import normalWeight from "../../assets/normalWeight.png";
import overweight from "../../assets/overweight.png";
import obese from "../../assets/obese.png";
import losingWeightCalculation from "./bmiCalculations";
import { postData } from "../../util/http";

export default function CalculatedBMI() {
  const { handleLogin } = useContext(LoginContext);
  const navigate = useNavigate();

  const { name, email, password, userAttributes } = useOutletContext();
  const { height, weight, age, targetWeight, gender, activityLevel } =
    userAttributes;

  const losingWeightResults = losingWeightCalculation(
    height,
    weight,
    age,
    gender,
    activityLevel,
    targetWeight
  );

  console.log(losingWeightResults);

  const BMI = losingWeightResults.BMI;
  let bmiCategory;
  let arrowRotation;
  let weightCategoryImg;
  let color;

  if (BMI < 18.5) {
    bmiCategory = "underweight";
    arrowRotation = (BMI / 18.5) * 38.5;
    weightCategoryImg = underweight;
    color = "#60ccf3";
  } else if (BMI === 18.5) {
    bmiCategory = "normal";
    arrowRotation = 38.5;
    weightCategoryImg = normalWeight;
    color = "#63bc46";
  } else if (BMI < 25) {
    bmiCategory = "normal";
    arrowRotation = ((BMI - 18.5) / 6.5) * 51.5 + 38.5;
    weightCategoryImg = normalWeight;
    color = "#63bc46";
  } else if (BMI === 25) {
    bmiCategory = "overweight";
    arrowRotation = 90;
    weightCategoryImg = overweight;
    color = "#f78f2c";
  } else if (BMI < 30) {
    bmiCategory = "overweight";
    arrowRotation = ((BMI - 25) / 5) * 46.3 + 38.5 + 51.5;
    weightCategoryImg = overweight;
    color = "#f78f2c";
  } else if (BMI === 30) {
    bmiCategory = "obese";
    arrowRotation = 136.3;
    weightCategoryImg = obese;
    color = "#ee3928";
  } else {
    bmiCategory = "obese";
    weightCategoryImg = obese;
    color = "#ee3928";
    if (BMI < 45) {
      arrowRotation = ((BMI - 30) / 15) * 44 + 38.5 + 51.5 + 46.3;
    } else {
      arrowRotation = 180;
    }
  }

  async function handleRegister() {
    try {
      await postData(name, email, password, {
        height,
        weight,
        age,
        targetWeight,
        gender,
        activityLevel,
      });
    } catch (error) {
      return;
    }
    handleLogin(true);
    navigate("/exercises");
  }

  return (
    <div className={classes.loginForm}>
      <h1>
        Your BMI is: <span style={{ color: color }}>{BMI.toFixed(1)}</span>
      </h1>
      <div className={classes.wheelDiv}>
        <div className={classes.underweight}>
          <p>Underweight</p>
        </div>
        <div className={classes.normalWeight}>
          <p>Normal</p>
        </div>

        <div className={classes.obese}>
          <p>Obese</p>
        </div>
        <div className={classes.overweight}>
          <p>Overweight</p>
        </div>
        <div className={classes.smallCircle}></div>
        <img
          src={arrow}
          alt="arrow"
          className={classes.arrow}
          style={{
            transform: `translate(-50%, 0) rotate(${arrowRotation}deg)`,
          }}
        />
      </div>
      <div className={classes.weightCategoryDiv}>
        <img
          src={weightCategoryImg}
          alt="underweight person"
          className={classes.weightCategory}
        />
        {bmiCategory === "normal" ? (
          <h2>
            You have <span style={{ color: color }}>{bmiCategory}</span> weight
          </h2>
        ) : (
          <h2>
            You are <span style={{ color: color }}>{bmiCategory}</span>
          </h2>
        )}
        <div className={classes.weightParagraphsDiv}>
          <p style={{ color: "#60ccf3" }}>{"<"} 18.5 is underweight</p>
          <p style={{ color: "#63bc46" }}>18.5 - 24.9 is normal</p>
          <p style={{ color: "#f78f2c" }}>25 - 29.9 is overweight</p>
          <p style={{ color: "#ee3928" }}>{">"} 29.9 is obese</p>
        </div>
      </div>
      <h2
        style={{
          textAlign: "center",
          lineHeight: "30px",
          fontSize: "20px",
          marginTop: "-10px",
        }}
      >
        Your daily calorie intake should be{" "}
        {Math.round(losingWeightResults.newCalorieIntake)} calories for{" "}
        {losingWeightResults.timeToLoseWeight} days to reach targeted weight of{" "}
        {targetWeight}kg.
      </h2>
      <h2 style={{ marginBottom: "-30px", fontSize: "26px", color: color }}>
        Let`s get started!
      </h2>
      <button onClick={handleRegister}>Register</button>
      <p style={{ textAlign: "center" }}>
        Want to go back?{"  "}
        <Link style={{ marginTop: "-10px", color: "#b83021" }} to="../BMI">
          Click here!
        </Link>
      </p>
    </div>
  );
}
