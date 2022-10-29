<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import EditCardModal from "../modals/EditCardModal.vue";

const props = defineProps(["flashcard"]);

const isFrontSide = ref(true);
const isAnswer = ref(true);

const displayEditCardModal = ref(false);

</script>

<template>
  <div class="card" v-if="isFrontSide">
    <div class="card__top">
      <div class="tag">Algorithm</div>
      <div class="tag">Dynamic</div>
    </div>
    <p class="card__content--front" >{{ flashcard.front }}</p>

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
      <button class="card__button--edit" @click="displayEditCardModal = true;">
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
      <button
        :class="{ selected: isAnswer }"
        @click="isAnswer = true"
        tabindex="-1"
      >
        Answer
      </button>
      <button
        :class="{ selected: !isAnswer }"
        @click="isAnswer = false"
        tabindex="-1"
      >
        Code
      </button>
    </div>
    <p class="card__content--back" v-if="isAnswer">{{ flashcard.back }}</p>
    <p class="card__content--code" v-else>{{ flashcard.code }}</p>

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

  <EditCardModal
    :display="displayEditCardModal"
    @closeModal="displayEditCardModal = false"
  />

</template>

<style scoped>
@import "../../assets/card.css";
.selected {
  background-color: rgb(60, 60, 60) !important;
}

.selected:active,
.selected:focus {
  outline: none;
}
</style>
