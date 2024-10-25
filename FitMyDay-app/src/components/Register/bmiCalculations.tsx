function bmiCalculation(height: number, weight: number) {
  const heightInMeters = height / 100;
  const squeredHeight = heightInMeters * heightInMeters;

  const BMI = weight / squeredHeight;

  return BMI;
}

function bmrCalculation(
  height: number,
  weight: number,
  age: number,
  gender: string
) {
  if (gender === "male") {
    const BMR = 10 * weight + 6.25 * height - 5 * age + 5;
    console.log(BMR);
    return BMR;
  }

  if (gender === "female") {
    const BMR = 10 * weight + 6.25 * height - 5 * age - 161;

    return BMR;
  }

  return 0;
}

export default function losingWeightCalculation(
  height: number,
  weight: number,
  age: number,
  gender: string,
  activity: string,
  targetWeight: number
) {
  // Not active - loses 0 calories daily (1.2)
  // Lightly active - loses 150 calories daily (1.375)
  // Moderately active - loses 530 calories daily (1.55)
  // Very active - loses 1275 calories calories daily (1.725)

  let activityLevel: number = 0;
  const BMR = bmrCalculation(height, weight, age, gender);
  const BMI = bmiCalculation(height, weight);

  switch (activity) {
    case "Not active":
      activityLevel = 1.2;
      break;
    case "Lightly active":
      activityLevel = 1.375;
      break;
    case "Moderately active":
      activityLevel = 1.55;
      break;
    case "Very active":
      activityLevel = 1.725;
  }

  const TDEE = BMR * activityLevel;
  const newCalorieIntake = TDEE - 500;

  const weightToLose = weight - targetWeight;
  const timeToLoseWeight = weightToLose * 2 * 7;

  return { newCalorieIntake, timeToLoseWeight, BMI };
}
