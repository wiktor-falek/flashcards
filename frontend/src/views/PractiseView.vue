<script setup>
import { remove } from "@vue/shared";
import { onMounted, ref, nextTick } from "vue";
import { getFlashcards, increment } from "../api/flashcardApi";
import Card from "../components/cards/Card.vue";
import { usePractiseStore } from "../stores/practiseStore.js";

const practiseStore = usePractiseStore();

const currentFlashcard = ref();

const nextCard = (removeFlashcard = false) => {
  let flashcard = practiseStore.getNextCard(removeFlashcard);
  currentFlashcard.value = flashcard;
  return flashcard;
};

onMounted(async () => {
  const response = await getFlashcards();

  if (response.status === 401) {
    localStorage.setItem("isAuthenticated", "false");
    authStore.setIsAuthenticated(false);
    return router.push("/signin");
  }

  if (response.status === 200) {
    const result = await response.json();
    const flashcards = result.flashcards;
    practiseStore.flashcards = flashcards;
    practiseStore.setPractiseRotation();
  }
  nextCard();
});

const repeat = () => {
  const id = currentFlashcard.value._id;
  const response = increment(id);

  if (response.status === 200) {
    practiseStore.findById(id).reviewedCount++;
  }

  nextCard();
};

const memorized = () => {
  nextCard(true)
};
</script>

<template>
  <main>
    <router-link to="../" class="button">Go back</router-link>

    <div class="practise">
      <Card :flashcard="currentFlashcard" v-if="currentFlashcard" />
      <div v-else>
        <p>You have no flashcards</p>
      </div>
      <div class="practise__navigation" v-if="currentFlashcard">
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
