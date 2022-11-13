<script setup>
import { useFlashcardStore } from "../../../stores/flashcardStore";
import RemoveTagModal from "../../modals/RemoveTagModal.vue"

import { ref } from "vue";

const props = defineProps(["tag", "id"]);

const display = ref(true);

</script>
<template>
  <div class="tag" v-if="display">
    <p class="tag__name">{{ props.tag }}</p>
    <RemoveTagModal :id="props.id" :tag="props.tag" />
    <!-- modal -->
  </div>
</template>

<style scoped>
.tag {
  font-size: 20px;
  width: fit-content;
  padding-left: 8px;
  background-color: #414141;
  border-radius: 30px;
  height: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: fit-content;
  height: 32px;
}

.tag__name {
  line-height: 20px;
  padding-top: 2px;
}
</style>
