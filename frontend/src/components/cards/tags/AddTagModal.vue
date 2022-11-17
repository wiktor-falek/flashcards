<script setup>
import { ref } from 'vue';
import { useFlashcardStore } from '../../../stores/flashcardStore';
import { addTag } from "../../../api/flashcardApi.js";

const isOpen = ref(false);
const props = defineProps(["id"]);

const flashcardStore = useFlashcardStore();
const flashcard = ref(flashcardStore.findById(props.id));

const tag = ref();

const submitTag = async () => {
  if (!tag.value) {
    return;
    // error
  }
  const response = await addTag(props.id, tag.value);
  if (response.status === 200) {
    // create tags array if it doesn't exist
    if (!flashcard.value.tags) {
      flashcard.value.tags = [];
    }
    flashcard.value.tags.push(tag.value);
    isOpen.value = false;
  }
}
</script>

<template>
  <button class="tagbar__add" @click="isOpen = true"></button>

  <Teleport to="body" v-if="isOpen">
    <div class="modal" @click.self="isOpen = false">
      <div class="modal__container">
        <h1>Add new tag</h1>
        <p>ID {{props.id}}</p>
        <input v-model="tag" type="text" autofocus minlength="1" maxlength="32">
        <button @click="submitTag()">Add</button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>

@import url("../../../assets/modal.css");

.tagbar__add {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 32px;
  aspect-ratio: 1/1;
  border: none;
  background-color: #1f1f1f;
  border-radius: 50%;
}

.tagbar__add::before {
  position: relative;
  bottom: 1px;
  content: "\002b";
  font-size: 24px;
}

.tagbar__add:hover {
  background-color: #696969;
  cursor: default;
}
</style>
