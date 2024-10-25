import { useState } from "react";

import classes from "./Main.module.css";
import Offer from "./Offer";
import OfferDescription from "./OfferDescription";
import { Link } from "react-router-dom";

export default function Main() {
  const [offerDescription, setOfferDescription] = useState<null | string>(null);
  console.log(offerDescription);

  function handleOfferClick(id: string) {
    setOfferDescription((prevState) => (prevState === id ? null : id));
  }

  return (
    <section className={classes.main}>
      <h1 className={classes.h1}>What We Offer?</h1>

      <div className={classes.offers}>
        <Offer
          offerDescription={offerDescription}
          onClick={() => handleOfferClick("dumbell")}
          icon="fa-dumbbell"
          offer="dumbell"
          title="Get tons of exercises"
        />
        <Offer
          offerDescription={offerDescription}
          onClick={() => handleOfferClick("food")}
          icon="fa-bowl-food"
          offer="food"
          title="Get nutrition plans"
        />
        <Offer
          offerDescription={offerDescription}
          onClick={() => handleOfferClick("pen")}
          icon="fa-pen-to-square"
          offer="pen"
          title="Make your own workouts"
        />
        <Offer
          offerDescription={offerDescription}
          onClick={() => handleOfferClick("calendar")}
          icon="fa-calendar"
          offer="calendar"
          title="Create your own workout plans"
        />
        <Offer
          offerDescription={offerDescription}
          onClick={() => handleOfferClick("users")}
          icon="fa-users"
          offer="users"
          title="Get in contact with other users"
        />
        <Offer
          offerDescription={offerDescription}
          onClick={() => handleOfferClick("chart")}
          icon="fa-chart-simple"
          offer="chart"
          title="Analyze your progress"
        />
      </div>
      <OfferDescription offerDescription={offerDescription} />
      <Link to="register">Find out more</Link>
    </section>
  );
}
