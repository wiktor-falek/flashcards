<script setup>
import { onMounted, ref } from "vue";
import { useFlashcardStore } from "../../stores/flashcardStore";
import Card from "./Card.vue";

const props = defineProps(["flashcard"]);

</script>

<template>
  <div class="card-slot">
    <Card v-if="flashcard" :flashcard="flashcard" />
  </div>
</template>

<style scoped></style>
