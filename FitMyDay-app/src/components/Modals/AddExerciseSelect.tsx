import classes from "./AddExerciseSelect.module.css";

export default function AddExerciseSelect({
  array,
  children,
  onClick,
  onDelete,
  state,
}) {
  return (
    <div className={classes.formDiv}>
      <label htmlFor="category">{children}</label>
      <select
        value={!state ? "Select category" : state}
        onChange={onClick}
        name="category"
        multiple
        className={classes.categorySelect}
        required
      >
        {array.map(
          (item) =>
            !state.includes(item) && (
              <option key={item} value={item}>
                {item}
              </option>
            )
        )}
      </select>
      <div className={classes.listDiv}>
        {state.map((item) => (
          <li key={item}>
            {item}
            <button onClick={() => onDelete(item)}>
              <i className="fa-solid fa-xmark" />
            </button>
          </li>
        ))}
      </div>
    </div>
  );
}
