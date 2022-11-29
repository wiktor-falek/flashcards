import { defineStore } from "pinia";
import { ref } from "vue";

export const useFlashcardStore = defineStore("flashcards", () => {
  const flashcards = ref([]);
  const hasFetchedData = ref(false);

  const setFlashcards = (_flashcards) => {
    flashcards.value = _flashcards;
  };

  const findById = (id) => {
    const flashcard =
      flashcards.value.find((flashcard) => flashcard._id === id) || null;
    return flashcard;
  };

  const getIndexById = (id) => {
    for (let i = 0; i < flashcards.value.length; i++) {
      const flashcard = flashcards.value[i];
      if (flashcard._id === id) {
        return i;
      }
    }
    return -1;
  };

  const removeFlashcardById = (id) => {
    for (let i = 0; i < flashcards.value.length; i++) {
      const flashcard = flashcards.value[i];
      if (flashcard._id === id) {
        flashcards.value.splice(i, 1);
        return flashcard;
      }
    }
    return null;
  };

  const setHasFetchedData = (bool) => {
    hasFetchedData.value = !!bool;
  }

  return {
    flashcards,
    hasFetchedData,
    setFlashcards,
    findById,
    getIndexById,
    removeFlashcardById,
    setHasFetchedData
  };
});
