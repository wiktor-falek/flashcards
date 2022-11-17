<script setup>
import { onMounted, ref, onBeforeMount } from "vue";
import { increment, moveFlashcardToMemorizedCollection } from "../api/flashcardApi";
import Card from "../components/cards/Card.vue";
import { useFlashcardStore } from "../stores/flashcardStore";
import authAndLoadFlashcards from "../helpers/authAndLoadFlashcards";
const flashcardStore = useFlashcardStore();

onBeforeMount(async () => {
  if (!flashcardStore.hasFetchedFlashcards) {
    await authAndLoadFlashcards();
  }
  setPractiseRotation();
  nextCard();
});

const practiseRotation = ref([]);
const currentFlashcard = ref();

const setPractiseRotation = () => {
  const shuffle = (array) => {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };
  practiseRotation.value = shuffle(flashcardStore.flashcards);
};

const removeCurrentCard = () => {
  const removedFlashcard = practiseRotation.value.pop();
  return removedFlashcard;
};

const nextCard = () => {
  const flashcard = practiseRotation.value.shift();
  practiseRotation.value.push(flashcard);

  currentFlashcard.value = flashcard;
  return flashcard;
};

const repeat = async () => {
  const id = currentFlashcard.value._id;
  const response = await increment(id);

  if (response.status === 200) {
    flashcardStore.findById(id).reviewedCount++;
  }
  nextCard();
};

const memorized = async () => {
  const id = currentFlashcard.value._id;
  const response = await moveFlashcardToMemorizedCollection(id);
  if (response.status !== 200) {
    console.log("error");
    return;
  }

  // move flashcard in flashcardStore from flashcards array to memorizedFlashcards array
  const idx = flashcardStore.findIndexById(id);
  if (idx === -1) {
    console.log("What? How?");
    return;
  }
  const flashcard = flashcardStore.flashcards.splice(idx, 1)[0];
  flashcard.reviewedCount = -1;
  flashcardStore.memorizedFlashcards.push(flashcard);

  removeCurrentCard();
  nextCard();
};
</script>

<template>
  <main>
    <router-link to="../" class="button">Go back</router-link>

    <div class="practise" v-if="currentFlashcard">
      <Card :flashcard="currentFlashcard" />
      <div class="practise__navigation">
        <button class="button" @click="repeat()">Repeat</button>
        <button class="button" @click="memorized()">Memorized</button>
      </div>
    </div>
    <div class="practise" v-else>
      <p>You have no flashcards</p>
    </div>
  </main>
</template>

<style scoped>
.practise {
  width: fit-content;
  margin: 0 auto;
}

.practise__navigation {
  display: flex;
  padding-top: 20px;
}

.practise__navigation > button {
  width: 50%;
  font-size: 1rem;
}
</style>
