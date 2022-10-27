import { defineStore } from "pinia";
import { ref } from "vue";

export const useFlashcardStore = defineStore("flashcards", () => {
  const flashcards = ref([]);

  return {
    flashcards,
  };
});
