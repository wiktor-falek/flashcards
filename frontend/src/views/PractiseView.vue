<script setup>
import { onMounted, ref } from "vue";
import { getAllFlashcards } from "../api/flashcardApi";
import Card from "../components/cards/Card.vue";
import { useFlashcardStore } from "../stores/flashcardStore";

const flashcardStore = useFlashcardStore();

const currentFlashcard = ref();

// temporary solution until i figure out global storage,
// then request only if data not found (accessing /practise route without loading main)
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
  const nextFlashcard = flashcardStore.getNextCard();
  console.log("chuj kurwa", nextFlashcard);
  currentFlashcard.value = nextFlashcard;
});
</script>

<template>
  <router-link to="../" class="button">Go back</router-link>
  <div class="div" v-if="true">
    <p>Practise</p>
    <Card :flashcard="currentFlashcard" v-if="currentFlashcard" />
  </div>
</template>
