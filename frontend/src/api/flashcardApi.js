import { get, post, _delete, patch } from "./fetchWrapper";
import { BASE_URL } from "../constants";

console.log(BASE_URL);

export const getFlashcards = () => {
  console.log(BASE_URL);
  return get(`${BASE_URL}/api/v1/flashcard`);
};

export const createNewFlashcard = (front, back, code) => {
  const body = { front, back, code };
  return post(`${BASE_URL}/api/v1/flashcard`, body);
};

export const deleteFlashcard = (id) => {
  return _delete(`${BASE_URL}/api/v1/flashcard/${id}`);
};

export const updateFlashcard = (id, front = "", back = "", code = "", reviewedCount = null, tags = null) => {
  const fields = {
    front,
    back,
    code,
    reviewedCount,
    tags,
  };

  // filter out invalid values from fields
  Object.keys(fields).forEach(
    (key) => [undefined, null].includes(fields[key]) && delete fields[key]
  );

  return patch(`${BASE_URL}/api/v1/flashcard/${id}`, fields);
};

export const increment = (id) => {
  return post(`${BASE_URL}/api/v1/flashcard/increment/${id}`);
};

export const moveFlashcardToMemorizedCollection = (id) => {
  return post(`${BASE_URL}/api/v1/flashcard/move/memorized/${id}`);
};

export const moveFlashcardToActiveCollection = (id) => {
  return post(`${BASE_URL}/api/v1/flashcard/move/flashcards/${id}`);
};

export const addTag = (id, tag) => {
  return post(`${BASE_URL}/api/v1/flashcard/addTag/${id}`, { tag });
}

export const removeTag = (id, tag) => {
  return post(`${BASE_URL}/api/v1/flashcard/removeTag/${id}`, { tag });
}
