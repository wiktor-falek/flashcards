<script setup>
import { onMounted } from "vue";
import { getAllFlashcards } from "../../api/flashcardApi";
import { useFlashcardStore } from "../../stores/flashcardStore";
import Card from "../cards/Card.vue";
import CardPreview from "../cards/CardPreview.vue";
const flashcardStore = useFlashcardStore();

const emits = defineEmits(["closeActiveCollection"]);
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
    flashcardStore.flashcards = flashcards;
  }
});
</script>

<template>
  <button class="button" @click="$emit('closeActiveCollection')">
    Go back
  </button>
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px;
}
</style>
