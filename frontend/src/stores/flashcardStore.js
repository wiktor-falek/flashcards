import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useFlashcardStore = defineStore("flashcards", () => {
  const flashcards = ref([]);

  return {
    flashcards,
  };
});
