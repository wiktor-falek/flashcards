<script setup>
import { onBeforeMount } from "vue";
import { useFlashcardStore } from "../../stores/flashcardStore";
import authAndLoadFlashcards from "../../helpers/authAndLoadFlashcards";
import Card from "../cards/Card.vue";

const flashcardStore = useFlashcardStore();

onBeforeMount(() => {
  if (!flashcardStore.hasFetchedFlashcards) {
    authAndLoadFlashcards();
  }
});
</script>

<template>
  <div class="collection collection--active">
    <Card
      v-for="flashcard in flashcardStore.memorizedFlashcards"
      :flashcard="flashcard"
      :key="flashcard._id"
    />
  </div>
</template>

<style scoped>
.collection {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px;
}
</style>
