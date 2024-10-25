import classes from "./Header.module.css";
import headerImage from "../assets/header-img.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className={classes.header}>
      <div className={classes["header-bg"]}></div>
      <div className={classes["header-text"]}>
        <h1>The Best Website For Fitness!</h1>
        <p>
          Welcome to the Ultimate Hub for Fitness Excellence! Explore a World of
          Dynamic Workouts, Targeted Exercises, and Expert Nutrition Guidance.
          Transform Your Body, Energize Your Mind, and Elevate Your Health.
        </p>
        <p>
          Whether you're a beginner or a seasoned fitness enthusiast, dive into
          our comprehensive resources to unlock your full potential. Let's
          embark on this transformative journey together!
        </p>
        <Link to="register">Join us</Link>
      </div>
      <img src={headerImage} alt="guy doing dumbell curl" />
    </header>
  );
}
