<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps(["flashcard"]);
</script>

<template>
  <div class="card">
    <div class="card__top">
      <div class="tag">Algorithm</div>
      <div class="tag">Dynamic</div>
    </div>
    <h1>{{ flashcard.front }}</h1>
  </div>
</template>

<style scoped>
@import "../../assets/card.css";
</style>
