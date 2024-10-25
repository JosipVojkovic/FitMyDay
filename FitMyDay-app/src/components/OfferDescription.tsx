import offerDescriptionData from "./offerDescriptionData";
import classes from "./OfferDescription.module.css";

export default function OfferDescription({
  offerDescription,
}: {
  offerDescription: null | string;
}) {
  if (offerDescription === "dumbell") {
    return (
      <div className={classes.offerDescription}>
        <ul>
          {offerDescriptionData.dumbell.map((item: string) => (
            <li>
              {item}
              <i className="fa-solid fa-check"></i>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (offerDescription === "food") {
    return (
      <div className={classes.offerDescription}>
        <ul>
          {offerDescriptionData.food.map((item: string) => (
            <li>
              {item}
              <i className="fa-solid fa-check"></i>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (offerDescription === "pen") {
    return (
      <div className={classes.offerDescription}>
        <ul>
          {offerDescriptionData.pen.map((item: string) => (
            <li>
              {item}
              <i className="fa-solid fa-check"></i>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (offerDescription === "calendar") {
    return (
      <div className={classes.offerDescription}>
        <ul>
          {offerDescriptionData.calendar.map((item: string) => (
            <li>
              {item}
              <i className="fa-solid fa-check"></i>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (offerDescription === "users") {
    return (
      <div className={classes.offerDescription}>
        <ul>
          {offerDescriptionData.users.map((item: string) => (
            <li>
              {item}
              <i className="fa-solid fa-check"></i>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (offerDescription === "chart") {
    return (
      <div className={classes.offerDescription}>
        <ul>
          {offerDescriptionData.chart.map((item: string) => (
            <li>
              {item}
              <i className="fa-solid fa-check"></i>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return;
}
