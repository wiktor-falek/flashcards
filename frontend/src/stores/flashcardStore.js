import { defineStore } from "pinia";
import { ref } from "vue";

export const useFlashcardStore = defineStore("flashcards", () => {
  const flashcards = ref([]);

  // sorted flashcards ready to be displayed in practise mode
  const practiseRotation = ref([]);

  const findById = (id) => {
    const flashcard =
      flashcards.value.find((flashcard) => flashcard._id === id) || null;
    return flashcard;
  };

  const _setPractiseRotation = () => {
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    };
    practiseRotation.value = shuffleArray(flashcards.value);
  };

  const getNextCard = () => {
    if (practiseRotation.value.length === 0) {
      _setPractiseRotation();
    }
    return practiseRotation.value.pop();
  };

  return {
    flashcards,
    findById,
    getNextCard,
  };
});
