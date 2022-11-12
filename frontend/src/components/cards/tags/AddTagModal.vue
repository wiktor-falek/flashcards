<script setup>
import { ref } from 'vue';
import { useFlashcardStore } from '../../../stores/flashcardStore';

const isOpen = ref(false);
const props = defineProps(["id"]);

const flashcardStore = useFlashcardStore();
</script>

<template>
  <button class="tagbar__add" @click="isOpen = true"></button>

  <Teleport to="body" v-if="isOpen">
    <div class="modal" v-if="isOpen" @click.self="isOpen = false">
        <h1>Add new tag</h1>
    </div>
  </Teleport>
</template>

<style scoped>
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
