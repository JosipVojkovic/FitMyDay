const express = require("express");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { error } = require("console");

require("dotenv").config();

const app = express();
const PORT = 8080;

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Read user data from the JSON file
const userDataPath = "user-data.json";

// Function to generate a unique ID
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9); // Example of generating a unique ID
}

// Function to check if an email is already taken
function isEmailTaken(email, users) {
  return users.some((user) => user.email === email);
}

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.userId = decoded.userId;
    next();
  });
}

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Read user data from the JSON file
  fs.readFile("user-data.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading user data file:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    try {
      const users = JSON.parse(data);

      // Find the user by email
      const user = users.find((u) => u.email === email);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if passwords match
      if (user.password !== password) {
        return res.status(401).json({ error: "Incorrect password" });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });

      // Respond with token and user data
      res.json({ auth: true, token, user });
    } catch (error) {
      console.error("Error parsing user data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
});

app.post("/users/email", (req, res) => {
  const { email } = req.body;

  fs.readFile(userDataPath, "utf8", (err, data) => {
    if (err && err.code !== "ENOENT") {
      console.error("Error reading user data file:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    let users = [];
    if (data) {
      users = JSON.parse(data);
    }

    // Check if email is already taken
    if (isEmailTaken(email, users)) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    return res.json({ message: "Email is not taken" });
  });
});

// POST endpoint for adding new user data
app.post("/register", async (req, res) => {
  const { name, email, password, attributes } = req.body;

  // Read existing user data from file
  fs.readFile(userDataPath, "utf8", (err, data) => {
    if (err && err.code !== "ENOENT") {
      console.error("Error reading user data file:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    let users = [];
    if (data) {
      users = JSON.parse(data);
    }

    // Check if email is already taken
    if (isEmailTaken(email, users)) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    // Generate unique ID
    const id = generateUniqueId();

    // Create new user object
    const newUser = {
      id,
      name,
      email,
      password,
      attributes,
    };

    // Add new user to existing users array
    users.push(newUser);

    // Write updated user data back to file
    fs.writeFile(userDataPath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error("Error saving user data:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      // Respond with newly created user data
      res.status(201).json(newUser);
    });
  });
});

app.post("/users/update", (req, res) => {
  const { email, attributes } = req.body;

  // Read existing user data from file
  fs.readFile(userDataPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading user data file:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    try {
      let users = JSON.parse(data);

      // Find the user object with the matching email
      const userIndex = users.findIndex((user) => user.email === email);
      if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
      }

      // Update user attributes with the values from the request body
      users[userIndex].attributes = attributes;

      // Write updated user data back to file
      fs.writeFile(userDataPath, JSON.stringify(users, null, 2), (err) => {
        if (err) {
          console.error("Error saving user data:", err);
          return res.status(500).json({ error: "Internal server error" });
        }

        // Respond with the updated user object
        res.json(users[userIndex]);
      });
    } catch (error) {
      console.error("Error parsing user data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
});

// GET endpoint to fetch exercises data
app.get("/exercises", (req, res) => {
  fs.readFile("exercises.json", (err, data) => {
    if (err) {
      console.error("Error reading exercises data:", err);
      res.status(500).json({ error: "Error reading exercises data" });
    } else {
      const exercisesData = JSON.parse(data);
      res.status(200).json(exercisesData);
    }
  });
});

app.post("/exercises", verifyToken, (req, res) => {
  const exercisesId = req.body.exercises;

  fs.readFile("exercises.json", (err, data) => {
    if (err) {
      console.error("Error reading exercises data:", err);
      res.status(500).json({ error: "Error reading exercises data" });
    }

    const exercises = JSON.parse(data);

    const newExercises = exercisesId.map((id) => {
      const exercise = exercises.find((e) => e.id === id);

      return exercise;
    });

    if (newExercises.length < 1) {
      return res.status(404).json({ message: "Exercises not found" });
    }

    res.status(200).json(newExercises);
  });
});

// Route to update additional user data
app.post("/exercises/favourite", verifyToken, (req, res) => {
  const userId = req.userId;
  const favouriteExercise = req.body["favourite-exercise"];

  fs.readFile("user-data.json", (err, data) => {
    if (err) {
      console.error("Error reading users data:", err);
      res.status(500).json({ error: "Error reading users data" });
    }

    let users;

    if (data) {
      users = JSON.parse(data);
    }

    // Find the user in the sample user data
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    if (users[userIndex]["favourite-exercises"]) {
      users[userIndex]["favourite-exercises"].push(favouriteExercise);
    } else {
      users[userIndex]["favourite-exercises"] = [favouriteExercise];
    }

    fs.writeFile("user-data.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error("Error saving user data:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.json(users[userIndex]);
    });

    // Return a success message
    res.json({
      message: "User data updated successfully",
      user: users[userIndex],
    });
  });
});

// app.get("/exercises/favourite", verifyToken, (req, res) => {
//   const userId = req.userId;

//   fs.readFile("user-data.json", (err, data) => {
//     if (err) {
//       console.error("Error reading users data:", err);
//       res.status(500).json({ error: "Error reading users data" });
//     }
//     let users;

//     if (data) {
//       users = JSON.parse(data);
//     }

//     const user = users.find((u) => u.id === userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const userFavouriteExercises = user["favourite-exercises"];

//     if (!userFavouriteExercises) {
//       return res
//         .status(404)
//         .json({ message: "User favourite exercises not found" });
//     }

//     res.status(200).json(userFavouriteExercises);
//   });
// });

app.get("/exercises/favourite", verifyToken, (req, res) => {
  const userId = req.userId;

  fs.readFile("user-data.json", (err, data) => {
    if (err) {
      console.error("Error reading users data:", err);
      res.status(500).json({ error: "Error reading users data" });
    }
    let users;

    if (data) {
      users = JSON.parse(data);
    }

    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userFavouriteExercises = user["favourite-exercises"];

    if (!userFavouriteExercises) {
      return res
        .status(404)
        .json({ message: "User favourite exercises not found" });
    }

    fs.readFile("exercises.json", (err, data) => {
      if (err) {
        console.error("Error reading exercises data:", err);
        res.status(500).json({ error: "Error reading exercises data" });
      }

      let exercises;

      if (data) {
        exercises = JSON.parse(data);
      }

      const favouriteExercises = exercises.filter((e) =>
        userFavouriteExercises.includes(e.id)
      );

      if (!favouriteExercises) {
        return res
          .status(404)
          .json({ message: "Favourite exercises not found" });
      }
      res.status(200).json(favouriteExercises);
    });
  });
});

app.delete("/exercises/favourite", verifyToken, (req, res) => {
  const userId = req.userId;
  const unfavouriteExercise = req.body["unfavourite-exercise"];

  fs.readFile("user-data.json", (err, data) => {
    if (err) {
      console.error("Error reading users data:", err);
      res.status(500).json({ error: "Error reading users data" });
    }
    let users;

    if (data) {
      users = JSON.parse(data);
    }

    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!users[userIndex]["favourite-exercises"]) {
      return res.status(404).json({ message: "Favourite exercises not found" });
    }
    users[userIndex]["favourite-exercises"].splice(
      users[userIndex]["favourite-exercises"].indexOf(unfavouriteExercise),
      1
    );

    fs.writeFile("user-data.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error("Error saving user data:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
    });

    fs.readFile("exercises.json", (err, data) => {
      if (err) {
        console.error("Error reading exercises data:", err);
        res.status(500).json({ error: "Error reading exercises data" });
      }

      let exercises;

      if (data) {
        exercises = JSON.parse(data);
      }

      const favouriteExercises = exercises.filter((e) =>
        users[userIndex]["favourite-exercises"].includes(e.id)
      );

      if (!favouriteExercises) {
        return res
          .status(404)
          .json({ message: "Favourite exercises not found" });
      }
      res.status(200).json(favouriteExercises);
    });
  });
});

app.post("/exercises/my-exercises", verifyToken, (req, res) => {
  const userId = req.userId;
  const exercise = req.body;

  fs.readFile("users-exercises.json", (err, data) => {
    if (err) {
      console.error("Error reading users-exercises data:", err);
      res.status(500).json({ error: "Error reading users-exercises data" });
    }
    let exercises;

    if (data) {
      exercises = JSON.parse(data);
    }

    const id = generateUniqueId();

    exercises.push({
      id: id,
      userId: userId,
      name: exercise.name,
      equipment: exercise.equipment,
      category: [...exercise.category, exercise.equipment],
      "main-targeted-area": [...exercise["main-targeted-area"]],
      "other-targeted-muscles": [...exercise["other-targeted-muscles"]],
      level: exercise.level,
      technique: exercise.technique,
      image: exercise.image,
    });

    fs.writeFile(
      "users-exercises.json",
      JSON.stringify(exercises, null, 2),
      (err) => {
        if (err) {
          console.error("Error saving user data:", err);
          return res.status(500).json({ error: "Internal server error" });
        }
        res.json(exercise);
      }
    );
  });
});

app.get("/exercises/my-exercises", verifyToken, (req, res) => {
  const userId = req.userId;

  fs.readFile("users-exercises.json", (err, data) => {
    if (err) {
      console.error("Error reading users-exercises data:", err);
      res.status(500).json({ error: "Error reading users-exercises data" });
    }

    let exercises;

    if (data) {
      exercises = JSON.parse(data);
    }

    const userExercises = exercises.filter((e) => e.userId === userId);

    if (!userExercises) {
      return res.status(404).json({ message: "User exercises not found" });
    }

    res.status(200).json(userExercises);
  });
});

app.delete("/exercises/my-exercises", verifyToken, (req, res) => {
  const userId = req.userId;
  const deleteExercises = req.body["delete-exercises"];

  fs.readFile("users-exercises.json", (err, data) => {
    if (err) {
      console.error("Error reading users exercises data:", err);
      res.status(500).json({ error: "Error reading users exercises data" });
    }
    let exercises;

    if (data) {
      exercises = JSON.parse(data);
    }

    const newUsersExercises = exercises.filter((e) => {
      if (e.userId === userId && deleteExercises.includes(e.name)) {
        return;
      }
      return e;
    });

    fs.writeFile(
      "users-exercises.json",
      JSON.stringify(newUsersExercises, null, 2),
      (err) => {
        if (err) {
          console.error("Error saving users exercises data:", err);
          return res.status(500).json({ error: "Internal server error" });
        }
        res.json({ message: "Exercises deleted succesfully" });
      }
    );
  });
});

// app.post("/workouts", verifyToken, (req, res) => {
//   const { category, equipment, level } = req.body;

//   fs.readFile("workouts.json", (err, data) => {
//     if (err) {
//       console.error("Error reading users-exercises data:", err);
//       res.status(500).json({ error: "Error reading users-exercises data" });
//     }

//     let workouts;

//     if (data) {
//       workouts = JSON.parse(data);
//     }

//     const workoutIndex = workouts.findIndex((w) => {
//       if (
//         w.category === category &&
//         w.equipment === equipment &&
//         w.level === level
//       ) {
//         return w;
//       }
//     });

//     if (workoutIndex === -1) {
//       return res
//         .status(404)
//         .json({ message: "That type of workout is not found" });
//     }

//     res.status(200).json(workouts[workoutIndex]);
//   });
// });

app.post("/workouts", verifyToken, (req, res) => {
  const { category, equipment, level } = req.body;

  fs.readFile("workouts.json", (err, data) => {
    if (err) {
      console.error("Error reading workouts data:", err);
      res.status(500).json({ error: "Error reading workouts data" });
    }

    let workouts;

    if (data) {
      workouts = JSON.parse(data);
    }

    const workoutIndex = workouts.findIndex((w) => {
      if (
        w.category === category &&
        w.equipment === equipment &&
        w.level === level
      ) {
        return w;
      }
    });

    if (workoutIndex === -1) {
      return res
        .status(404)
        .json({ message: "That type of workout is not found" });
    }

    fs.readFile("exercises.json", (err, data) => {
      if (err) {
        console.error("Error reading exercises data:", err);
        res.status(500).json({ error: "Error reading exercises data" });
      }

      let exercises;

      if (data) {
        exercises = JSON.parse(data);
      }

      const workoutExercises = workouts[workoutIndex].exercises.map(
        (exercise) => {
          const matchingExercise = exercises.find(
            (item) => item.id === exercise.id
          );

          return {
            ...matchingExercise,
            sets: exercise.sets,
            reps: exercise.reps,
          };
        }
      );

      if (!workoutExercises) {
        return res.status(404).json({ message: "Workout exercises not found" });
      }

      res.status(200).json(workoutExercises);
    });
  });
});

app.get("/workouts/my-workouts", verifyToken, (req, res) => {
  const userId = req.userId;

  fs.readFile("users-workouts.json", (err, data) => {
    if (err) {
      console.error("Error reading users-workouts data:", err);
      res.status(500).json({ error: "Error reading users-workouts data" });
    }

    let workouts;

    if (data) {
      workouts = JSON.parse(data);
    }

    const userWorkouts = workouts.filter((w) => w.userId === userId);

    if (!userWorkouts) {
      return res.status(404).json({ message: "User workouts not found" });
    }

    res.status(200).json(userWorkouts);
  });
});

app.post("/workouts/my-workouts", verifyToken, (req, res) => {
  const userId = req.userId;
  const { name, category, equipment, level, exercises } = req.body;

  fs.readFile("users-workouts.json", (err, data) => {
    if (err) {
      console.error("Error reading users-workouts data:", err);
      res.status(500).json({ error: "Error reading users-workouts data" });
    }

    let workouts;

    if (data) {
      workouts = JSON.parse(data);
    }

    const workout = {
      userId,
      id: generateUniqueId(),
      name,
      category,
      equipment,
      level,
      exercises,
    };

    workouts.push(workout);

    fs.writeFile(
      "users-workouts.json",
      JSON.stringify(workouts, null, 2),
      (err) => {
        if (err) {
          console.error("Error saving users workouts data:", err);
          return res.status(500).json({ error: "Internal server error" });
        }
        res.json(workout);
      }
    );
  });
});

app.post("/workouts/my-workouts/workout", verifyToken, (req, res) => {
  const userId = req.userId;
  const { workoutId } = req.body;

  fs.readFile("users-workouts.json", (err, data) => {
    if (err) {
      console.error("Error reading users-workouts data:", err);
      res.status(500).json({ error: "Error reading users-workouts data" });
    }

    let workouts;

    if (data) {
      workouts = JSON.parse(data);
    }

    const workout = workouts.find((w) => w.id === workoutId);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    fs.readFile("exercises.json", (err, data) => {
      if (err) {
        console.error("Error reading exercises data:", err);
        res.status(500).json({ error: "Error reading exercises data" });
      }

      let exercises;

      if (data) {
        exercises = JSON.parse(data);
      }

      const completeExercises = workout.exercises.map((e) => {
        const exercise = exercises.find((item) => item.id === e.id);

        return { ...exercise, reps: e.reps, sets: e.sets };
      });

      const completeWorkout = {
        name: workout.name,
        category: workout.category,
        equipment: workout.equipment,
        level: workout.level,
        exercises: completeExercises,
      };

      res.status(200).json(completeWorkout);
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
