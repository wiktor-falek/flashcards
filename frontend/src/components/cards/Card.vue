<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import EditCardModal from "../modals/EditCardModal.vue";
import TagBar from "./tags/TagBar.vue";

const props = defineProps(["flashcard"]);

const isFrontSide = ref(true);
const isAnswerTab = ref(true);
</script>

<template>
  <!-- front side -->
  <div class="card">
    <div class="card__top" v-if="isFrontSide">
      <TagBar :id="props.flashcard._id" :tags="props.flashcard.tags" />
    </div>

    <div class="card__top" v-else>
      <button
        :class="{ selected: isAnswerTab }"
        @click="isAnswerTab = true"
        tabindex="-1"
      >
        Answer
      </button>
      <button
        :class="{ selected: !isAnswerTab }"
        @click="isAnswerTab = false"
        tabindex="-1"
      >
        Code
      </button>
    </div>

    <p class="card__content--front" v-if="isFrontSide">{{ flashcard.front }}</p>

    <p class="card__content--back" v-if="!isFrontSide && isAnswerTab">
      {{ flashcard.back }}
    </p>
    <p class="card__content--code" v-if="!isFrontSide && !isAnswerTab">
      {{ flashcard.code }}
    </p>

    <div class="card__bottom">
      <button class="card__button--flip" @click="isFrontSide = !isFrontSide">
        <Icon
          icon="akar-icons:arrow-counter-clockwise"
          width="42"
          height="42"
          color="grey"
        />
      </button>
      <p>Reviewed: {{ flashcard.reviewedCount }}</p>

      <EditCardModal :flashcard="props.flashcard" />
    </div>
  </div>
</template>

<style>
@import "../../assets/card.css";
.selected {
  background-color: rgb(60, 60, 60) !important;
}

.card__content--code {
  background-color: rgb(46, 46, 46);
  border-radius: 5px;
  padding: 2px;
}

.selected:active,
.selected:focus {
  outline: none;
}

#id {
  font-size: 17px;
}
</style>
