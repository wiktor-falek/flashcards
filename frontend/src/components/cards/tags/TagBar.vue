<script setup>
import AddTagModal from "./AddTagModal.vue";
import Tag from "./Tag.vue";
const props = defineProps(["tags", "id"]);
</script>

<template>
  <div class="tagbar">
    <div class="tags" v-for="tag in tags">
      <Tag :tag="tag" :id="props.id" />
    </div>
    <AddTagModal :id="props.id" />
  </div>
</template>

<style scoped>
.tagbar {
  display: flex;
  align-items: center;
  justify-content: start;
  overflow-x: scroll;
  width: 100%;
  height: fit-content;
  padding-bottom: 8px;
}

.tags {
  margin-right: 5px;
}
</style>
