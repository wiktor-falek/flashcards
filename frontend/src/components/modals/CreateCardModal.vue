<script setup>
import { ref } from "vue";
import { createNewFlashcard } from "../../api/flashcardApi.js";
import { useFlashcardStore } from "../../stores/flashcardStore";

const isOpen = ref(false);

const flashcardStore = useFlashcardStore();

const front = ref("");
const back = ref("");
const code = ref("");

const createFlashcard = async () => {
  const f = front.value;
  const b = back.value;
  const c = code.value;
  if (!f || !b) {
    // some kind of visual is needed here to indicate missing fields
    return;
  }
  const response = await createNewFlashcard(f, b, c);

  if (!response.status === 200) {
    return;
  }

  const result = await response.json();

  flashcardStore.flashcards.push(result);

  front.value = "";
  back.value = "";
  code.value = "";

  isOpen.value = false;
};
</script>

<template>
  <button class="button" @click="isOpen = true">Create Flashcard</button>

  <Teleport to="body">
    <div class="modal" v-if="isOpen" @click.self="isOpen = false">
      <div class="create-card">
        <div class="create-card--top">
          <h2>Create Card</h2>
          <button @click="isOpen = false">Close</button>
        </div>
        <label for="front">Front</label>
        <textarea name="front" id="front" rows="4" v-model="front"></textarea>

        <label for="back">Back</label>
        <textarea name="back" id="back" rows="4" v-model="back"></textarea>

        <label for="code">Code (optional)</label>
        <textarea name="code" id="code" rows="4" v-model="code"></textarea>

        <button class="button" @click="createFlashcard">
          Create Flashcard
        </button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.create-card {
  background-color: rgb(31, 31, 31);
  max-width: 400px;
}
.create-card--top {
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
