import { Outlet } from "react-router-dom";

import classes from "./RegisterPage.module.css";
import { useState } from "react";

export default function RegisterPage() {
  const [userData, setUserData] = useState({
    name: null,
    email: null,
    password: null,
    userAttributes: {
      height: null,
      weight: null,
      age: null,
      gender: null,
      targetWeight: null,
      activityLevel: null,
      BMI: null,
    },
    functions: {
      handleUserData,
      handleUserAttributes,
    },
  });

  function handleUserData(name: string, email: string, password: string) {
    setUserData((prevState: any) => ({
      ...prevState,
      name: name,
      email: email,
      password: password,
    }));
  }

  function handleUserAttributes(
    height: number,
    weight: number,
    age: number,
    gender: string,
    targetWeight: number,
    activityLevel: string
  ) {
    setUserData((prevState: any) => ({
      ...prevState,
      userAttributes: {
        height: height,
        weight: weight,
        age: age,
        gender: gender,
        targetWeight: targetWeight,
        activityLevel: activityLevel,
        BMI: null,
      },
    }));
  }

  return (
    <section className={classes.loginSection}>
      <Outlet context={userData} />
    </section>
  );
}
