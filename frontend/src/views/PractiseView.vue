<script setup>
import { onMounted, ref } from "vue";
import { getAllFlashcards, increment } from "../api/flashcardApi";
import Card from "../components/cards/Card.vue";
import { useFlashcardStore } from "../stores/flashcardStore";

const flashcardStore = useFlashcardStore();

const currentFlashcard = ref();

const nextCard = async () => {
  let nextFlashcard = await flashcardStore.getNextCard();
  if (nextFlashcard === undefined) {
    flashcardStore.setPractiseRotation();
    nextFlashcard = await flashcardStore.getNextCard();
  }
  currentFlashcard.value = nextFlashcard;
  return nextFlashcard;
};

onMounted(async () => {
  const response = await getAllFlashcards();

  if (response.status === 401) {
    localStorage.setItem("isAuthenticated", "false");
    authStore.setIsAuthenticated(false);
    return router.push("/signin");
  }

  if (response.status === 200) {
    const result = await response.json();
    const flashcards = result.flashcards;
    flashcardStore.setPractiseRotation(flashcards);
  }
  nextCard();
});

const repeat = async () => {
  const flashcard = await nextCard();
  const id = flashcard._id;

  const response = await increment(id);

  const result = await response.json();
  console.log(result);
};

const memorized = async () => {
  const flashcard = await nextCard();
};
</script>

<template>
  <main>
    <router-link to="../" class="button">Go back</router-link>

    <div class="practise">
      <Card :flashcard="currentFlashcard" v-if="currentFlashcard" />
      <div class="practise__navigation">
        <button class="button" @click="repeat()">Repeat</button>
        <button class="button" @click="memorized()">Memorized</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.practise {
  width: fit-content;
  margin: 0 auto;
}

.practise__navigation {
  display: flex;
  padding-top: 20px;
}

.practise__navigation > button {
  width: 50%;
  font-size: 1rem;
}
</style>
