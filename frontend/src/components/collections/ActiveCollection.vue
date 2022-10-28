<script setup>
import { useFlashcardStore } from "../../stores/flashcardStore";
import Card from "../cards/Card.vue";
import CardPreview from "../cards/CardPreview.vue";
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
  grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );
  gap: 10px;
}
</style>
