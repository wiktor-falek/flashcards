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

  const getNextCard = () => {
    const flashcard = practiseRotation.value.shift();
    practiseRotation.value.push(flashcard); // move to the last position
    return flashcard;
  };

  const removeCurrentCard = () => {
    const removedFlashcard = practiseRotation.value.pop();
    return removedFlashcard;
  };

  return {
    flashcards,
    findById,
    practiseRotation,
    setPractiseRotation,
    getNextCard,
    removeCurrentCard
  };
});
