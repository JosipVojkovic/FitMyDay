import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import RootLayout from "./pages/RootLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CalculatedBMI from "./components/Register/CalculatedBMI";
import Registration from "./components/Register/Registration";
import RegistrationSecondStep from "./components/Register/RegistrationSecondStep";
import Exercises from "./pages/Exercises";
import ExercisesList from "./components/Exercises/ExercisesList";
import MyExercisesList from "./components/Exercises/MyExercisesList";
import FavouriteExercisesList from "./components/Exercises/FavouriteExercisesList";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedRouteLoggedout from "./components/ProtectedRouteLoggedout";
import Workouts from "./pages/Workouts";
import WorkoutsList from "./components/Workouts/WorkoutsList";
import MyWorkoutsList from "./components/Workouts/MyWorkoutsList";
import FavouriteWorkoutsList from "./components/Workouts/FavouriteWorkoutsList";
import WorkoutDetails from "./components/Workouts/WorkoutDetails";
import MyWorkoutDetails from "./components/Workouts/MyWorkoutDetails";
import RootMyWorkouts from "./pages/RootMyWorkouts";
import CreateMyWorkout from "./components/Workouts/CreateMyWorkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRouteLoggedout>
            <HomePage />
          </ProtectedRouteLoggedout>
        ),
      },
      {
        path: "login",
        element: (
          <ProtectedRouteLoggedout>
            <LoginPage />
          </ProtectedRouteLoggedout>
        ),
      },
      {
        path: "register",
        element: (
          <ProtectedRouteLoggedout>
            <RegisterPage />
          </ProtectedRouteLoggedout>
        ),
        children: [
          {
            index: true,
            element: <Registration />,
          },
          {
            path: "BMI",
            element: <RegistrationSecondStep />,
          },
          {
            path: "BMI-results",
            element: <CalculatedBMI />,
          },
        ],
      },
      {
        path: "exercises",
        element: (
          <ProtectedRoute>
            <Exercises />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <ExercisesList />,
          },
          {
            path: "my-exercises",
            element: <MyExercisesList />,
          },
          {
            path: "favourite-exercises",
            element: <FavouriteExercisesList />,
          },
        ],
      },
      {
        path: "workouts",
        element: (
          <ProtectedRoute>
            <Workouts />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <WorkoutsList />,
          },
          {
            path: "my-workouts",
            element: <RootMyWorkouts />,
            children: [
              {
                index: true,
                element: <MyWorkoutsList />,
              },
              {
                path: ":id",
                element: <MyWorkoutDetails />,
              },
              {
                path: "create-workout",
                element: <CreateMyWorkout />,
              },
            ],
          },
          {
            path: "favourite-workouts",
            element: <FavouriteWorkoutsList />,
          },
          {
            path: ":id",
            element: <WorkoutDetails />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
