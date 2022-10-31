import { defineStore } from "pinia";
import { ref } from "vue";

const shuffle = (array) => {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

export const useFlashcardStore = defineStore("flashcards", () => {
  const flashcards = ref([]);
  const practiseRotation = ref([]);

  const setPractiseRotation = (flashcards) => {
    practiseRotation.value = shuffle(flashcards);
  }

  const findById = (id) => {
    const flashcard = flashcards.value.find((flashcard) => flashcard._id === id) || null;
    return flashcard;
  }

  const getNextCard = () => {
    const flashcard = practiseRotation.value.pop();
    return flashcard;
  }

  return {
    flashcards,
    practiseRotation,
    setPractiseRotation,
    findById,
    getNextCard
  };
});
