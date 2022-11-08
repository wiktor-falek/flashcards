import { get, post, _delete, patch } from "./fetchWrapper";

export const getFlashcards = () => {
  return get("http://localhost:3000/api/v1/flashcard");
};

export const createNewFlashcard = (front, back, code) => {
  const body = { front, back, code };
  return post("http://localhost:3000/api/v1/flashcard", body);
};

export const deleteFlashcard = (id) => {
  return _delete(`http://localhost:3000/api/v1/flashcard/${id}`);
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

  return patch(`http://localhost:3000/api/v1/flashcard/${id}`, fields);
};

export const increment = (id) => {
  return post(`http://localhost:3000/api/v1/flashcard/increment/${id}`);
};

export const moveFlashcardToMemorizedCollection = (id) => {
  return post(`http://localhost:3000/api/v1/flashcard/move/memorized/${id}`);
};

export const moveFlashcardToActiveCollection = (id) => {
  return post(`http://localhost:3000/api/v1/flashcard/move/flashcards/${id}`);
};
