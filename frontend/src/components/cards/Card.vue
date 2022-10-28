<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

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
        <Icon
          icon="akar-icons:arrow-counter-clockwise"
          width="42"
          height="42"
          color="grey"
        />
      </button>
      <p>Reviewed: {{ flashcard.reviewedCount }}</p>
      <button class="card__button--edit" @click="">
        <Icon
          icon="fluent:calendar-edit-16-regular"
          width="42"
          height="42"
          color="grey"
        />
      </button>
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
        <Icon
          icon="akar-icons:arrow-counter-clockwise"
          width="42"
          height="42"
          color="grey"
        />
      </button>
      <p>Reviewed: {{ flashcard.reviewedCount }}</p>
      <button class="card__button--edit" @click="">
        <Icon
          icon="fluent:calendar-edit-16-regular"
          width="42"
          height="42"
          color="grey"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
@import "../../assets/card.css"
</style>
