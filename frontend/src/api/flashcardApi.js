import { get, post, _delete, patch } from "./fetchWrapper";

export const getAllFlashcards = () => {
  return get("http://localhost:3000/api/v1/flashcard");
};

export const createNewFlashcard = (front, back, code) => {
  const body = { front, back, code };
  return post("http://localhost:3000/api/v1/flashcard", body);
};

export const deleteFlashcard = (id) => {
  return _delete(`http://localhost:3000/api/v1/flashcard/${id}`);
};

export const updateFlashcard = (id, fields) => {
  // { front, back, code, reviewedCount, tags,}
  return patch(`http://localhost:3000/api/v1/flashcard/${id}`);
};


