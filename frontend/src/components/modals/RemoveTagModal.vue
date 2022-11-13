<script setup>
import { ref } from "vue";
import { removeTag } from "../../api/flashcardApi";
import { useFlashcardStore } from "../../stores/flashcardStore";

const flashcardStore = useFlashcardStore();
const flashcard = ref(flashcardStore.findById(props.id));

const props = defineProps(["id", "tag"]);
const isOpen = ref(false);

const withdrawTag = async () => {
  const response = await removeTag(props.id, props.tag);
  if (response.status === 200) {
    flashcard.value.tags = flashcard.value.tags.filter(
      (tag) => tag !== props.tag
    );
    isOpen.value = false;
  }
  // error
};
</script>

<template>
  <button class="tag__delete" @click="isOpen = true"></button>

  <Teleport to="body" v-if="isOpen">
    <div class="modal" @click.self="isOpen = false">
      <div class="modal__container">
        <div class="modal__container__top">
          <h2>Remove tag?</h2>
          <button @click="isOpen = false">Close</button>
        </div>
        <h2>'{{ props.tag }}'</h2>
        <button class="button" @click="withdrawTag()">Remove</button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
@import url("../../assets/modal.css");

.tag__delete {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  aspect-ratio: 1/1;
  border: none;
  border-radius: 50%;
}

.tag__delete::before {
  position: relative;
  bottom: 1px;
  content: "\00d7";
  font-size: 24px;
}

.tag__delete:hover {
  background-color: #696969;
  cursor: default;
}
</style>
