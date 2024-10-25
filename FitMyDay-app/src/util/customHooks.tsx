export function getTokenFromLocalStorage() {
  const storedAccessToken = localStorage.getItem("accessToken");

  return storedAccessToken;
}

export function workoutImage(workout: string) {
  let image;
  switch (workout) {
    case "lower body":
      image =
        "https://media.istockphoto.com/id/622809280/photo/do-not-skip-leg-day.jpg?s=612x612&w=0&k=20&c=tzliB47Wy2cEYpEvgDgBEgsvTpvDTsoZG7aun18swSc=";
      break;
    case "abs":
      image =
        "https://skinnyms.com/wp-content/uploads/2019/09/The-One-Easiest-Way-to-Tighten-Your-Abs-Photo-1.jpg";
      break;
    case "chest":
      image =
        "https://www.healthkart.com/connect/wp-content/uploads/2016/03/banner-7.jpg";
      break;
    case "upper body":
      image =
        "https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2017/02/bodybuilder-seated-dumbbells-promo.jpg?quality=86&strip=all";
      break;
    case "back":
      image =
        "https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2019/05/man-gym-lat-pulldown-1109.jpg?quality=86&strip=all";
      break;
    case "shoulders":
      image =
        "https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2023/05/shutterstock_336330470-scaled.jpg?fit=2560%2C1707&ssl=1";
      break;
    case "cardio":
      image =
        "https://hips.hearstapps.com/hmg-prod/images/push-ups-royalty-free-image-601369426-1543519385.jpg?crop=0.88981xw:1xh;center,top&resize=1200:*";
      break;
    case "legs":
      image =
        "https://cdn.muscleandstrength.com/sites/default/files/field/feature-image/workout/cir800.jpg";
      break;
    case "arms":
      image =
        "https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2014/09/big-biceps-now.jpg?quality=86&strip=all";
      break;
    default:
      break;
  }

  return image;
}
