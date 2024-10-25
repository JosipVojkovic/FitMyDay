import { NavLink } from "react-router-dom";
import classes from "./UserInfo.module.css";
import { useContext, useState } from "react";
import { LoginContext } from "../../pages/RootLayout";

export default function UserInfo() {
  const [toggleUserIcon, setToggleUserIcon] = useState(false);

  const { handleLogin } = useContext(LoginContext);

  function handleUserIcon() {
    setToggleUserIcon((prevState: boolean) => !prevState);
  }
  return (
    <>
      <div
        className={
          toggleUserIcon
            ? `${classes.userIconDiv} ${classes.active}`
            : classes.userIconDiv
        }
        onClick={handleUserIcon}
      >
        <i className={`fa-solid fa-user ${classes.userIcon}`}></i>
      </div>
      {toggleUserIcon && (
        <ul className={classes.userNav}>
          <li>
            <NavLink to="/login">
              Settings <i className="fa-solid fa-gear"></i>
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" onClick={() => handleLogin(false)}>
              Logout <i className="fa-solid fa-right-from-bracket"></i>
            </NavLink>
          </li>
        </ul>
      )}
    </>
  );
}
