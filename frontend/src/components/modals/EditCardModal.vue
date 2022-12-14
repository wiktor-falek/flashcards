<script setup>
import { Icon } from "@iconify/vue";
import { ref, watch } from "vue";
import {
  deleteFlashcard,
  moveFlashcardToActiveCollection,
  moveFlashcardToMemorizedCollection,
  updateFlashcard,
} from "../../api/flashcardApi.js";
import { useFlashcardStore } from "../../stores/flashcardStore";

const isOpen = ref(false);

const flashcardStore = useFlashcardStore();

const props = defineProps(["flashcard"]);

const front = ref(props.flashcard.front || "");
const back = ref(props.flashcard.back || "");
const code = ref(props.flashcard.code || "");

watch(props, () => {
  // update when prop changes, otherwise front, back and code
  // will contain data from previous flashcard prop
  front.value = props.flashcard.front;
  back.value = props.flashcard.back;
  code.value = props.flashcard.code;
});

const editFlashcard = async () => {
  const id = props.flashcard._id;
  const f = front.value || "";
  const b = back.value || "";
  const c = code.value || "";

  const response = await updateFlashcard(id, f, b, c);

  if (response.status !== 200) {
    // error msg
    return;
  }

  const result = await response.json();
  props.flashcard.value = result; // this doesn't update flashcardStore flashcard

  // TEMPORARY FIX
  // this component ideally should have a ref
  // to flashcard from store at id to avoid
  // issues like synchronizing data between both
  const idx = flashcardStore.flashcards.findIndex((flashcard) => {
    return flashcard._id === id;
  });
  flashcardStore.flashcards[idx] = result;
  isOpen.value = false;
};

const removeFlashcard = async () => {
  const id = props.flashcard._id;
  if (!id) {
    return;
  }

  const response = await deleteFlashcard(id);

  if (response.status === 200) {
    flashcardStore.removeFlashcard(id);
  }
  isOpen.value = false;
};

const toggleReviewedState = async () => {
  const id = props.flashcard._id;
  console.log(id);
  const isMemorized = props.flashcard.reviewedCount === -1;

  // this could be much cleaner
  if (isMemorized) {
    let response = await moveFlashcardToActiveCollection(id);
    if (response.status !== 200) {
      //error
      return;
    }
    // memorized -> flashcards
    const idx = flashcardStore.findMemorizedIndexById(id);
    const flashcard = flashcardStore.memorizedFlashcards[idx];
    flashcardStore.memorizedFlashcards.splice(idx, 1);
    flashcard.reviewedCount = -1;
    flashcardStore.flashcards.push(flashcard);

  } else {
    let response = await moveFlashcardToMemorizedCollection(id);

    if (response.status !== 200) {
      //error
      return;
    }
    // flashcards -> memorized
    const idx = flashcardStore.findIndexById(id);
    const flashcard = flashcardStore.flashcards[idx];
    flashcardStore.flashcards.splice(idx, 1);
    flashcard.reviewedCount = -1;
    flashcardStore.memorizedFlashcards.push(flashcard);
  }
  isOpen.value = false;
};
</script>

<template>
  <button class="card__button--edit" @click="isOpen = true">
    <Icon
      icon="fluent:calendar-edit-16-regular"
      width="42"
      height="42"
      color="grey"
    />
  </button>

  <Teleport to="body" v-if="isOpen">
    <div class="modal" @click.self="isOpen = false">
      <div class="modal__container">
        <div class="modal__container__top">
          <h2>Edit</h2>
          <p>{{ props.flashcard._id }}</p>
          <button @click="isOpen = false">Close</button>
        </div>
        <label for="front">Front</label>
        <textarea name="front" id="front" rows="4" v-model="front"></textarea>

        <label for="back">Back</label>
        <textarea name="back" id="back" rows="4" v-model="back"></textarea>

        <label for="code">Code (optional)</label>
        <textarea name="code" id="code" rows="4" v-model="code"></textarea>

        <button class="button" @click="editFlashcard">Update Flashcard</button>
        <button class="button" @click="removeFlashcard">
          Delete Flashcard
        </button>
        <button class="button" @click="toggleReviewedState">
          {{
            props.flashcard.reviewedCount === -1
              ? "Set as active"
              : "Set as memorized"
          }}
        </button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
@import url("../../assets/modal.css");

textarea {
  font-size: 24px;
  width: 100%;
  color: #ddd;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
