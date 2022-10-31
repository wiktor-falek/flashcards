<script setup>
import { ref } from "vue";
import { useFlashcardStore } from "../stores/flashcardStore";
import Card from "./cards/Card.vue";

const flashcardStore = useFlashcardStore
const emits = defineEmits(["closePractise"]);

const flashcard = ref(flashcardStore.getNextCard());

</script>

<template>
  <button class="button" @click="$emit('closePractise')">Go back</button>
  <div class="div" v-if="flashcard">
    <p>cock</p>
    <Card :flashcard="flashcard" />
  </div>
</template>
