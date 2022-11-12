<script setup>
const props = defineProps(["tag"]);
</script>
<template>
  <div class="tag">
    <p class="tag__name">{{props.tag}}</p>
    <button class="tag__delete"></button>
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
