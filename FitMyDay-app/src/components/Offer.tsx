import classes from "./Offer.module.css";
export default function Offer({
  offerDescription,
  onClick,
  icon,
  offer,
  title,
}: {
  offerDescription: string | null;
  onClick: () => void;
  icon: string;
  offer: string;
  title: string;
}) {
  return (
    <div
      className={
        offerDescription === offer ? classes.offerClicked : classes.offer
      }
      onClick={onClick}
    >
      <i className={`fa-solid ${icon} i`}></i>
      <h4>{title}</h4>
      <i
        className={`fa-solid fa-angle-up ${
          offerDescription === offer ? classes.down : classes.up
        }`}
      ></i>
    </div>
  );
}
