<script setup>
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import { useFlashcardStore } from "../../stores/flashcardStore";
import authAndLoadFlashcards from "../../helpers/authAndLoadFlashcards";
import CardSlot from "../cards/CardSlot.vue";
import { computed } from "@vue/reactivity";

const flashcardStore = useFlashcardStore();

const gridElement = ref();

const skipUnwrap = { el: ref([]) }; // for convenience
const paginationItems = computed(() => skipUnwrap.el.value);

const columns = ref();
const rows = ref();

const totalFlashcards = computed(() => flashcardStore.flashcards.length);
const maxFlashcardsPerPage = computed(() => columns.value * rows.value);

const totalPages = computed(() => {
  const total = Math.ceil(totalFlashcards.value / maxFlashcardsPerPage.value);
  
  // make sure currentPage is not bigger than the amount of pages
  if (total !== NaN && currentPage.value >= totalPages.value) {
    currentPage.value = total;
  }
  return total;
});
const currentPage = ref(1);

function handlePaginationButton(event, index) {
  console.log(event.target, index);
  currentPage.value = index;
}

function decrementPage() {
  if (currentPage.value <= 1) {
    // disable decrement button
    return;
  }
  currentPage.value--;
}

function incrementPage() {
  if (currentPage.value >= totalPages.value) {
    // disable increment button
    return;
  }
  currentPage.value++;
}

window.addEventListener("resize", () => {
  if (!gridElement.value) {
    return;
  }
  const { width, height } = gridElement.value.getBoundingClientRect();
  columns.value = Math.floor(width / 260);
  rows.value = Math.floor(height / 370);

  // console.log(currentPage.value, totalPages.value);

});

onBeforeMount(() => {
  if (!flashcardStore.hasFetchedFlashcards) {
    authAndLoadFlashcards();
  }
});

onMounted(() => {
  const { width, height } = gridElement.value.getBoundingClientRect();
  columns.value = Math.floor(width / 260);
  rows.value = Math.floor(height / 370);
});
</script>
<template>
  <div ref="gridElement" class="collection">
    <CardSlot
      class="card-slot"
      v-if="maxFlashcardsPerPage"
      v-for="i in maxFlashcardsPerPage"
      :flashcard="
        flashcardStore.flashcards[
          i - 1 + maxFlashcardsPerPage * (currentPage - 1)
        ]
      "
    />
  </div>

  <div class="pagination" v-if="totalPages && totalPages > 1">
    <button @click="decrementPage()">&lt;</button>
    <ul v-for="index in totalPages">
      <li>
        <!-- <button :key="index" :ref="skipUnwrap.el" @click="handlePaginationButton($event)">{{ index }}</button> -->
        <button
          :key="index"
          :ref="skipUnwrap.el"
          @click="handlePaginationButton($event, index)"
        >
          {{ index }}
        </button>
      </li>
    </ul>
    <button @click="incrementPage()">&gt;</button>
  </div>
</template>

<style scoped>
.card-slot {
  width: 260px;
  height: 370px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.collection {
  height: 100%;
  max-height: 810px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-evenly;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination ul,
li {
  all: unset;
}

.pagination button {
  width: 32px;
  height: 32px;
}
</style>
