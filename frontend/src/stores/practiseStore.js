import { defineStore } from "pinia";
import { ref } from "vue";

const shuffle = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

export const usePractiseStore = defineStore("practise", () => {
  const flashcards = ref([]);

  const findById = (id) => {
    const flashcard =
      flashcards.value.find((flashcard) => flashcard._id === id) || null;
    return flashcard;
  };

  const practiseRotation = ref([]);

  const setPractiseRotation = () => {
    practiseRotation.value = shuffle(flashcards.value);
  };

  const getNextCard = (deleteFlashcard = false) => {
    const flashcard = practiseRotation.value.shift();
    if (!deleteFlashcard) {
      practiseRotation.value.push(flashcard); // move to the last position
      // this will be a linked list for better performance
    }
    return flashcard;
  };

  return {
    flashcards,
    findById,
    practiseRotation,
    setPractiseRotation,
    getNextCard,
  };
});
