<script setup>
import { defineProps, ref } from "vue";
// const props = defineProps(["front, back, code, reviewedCount, id"]);
const props = defineProps(["flashcard"]);


const isFrontSide = ref(true);
</script>

<template>
  <div class="card">
    <h1>Front</h1>
    <p>{{flashcard.front}}</p>
  </div>
  
  <div class="card" v-if="!isFrontSide">
    <h1>Back</h1>
    <p>{{flashcard.back}}</p>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  max-width: 250px;
  aspect-ratio: 6/9;
  border: 2px solid orange;
  background-color: rgb(40, 40, 40);
}
</style>
