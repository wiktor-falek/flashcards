<script setup>
import { ref } from "vue";
import { deleteFlashcard, updateFlashcard } from "../../api/flashcardApi.js";
import { useFlashcardStore } from "../../stores/flashcardStore";

const flashcardStore = useFlashcardStore();

const props = defineProps(["display", "id"]);
const emit = defineEmits(["closeModal"]);

const flashcard = ref(flashcardStore.findById(props.id));

const front = ref(flashcard.value.front);
const back = ref(flashcard.value.back);
const code = ref(flashcard.value.code);

const editFlashcard = async () => {
  const f = front.value || null;
  const b = back.value || null;
  const c = code.value || null;
  console.log(f, b, c);
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
  flashcard.value = result;

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
  <div class="modal" v-show="display">
    <h1>Edit</h1>
    <p>Id: {{ props.id }}</p>
    <label for="front">Front</label>
    <textarea name="front" id="front" rows="4" v-model="front"></textarea>

    <label for="back">Back</label>
    <textarea name="back" id="back" rows="4" v-model="back"></textarea>

    <label for="code">Code (optional)</label>
    <textarea name="code" id="code" rows="4" v-model="code"></textarea>

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
