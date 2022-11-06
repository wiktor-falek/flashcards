<script setup>
import { onMounted, ref } from "vue";
import { deleteFlashcard, updateFlashcard } from "../../api/flashcardApi.js";
import { useFlashcardStore } from "../../stores/flashcardStore";

const flashcardStore = useFlashcardStore();

const props = defineProps(["id", "flashcard", "display"]);

const front = ref("");
const back = ref("");
const code = ref("");

onMounted(() => {
  front.value = props.flashcard.front;
  back.value = props.flashcard.back;
  code.value = props.flashcard.code;
})

const emit = defineEmits(["closeModal"]);

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
  props.flashcard.value = result;

  // update flashcard in store, this component probably should just have,
  // a flashcard ref to the flashcard from store at props.id to avoid 
  // possible issues like synchronizing data between both
  flashcardStore.flashcards[1] = result;

  emit("closeModal");
};

const removeFlashcard = async () => {
  if (!props.id) {
    return;
  }

  const response = await deleteFlashcard(props.id);

  if (response.status === 200) {
    emit("closeModal");
  }
};
</script>

<template>
  <div class="modal" v-show="display" v-if="props.flashcard">
    <h1>Edit</h1>
    <label for="front">Front</label>
    <textarea
      name="front"
      id="front"
      rows="4"
      v-model="front"
    ></textarea>

    <label for="back">Back</label>
    <textarea
      name="back"
      id="back"
      rows="4"
      v-model="back"
    ></textarea>

    <label for="code">Code (optional)</label>
    <textarea
      name="code"
      id="code"
      rows="4"
      v-model="code"
    ></textarea>

    <button class="button" @click="editFlashcard">Update Flashcard</button>
    <button class="button" @click="removeFlashcard">Delete Flashcard</button>
  </div>

  <div class="overlay" v-if="display" @click="$emit('closeModal')"></div>
</template>

<style scoped>
.overlay {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal {
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: center;
  z-index: 101;
  border: 1px solid grey;
  position: absolute;
  --width: 350px;
  width: var(--width);
  left: calc(50% - (var(--width) / 2));
  top: 20%;
  background-color: rgb(20, 20, 20);
}

textarea {
  font-size: 24px;
  width: 100%;
  color: #ddd;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
