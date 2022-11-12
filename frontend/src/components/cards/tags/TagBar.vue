<script setup>
import AddTagModal from "./AddTagModal.vue";
import Tag from "./Tag.vue";
const props = defineProps(["tags", "id"]);
</script>

<template>
  <div class="tagbar">
    <div class="tags" v-for="tag in tags">
      <Tag :tag="tag" />
    </div>
    <AddTagModal :id="props.id"/>
  </div>
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
