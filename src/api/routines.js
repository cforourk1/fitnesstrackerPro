const API = import.meta.env.VITE_API;

/**
 * Sends a new activity to the API to be created.
 * A valid token is required.
 */
export async function createRoutine(token, routine) {
  if (!token) {
    throw Error("You must be signed in to create a routine.");
  }

  const response = await fetch(API + "/routines", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(routine),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}


/** Fetches an array of sets
 *  from the API. */
export async function getRoutines
() {
  try {
    const response = await fetch(API + "/routines");
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

/**
 * Sends a new set
 *  to the API to be created.
 * A valid token is required.
 */
export async function createSet
(token, set) {
  if (!token) {
    throw Error("You must be signed in to create an set.");
  }

  const response = await fetch(API + "/sets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(set

    ),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

/**
 * Requests the API to delete the set
 *  with the given ID.
 * A valid token is required.
 */
export async function deleteSet
(token, id) {
  if (!token) {
    throw Error("You must be signed in to delete an set.");
  }

  const response = await fetch(API + "/sets/" + id, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

/**
 * Requests the API to delete the set
 *  with the given ID.
 * A valid token is required.
 */
export async function deleteRoutine
(token, id) {
  if (!token) {
    throw Error("You must be signed in to delete a routine.");
  }

  const response = await fetch(API + "/routines/" + id, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}