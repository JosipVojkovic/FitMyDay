import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import { createContext, useState } from "react";

type user = {
  auth: boolean;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
    attributes: {
      height: number;
      weight: number;
      age: number;
      targetWeight: number;
      gender: string;
      activityLevel: string;
    } | null;
  };
};

export const LoginContext = createContext({
  isLogged: false,
  handleLogin: (user: boolean) => {},
});
export default function RootLayout() {
  const [isLogged, setIsLogged] = useState(false);

  function handleLogin(user: boolean) {
    setIsLogged(user);
  }

  console.log(isLogged);
  return (
    <LoginContext.Provider value={{ isLogged, handleLogin }}>
      <MainNavigation />
      {<Outlet />}
    </LoginContext.Provider>
  );
}
