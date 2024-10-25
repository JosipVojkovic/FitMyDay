import { useState } from "react";
import { forwardRef } from "react";

import classes from "./AddExerciseImage.module.css";

const AddExerciseImage = forwardRef(function AddExerciseImage(props, ref) {
  const [imageButton, setImageButton] = useState("URL");

  function handleImageButton(value: string) {
    setImageButton(value);
  }

  return (
    <div className={classes.formDiv}>
      <label className={classes.imageLabel} htmlFor="image-url">
        <button
          onClick={() => handleImageButton("URL")}
          className={imageButton === "URL" ? classes.activeButton : undefined}
          type="button"
        >
          Image URL
        </button>
        <button
          onClick={() => handleImageButton("Upload")}
          className={
            imageButton === "Upload" ? classes.activeButton : undefined
          }
          type="button"
        >
          Upload image
        </button>
      </label>
      {imageButton === "URL" ? (
        <input type="text" name="image-url" placeholder="URL" ref={ref} />
      ) : (
        <input type="file" name="image-upload" accept="image/*" />
      )}
    </div>
  );
});

export default AddExerciseImage;
