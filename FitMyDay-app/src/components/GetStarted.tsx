import { Link } from "react-router-dom";
import classes from "./GetStarted.module.css";
export default function GetStarted() {
  return (
    <section className={classes.getStarted}>
      <div>
        <h1>
          Whether you're a seasoned fitness enthusiast or just beginning your
          journey, we invite you to join the <span> FitMyDay </span> family and
          take the first step toward a healthier, happier you. <br />
          <br />
          With our expert guidance, personalized support, and inclusive
          community, we're confident that you'll not only reach your fitness
          goals but also discover the joy and empowerment that comes with living
          a fit and healthy lifestyle. <br />
          <br />
          Let's embark on this journey together!
        </h1>
        <Link to="register">Get Started Today</Link>
      </div>
    </section>
  );
}
