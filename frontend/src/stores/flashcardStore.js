import { defineStore } from "pinia";
import { ref } from "vue";

export const useFlashcardStore = defineStore("flashcards", () => {
  const hasFetchedFlashcards = ref(false);
  const flashcards = ref([]);

  const setFlashcards = (_flashcards) => {
    if (typeof _flashcards !== "array" && typeof _flashcards !== "object") {
      return console.warn(
        `Could not set flashcards, must be an array or a proxy with array as a target.`
      );
    }

    flashcards.value = _flashcards;
  };

  const addFlashcard = (flashcard) => {
    flashcards.value.push(flashcard);
  };

  const removeFlashcard = (id) => {
    for (let i = 0; i < flashcards.value.length; i++) {
      const flashcard = flashcards.value[i];
      if (flashcard._id === id) {
        flashcards.value.splice(i, 1);
      }
    }
  };

  const findById = (id) => {
    const flashcard =
      flashcards.value.find((flashcard) => flashcard._id === id) || null;
    console.log(flashcard);
    return flashcard;
  };

  return {
    hasFetchedFlashcards,
    flashcards,
    setFlashcards,
    addFlashcard,
    removeFlashcard,
    findById,
  };
});
