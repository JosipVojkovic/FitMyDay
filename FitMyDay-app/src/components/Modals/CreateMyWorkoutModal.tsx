import { useEffect, useState } from "react";
import classes from "./CreateMyWorkoutModal.module.css";
import { exerciseObject } from "../../util/types";

const filters = {
  level: ["beginner", "intermediate", "advanced"],
  equipment: ["bodyweight", "dumbells", "barbell", "machine"],
  category: ["arms", "back", "chest", "core", "legs"],
};

type filter = {
  active: boolean;
  searchBar: boolean;
  filters: string[];
  searchValue: string;
};

export default function CreateMyWorkoutModal({
  toggleModal,
  onClick,
}: {
  toggleModal: () => void;
  onClick: (selectedExercises: number[]) => void;
}) {
  const [exercises, setExercises] = useState<exerciseObject[]>([]);
  const [addMultiple, setAddMultiple] = useState(false);
  const [hoveredExerciseId, setHoveredExerciseId] = useState<null | number>(
    null
  );
  const [selectedExercises, setSelectedExercises] = useState<number[]>([]);
  const [filter, setFilter] = useState<filter>({
    active: false,
    searchBar: false,
    filters: [],
    searchValue: "",
  });

  function handleAddMultiple() {
    setAddMultiple((prevState) => !prevState);
    setSelectedExercises([]);
  }

  function handleHoveredExercise(id: number) {
    setHoveredExerciseId(id);
  }

  function handleUnhoveredExercise() {
    setHoveredExerciseId(null);
  }

  function handleSelectExercise(id: number) {
    setSelectedExercises((prevState) =>
      prevState.includes(id)
        ? prevState.filter((exerciseId) => exerciseId !== id)
        : [...prevState, id]
    );
  }

  function handleAddNumberOfExercise(
    event: React.MouseEvent<SVGSVGElement>,
    id: number
  ) {
    event.stopPropagation();
    setSelectedExercises((prevState) => [...prevState, id]);
  }

  function handleSubtractNumberOfExercise(
    event: React.MouseEvent<SVGSVGElement>,
    id: number
  ) {
    event.stopPropagation();
    setSelectedExercises((prevState) => {
      const lastIndex = prevState.lastIndexOf(id);

      return prevState.filter((exerciseId, index) => index !== lastIndex);
    });
  }

  function checkBoxActive(id: number) {
    if (selectedExercises.includes(id) || hoveredExerciseId === id) {
      return true;
    } else {
      return false;
    }
  }

  function handleActivateFilter() {
    setFilter((prevState) => ({
      active: !prevState.active,
      filters: [],
      searchBar: false,
      searchValue: "",
    }));
  }

  function handleActivateSearchBar() {
    setFilter((prevState) => ({
      active: false,
      searchBar: !prevState.searchBar,
      filters: [],
      searchValue: "",
    }));
  }

  function handleAddFilter(filter: string) {
    setFilter((prevState) => ({
      ...prevState,
      filters: prevState.filters.includes(filter)
        ? prevState.filters.filter((f) => f !== filter)
        : [...prevState.filters, filter],
    }));
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFilter((prevState) => ({
      ...prevState,
      searchValue: event.target.value,
    }));
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:8080/exercises");

      if (!response.ok) {
        return;
      }

      const data = await response.json();

      if (data) {
        setExercises(data);
      }
    }

    fetchData();
  }, []);

  let filteredExercises;

  if (filter.searchValue.length < 1 && filter.filters.length < 1) {
    filteredExercises = exercises;
  } else if (filter.active && filter.filters.length > 0) {
    filteredExercises = exercises.filter((e) => {
      const exerciseInfo = [...e.category, e.level];

      const foundFilters = filter.filters.every((element) =>
        exerciseInfo.includes(element)
      );

      console.log(foundFilters);

      if (foundFilters) {
        return e;
      }
    });
  } else if (filter.searchBar && filter.searchValue.length > 0) {
    filteredExercises = exercises.filter((e) =>
      e.name.toLowerCase().includes(filter.searchValue.toLowerCase())
    );
  }

  console.log(filteredExercises, filter);

  return (
    <div className={classes.background}>
      <div className={classes.modal}>
        <svg
          onClick={toggleModal}
          className={classes.exitIcon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
        </svg>
        <div className={classes.filterBar}>
          <button
            className={filter.active ? classes.filterActive : classes.filter}
            onClick={handleActivateFilter}
          >
            Filter <i className="fa-solid fa-angle-down"></i>
          </button>
          <div
            className={
              filter.searchBar ? classes.searchBarActive : classes.searchBar
            }
          >
            {filter.searchBar && (
              <input
                type="text"
                value={filter.searchValue}
                onChange={handleInputChange}
              />
            )}
            <i
              className={`fa-solid ${
                filter.searchBar ? "fa-xmark" : "fa-magnifying-glass"
              }`}
              onClick={handleActivateSearchBar}
            ></i>
          </div>
        </div>

        {filter.active && (
          <div className={classes.filterDiv}>
            {Object.entries(filters).map(([key, values]) => (
              <div>
                {values.map((f) => (
                  <label>
                    <input
                      type="checkbox"
                      value={f}
                      onChange={() => handleAddFilter(f)}
                      checked={filter.filters.includes(f)}
                    />{" "}
                    {f}
                  </label>
                ))}
              </div>
            ))}
          </div>
        )}
        <button onClick={handleAddMultiple} className={classes.add}>
          {addMultiple
            ? `Cancel (${selectedExercises.length})`
            : "Add multiple"}
        </button>
        {selectedExercises.length > 0 && (
          <div className={classes.selectedExercises}>
            {selectedExercises.map((id) => {
              const newExercise = exercises.find((e) => e.id === id);

              if (newExercise) {
                return <p>{newExercise.name}</p>;
              }
            })}
          </div>
        )}
        {filteredExercises &&
          filteredExercises.map((e: exerciseObject) => (
            <div
              className={
                addMultiple
                  ? `${classes.exerciseMainDiv} ${classes.cursor}`
                  : classes.exerciseMainDiv
              }
              style={
                selectedExercises.includes(e.id)
                  ? {
                      backgroundColor: "rgba(0,0,0,0.3)",
                    }
                  : undefined
              }
              onMouseOver={
                addMultiple ? () => handleHoveredExercise(e.id) : undefined
              }
              onMouseOut={addMultiple ? handleUnhoveredExercise : undefined}
              onClick={
                addMultiple ? () => handleSelectExercise(e.id) : undefined
              }
            >
              {addMultiple && (
                <div className={classes.exerciseQuantity}>
                  {selectedExercises.filter((id) => id === e.id).length > 0 && (
                    <>
                      <p>
                        {selectedExercises.filter((id) => id === e.id).length +
                          "x"}
                      </p>
                      <svg
                        className={classes.changeQuantity}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        onClick={(event) =>
                          handleAddNumberOfExercise(event, e.id)
                        }
                      >
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                      </svg>
                      <svg
                        className={classes.changeQuantity}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        onClick={(event) =>
                          handleSubtractNumberOfExercise(event, e.id)
                        }
                      >
                        <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                      </svg>
                    </>
                  )}
                  <svg
                    className={
                      selectedExercises.includes(e.id)
                        ? classes.boxIconActive
                        : classes.boxIcon
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      d={
                        checkBoxActive(e.id)
                          ? "M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                          : "M384 80c8.8 0 16 7.2 16 16V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16H384zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"
                      }
                    />
                  </svg>
                </div>
              )}
              <img src={e.gif} />
              <div>
                <h1>{e.name}</h1>
                <p>Primary muscles: {e["main-targeted-area"].join(", ")}</p>
                <p>
                  Secondary muscles: {e["other-targeted-muscles"].join(", ")}
                </p>
                {!addMultiple && (
                  <button onClick={() => onClick([e.id])}>Add</button>
                )}
              </div>
            </div>
          ))}
        {exercises.length < 1 && <h1>Loading...</h1>}
        {selectedExercises.length > 0 && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className={classes.submit}
            onClick={() => onClick(selectedExercises)}
          >
            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
          </svg>
        )}
      </div>
    </div>
  );
}
