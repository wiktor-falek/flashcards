import { defineStore } from "pinia";
import { ref } from "vue";

export const useFlashcardStore = defineStore("flashcards", () => {
  const flashcards = ref([]);

  const findById = (id) => {
    const flashcard = flashcards.value.find((flashcard) => flashcard._id === id) || null;
    return flashcard;
  }

  return {
    flashcards,
    findById,
  };
});
