<script setup>
import { ref } from "vue";

const props = defineProps(["flashcard"]);

const isFrontSide = ref(true);
</script>

<template>
  <div class="card" v-if="isFrontSide">
    <div class="card__top">
      <div class="tag">Algorithm</div>
      <div class="tag">Dynamic</div>
    </div>
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
    <div class="card__top">
      <button>Answer</button>
      <button>Code</button>
    </div>
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
  padding: 5px;
  border: 1px solid #4f4f4f;
  background-color: #181818;
  margin: 0px auto;
}

.card__button--flip,
.card__button--edit {
  width: 48px;
  height: 48px;
  font-size: 20px;
}

.card__top {
  display: flex;
  height: 50px;
  width: 100%;
}

.card__top button {
  width: 100%;
  border: none;
  padding: 0;
}

.card__bottom {
  margin-top: auto;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}
</style>
