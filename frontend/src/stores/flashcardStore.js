import { defineStore } from "pinia";
import { ref } from "vue";

const shuffle = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

export const useFlashcardStore = defineStore("flashcards", () => {
  const flashcards = ref([]);

  const findById = (id) => {
    const flashcard =
      flashcards.value.find((flashcard) => flashcard._id === id) || null;
    return flashcard;
  };

  return {
    flashcards,
    findById,
  };
});
