<script setup>
import { useFlashcardStore } from "../../../stores/flashcardStore";
import { removeTag } from "../../../api/flashcardApi";
import { ref } from "vue";

const props = defineProps(["tag", "id"]);

const display = ref(true);

const flashcardStore = useFlashcardStore();

const flashcard = ref(flashcardStore.findById(props.id));

const withdrawTag = async () => {
  console.log("removing tag", props.tag);
  const response = await removeTag(props.id, props.tag);
  console.log(response);
  if (response.status === 200) {
    const tags = ref(flashcard.value.tags);
    tags.value = tags.value.filter((item) => item !== props.tag.value);
    flashcard.value.tags = tags;
    display.value = false;
  }
  // error
};
</script>
<template>
  <div class="tag" v-if="display">
    <p class="tag__name">{{ props.tag }}</p>
    <button class="tag__delete" @click="withdrawTag()"></button>
  </div>
</template>

<style scoped>
.tag {
  font-size: 20px;
  width: fit-content;
  padding: 2px 10px;
  background-color: #414141;
  border-radius: 30px;
  height: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: fit-content;
}

.tag__name {
  line-height: 20px;
}

.tag__delete {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
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
