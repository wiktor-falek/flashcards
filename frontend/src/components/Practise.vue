<script setup>
import { ref } from "vue";
import { useFlashcardStore } from "../stores/flashcardStore";
import Card from "./cards/Card.vue";

const flashcardStore = useFlashcardStore

const flashcard = ref(flashcardStore.getNextCard());

</script>

<template>
  <button class="button">Go back</button>
  <div class="div" v-if="flashcard">
    <Card :flashcard="flashcard" />
  </div>
</template>
