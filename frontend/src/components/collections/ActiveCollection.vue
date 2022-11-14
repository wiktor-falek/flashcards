<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import { useFlashcardStore } from "../../stores/flashcardStore";
import authAndLoadFlashcards from "../../helpers/authAndLoadFlashcards";
import Card from "../cards/Card.vue";
import CardSlot from "../cards/CardSlot.vue";

const flashcardStore = useFlashcardStore();

const gridElement = ref();

const columns = ref();
const rows = ref();

window.addEventListener("resize", () => {
  if (!gridElement.value) {
    return;
  }
  const { width, height } = gridElement.value.getBoundingClientRect();
  columns.value = Math.floor(width / (270));
  rows.value = Math.floor(height / 440);
});

onBeforeMount(() => {
  if (!flashcardStore.hasFetchedFlashcards) {
    authAndLoadFlashcards();
  }
});

onMounted(() => {
  const { width, height } = gridElement.value.getBoundingClientRect();
  columns.value = Math.floor(width / (270));
  rows.value = Math.floor(height / 440);
});
</script>

<template>
  <!-- <div v-if="gridElement">
    <p>{{ columns }}, {{ rows }}</p>
  </div> -->

  <div ref="gridElement" class="collection">
    <CardSlot v-if="columns && rows" v-for="index in columns * rows" />
    <!-- <Card
      v-for="flashcard in flashcardStore.flashcards"
      :flashcard="flashcard"
      :key="flashcard._id"
      :id="flashcard._id"
    /> -->
  </div>
</template>

<style>
#app {
  height: 100vh;
}
</style>

<style scoped>
.collection {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: flex-start;
}
</style>
