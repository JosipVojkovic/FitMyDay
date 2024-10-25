import { json } from "react-router-dom";

type userAttributes = {
  height: string | undefined;
  weight: string | undefined;
  age: string | undefined;
  targetWeight: string | undefined;
  gender: string | undefined;
  activityLevel: string | undefined;
};

type myExercise = {
  name: string;
  equipment: string;
  category: string[];
  "main-targeted-area": string[];
  "other-targeted-muscles": string[];
  level: string;
  technique: string;
  image: string;
};

export async function checkEmail(email: string) {
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  };

  const response = await fetch("http://localhost:8080/users/email", request);

  if (!response.ok) {
    throw json({ message: "Could not register user." }, { status: 500 });
  }

  return response;
}

export async function postData(
  name: string,
  email: string,
  password: string,
  attributes: userAttributes | null
) {
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
      attributes: attributes,
    }),
  };

  const response = await fetch("http://localhost:8080/register", request);

  if (!response.ok) {
    throw json({ message: "Could not register user." }, { status: 500 });
  }

  return response;
}

export async function updateUser(email: string, attributes: userAttributes) {
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      attributes: attributes,
    }),
  };

  const response = await fetch("http://localhost:8080/users/update", request);

  if (!response.ok) {
    throw json({ message: "Could not update user." }, { status: 500 });
  }

  return response;
}

export async function login(email: string, password: string) {
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  };

  const response = await fetch("http://localhost:8080/login", request);
  const data = await response.json();

  if (!response.ok) {
    throw json({ message: "Could not login user" }, { status: 500 });
  }

  return data;
}

export async function favouriteExercises(
  token: string | null,
  exercise: number
) {
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      "favourite-exercise": exercise,
    }),
  };

  const response = await fetch(
    "http://localhost:8080/exercises/favourite",
    request
  );

  const data = await response.json();

  if (!response.ok) {
    throw json(
      { message: "Could not add favourite exercise" },
      { status: 500 }
    );
  }

  return data;
}

export async function getFavouriteExercises(token: string | null) {
  const request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
  };

  const response = await fetch(
    "http://localhost:8080/exercises/favourite",
    request
  );

  const data = await response.json();

  if (!response.ok) {
    throw json(
      { message: "Could not get favourite exercises" },
      { status: 500 }
    );
  }

  return data;
}

export async function deleteFavExercise(
  token: string | null,
  exercise: number
) {
  const request = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      "unfavourite-exercise": exercise,
    }),
  };

  const response = await fetch(
    "http://localhost:8080/exercises/favourite",
    request
  );

  const data = await response.json();

  if (!response.ok) {
    throw json(
      { message: "Could not get favourite exercises" },
      { status: 500 }
    );
  }

  return data;
}

export async function getMyExercises(token: string | null) {
  const request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
  };

  const response = await fetch(
    "http://localhost:8080/exercises/my-exercises",
    request
  );

  const data = await response.json();

  if (!response.ok) {
    throw json({ message: "Could not get user exercises" }, { status: 500 });
  }

  return data;
}

export async function addMyExercise(
  token: string | null,
  myExercise: myExercise
) {
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify(myExercise),
  };

  const response = await fetch(
    "http://localhost:8080/exercises/my-exercises",
    request
  );

  if (!response.ok) {
    throw json({ message: "Could not add user exercise" }, { status: 500 });
  }

  return;
}

export async function deleteMyExercises(
  token: string | null,
  deleteExercises: string[]
) {
  const request = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify({ "delete-exercises": [...deleteExercises] }),
  };

  const response = await fetch(
    "http://localhost:8080/exercises/my-exercises",
    request
  );

  if (!response.ok) {
    throw json({ message: "Could not delete user exercises" }, { status: 500 });
  }

  return;
}
