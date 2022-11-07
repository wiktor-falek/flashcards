<script setup>
import { Icon } from "@iconify/vue";
import { onMounted, ref } from "vue";
import { deleteFlashcard, updateFlashcard } from "../../api/flashcardApi.js";
import { useFlashcardStore } from "../../stores/flashcardStore";

const isOpen = ref(false);

const flashcardStore = useFlashcardStore();

const props = defineProps(["id", "flashcard", "display"]);

const front = ref("");
const back = ref("");
const code = ref("");

onMounted(() => {
  front.value = props.flashcard.front;
  back.value = props.flashcard.back;
  code.value = props.flashcard.code;
});

const editFlashcard = async () => {
  const f = front.value;
  const b = back.value;
  const c = code.value;

  if (!f && !b && !c) {
    // some kind of visual is needed here to indicate missing fields
    return;
  }
  const response = await updateFlashcard(props.id, f, b, c);

  if (response.status !== 200) {
    // error msg
    return;
  }

  const result = await response.json();
  props.flashcard.value = result; // this doesn't update flashcardStore flashcard

  // TEMPORARY FIX
  // this component ideally should have a ref
  // to flashcard from store at props.id to avoid
  // possible issues like synchronizing data between both
  const idx = flashcardStore.flashcards.findIndex((flashcard) => {
    return flashcard._id === props.id;
  });
  flashcardStore.flashcards[idx] = result;

  emit("closeModal");
};

const removeFlashcard = async () => {
  if (!props.id) {
    return;
  }

  const response = await deleteFlashcard(props.id);

  if (response.status === 200) {
    // const target = flashcardStore.findById(props.id);
    // flashcardStore.deleteFlashcard(props.id);
    flashcardStore.removeFlashcard(props.id);
    emit("closeModal");
  }
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
    <div class="modal" v-if="isOpen" @click.self="isOpen = false">
      <div class="edit-card">
        <div class="edit-card--top">
          <h2>Edit</h2>
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
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.edit-card {
  background-color: rgb(31, 31, 31);
  max-width: 400px;
}
.edit-card--top {
  display: flex;
  justify-content: space-between;
}

textarea {
  font-size: 24px;
  width: 100%;
  color: #ddd;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
