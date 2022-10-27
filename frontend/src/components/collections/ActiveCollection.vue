<script setup>
import Card from "../cards/Card.vue";
import { useFlashcardStore } from "../../stores/flashcardStore";
const flashcardStore = useFlashcardStore();
</script>

<template>
  <div class="collection collection--active">
    <Card
      v-for="flashcard in flashcardStore.flashcards"
      :flashcard="flashcard"
      :key="flashcard._id"
    />
  </div>
</template>

<style scoped>
.collection {
  display: grid;
}
</style>
