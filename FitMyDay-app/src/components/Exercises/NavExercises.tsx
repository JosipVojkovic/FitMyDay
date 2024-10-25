import classes from "./NavExercises.module.css";

import armIcon from "../../assets/arm-icon.png";
import legIcon from "../../assets/leg-icon.png";
import chestIcon from "../../assets/chest-icon.png";
import backIcon from "../../assets/back-icon.png";
import absIcon from "../../assets/abs-icon.png";
import dumbellIcon from "../../assets/dumbell-icon.png";
import barbellIcon from "../../assets/barbell-icon.png";
import machineIcon from "../../assets/machine-icon.png";
import bodyweightIcon from "../../assets/bodyweight-icon.png";
import pushIcon from "../../assets/push.png";
import pullIcon from "../../assets/pull-up.png";
import compoundIcon from "../../assets/compound.png";
import { useEffect, useState } from "react";

const navData = [
  {
    categoryName: "all",
    subCategories: [],
  },
  {
    categoryName: "muscle",
    subCategories: [
      {
        name: "arms",
        icon: armIcon,
      },
      {
        name: "chest",
        icon: chestIcon,
      },
      {
        name: "legs",
        icon: legIcon,
      },
      {
        name: "back",
        icon: backIcon,
      },
      {
        name: "core",
        icon: absIcon,
      },
    ],
  },
  {
    categoryName: "equipment",
    subCategories: [
      {
        name: "bodyweight",
        icon: bodyweightIcon,
      },
      {
        name: "dumbells",
        icon: dumbellIcon,
      },
      {
        name: "barbell",
        icon: barbellIcon,
      },
      {
        name: "machine",
        icon: machineIcon,
      },
    ],
  },
  {
    categoryName: "type",
    subCategories: [
      {
        name: "push",
        icon: pushIcon,
      },
      {
        name: "pull",
        icon: pullIcon,
      },
      {
        name: "compound",
        icon: compoundIcon,
      },
    ],
  },
];

export default function NavExercises({
  navCategory,
  handleClickedCategory,
  navSubCategory,
  handleSubCategory,
}: {
  navCategory: string;
  handleClickedCategory: (category: string) => void;
  navSubCategory: string;
  handleSubCategory: (subCategory: string) => void;
}) {
  const display = { display: "block", backgroundColor: "#1a1a1a" };
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY || window.pageYOffset;
      setIsFixed(scrollPosition > 290);
    }

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ul
      className={classes.nav}
      style={{
        position: isFixed ? "fixed" : "absolute",
        top: isFixed ? "40px" : "auto",
      }}
    >
      {navData.map((item) => (
        <li
          onClick={() => handleClickedCategory(item.categoryName)}
          key={item.categoryName}
        >
          <a
            className={
              navCategory === item.categoryName ? classes.active : undefined
            }
          >
            {item.categoryName}
          </a>

          <ul style={navCategory === item.categoryName ? display : undefined}>
            {item.subCategories.map((subCategory) => (
              <li key={subCategory.name}>
                <a
                  className={
                    navSubCategory === subCategory.name
                      ? classes.subCategoryActive
                      : undefined
                  }
                  onClick={() => handleSubCategory(subCategory.name)}
                >
                  {navSubCategory === subCategory.name && (
                    <span className={classes.circleStyle}>&#9679;</span>
                  )}{" "}
                  {subCategory.name}
                  <img src={subCategory.icon} />
                </a>
              </li>
            ))}
          </ul>
        </li>
      ))}

      {navSubCategory && <h2>{navSubCategory}</h2>}
    </ul>
  );
}
