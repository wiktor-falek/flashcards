<script setup>
import { defineProps, ref } from "vue";
// const props = defineProps(["front, back, code, reviewedCount, id"]);
const props = defineProps(["flashcard"]);


const isFrontSide = ref(true);
</script>

<template>
  <div class="card" v-if="isFrontSide">
    <h1>Front</h1>
    <p>{{flashcard.front}}</p>
    <button class="card__button--flip" @click="isFrontSide = false">Flip</button>
  </div>

  <div class="card" v-if="!isFrontSide">
    <h1>Back</h1>
    <p>{{flashcard.back}}</p>
    <button class="card__button--flip" @click="isFrontSide = true">Flip</button>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 250px;
  aspect-ratio: 6/9;
  border: 2px solid orange;
  background-color: rgb(40, 40, 40);
  margin: 0px auto;
}

.card__button--flip {
  width: 48px;
  height: 48px;
  font-size: 20px;
}
</style>
