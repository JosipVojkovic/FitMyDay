import classes from "./WorkoutDetailsNav.module.css";

const navCategories = [
  { name: "Equipment", subCategories: ["Bodyweight", "Dumbells", "Gym"] },
  { name: "Level", subCategories: ["Beginner", "Intermediate", "Advanced"] },
];

export default function WorkoutDetailsNav({
  category,
  subCategory,
  handleCategory,
  handleSubCategory,
}) {
  return (
    <nav className={classes.nav}>
      {navCategories.map((categoryItem) => (
        <li key={categoryItem.name}>
          <a
            onClick={() => handleCategory(categoryItem.name)}
            className={
              category === categoryItem.name
                ? classes.activeCategory
                : undefined
            }
          >
            {categoryItem.name}
            <i className="fa-solid fa-angle-down"></i>
          </a>
          {category === categoryItem.name && (
            <ul>
              {categoryItem.subCategories.map((subCategoryItem) => (
                <li
                  key={subCategoryItem}
                  onClick={() => handleSubCategory(subCategoryItem)}
                  className={
                    subCategory === subCategoryItem
                      ? classes.activeCategory
                      : undefined
                  }
                >
                  <a>{subCategoryItem}</a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </nav>
  );
}
