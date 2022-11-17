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
    return flashcard;
  };

  const findIndexById = (id) => {
    // const idx = flashcards.value.findIndex((flashcard) => { flashcard._id === id });
    for (let i = 0; i < flashcards.value.length; i++) {
      const flashcard = flashcards.value[i];
      if (flashcard._id === id) {
        return i;
      }
      
    }
    return -1;
    // return idx;
  }

  return {
    hasFetchedFlashcards,
    flashcards,
    setFlashcards,
    addFlashcard,
    removeFlashcard,
    findById,
    findIndexById,

    memorizedFlashcards,
    setMemorizedFlashcards,
  };
});
