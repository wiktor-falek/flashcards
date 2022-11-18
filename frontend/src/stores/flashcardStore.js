import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useFlashcardStore = defineStore("flashcards", () => {
  const hasFetchedFlashcards = ref(false);
  const flashcards = ref([]);
  const memorizedFlashcards = ref([]);

  const setFlashcards = (_flashcards) => {
    flashcards.value = _flashcards;
  };

  const setMemorizedFlashcards = (_flashcards) => {
    memorizedFlashcards.value = _flashcards;
  };

  const removeFlashcard = (id) => {
    for (let i = 0; i < flashcards.value.length; i++) {
      const flashcard = flashcards.value[i];
      if (flashcard._id === id) {
        flashcards.value.splice(i, 1);
      }
    }
  };

  // searches both arrays and returns a flashcard
  const findById = (id) => {
    const flashcard =
      [...flashcards.value, ...memorizedFlashcards.value].find(
        (flashcard) => flashcard._id === id
      ) || null;
    return flashcard;
  };

  const findIndexById = (id) => {
    for (let i = 0; i < flashcards.value.length; i++) {
      const flashcard = flashcards.value[i];
      if (flashcard._id === id) {
        return i;
      }
    }
    return -1;
  };

  const findMemorizedIndexById = (id) => {
    for (let i = 0; i < memorizedFlashcards.value.length; i++) {
      const flashcard = memorizedFlashcards.value[i];
      if (flashcard._id === id) {
        return i;
      }
    }
    return -1;
  };

  return {
    // flashcards array
    flashcards,
    setFlashcards,
    removeFlashcard,
    findIndexById,

    // memorizedFlashcards array
    memorizedFlashcards,
    setMemorizedFlashcards,
    findMemorizedIndexById,

    // works on both
    findById,
    
    // other
    hasFetchedFlashcards,
  };
});
