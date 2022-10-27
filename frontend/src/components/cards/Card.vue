<script setup>
import { defineProps, ref } from "vue";
// const props = defineProps(["front, back, code, reviewedCount, id"]);
const props = defineProps(["flashcard"]);

const isFrontSide = ref(true);
</script>

<template>
  <div class="card" v-if="isFrontSide">
    <h1>Front</h1>
    <p>{{ flashcard.front }}</p>

    <div class="card__bottom">
      <button class="card__button--flip" @click="isFrontSide = false">
        Flip
      </button>
      <p>Reviewed: {{ flashcard.reviewedCount }}</p>
      <button class="card__button--edit" @click="">Edit</button>
    </div>
  </div>

  <div class="card" v-if="!isFrontSide">
    <h1>Back</h1>
    <p>{{ flashcard.back }}</p>

    <div class="card__bottom">
      <button class="card__button--flip" @click="isFrontSide = true">
        Flip
      </button>
      <p>Reviewed: {{ flashcard.reviewedCount }}</p>
      <button class="card__button--edit" @click="">Edit</button>
    </div>
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

.card__button--flip,
.card__button--edit {
  width: 48px;
  height: 48px;
  font-size: 20px;
}

.card__bottom {
  margin-top: auto;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}
</style>
