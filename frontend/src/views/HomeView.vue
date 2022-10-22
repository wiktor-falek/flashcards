<script setup></script>

<template>
  <main>
    <h1>Learn effectively with Flashcards</h1>
    <p class="subheading">
      Improve your study routine and retain informations with ease
    </p>


    <button>
      <span> Get Started </span>
    </button>

    <h1>Why use flashcards?</h1>
    <p>
      Flashcards, when used correctly, are a proven method of engaging in active
      recall, which helps with retaining study material.
    </p>

    <p>The goal of this app is to simplify the process...</p>

    <h1>How this works?</h1>

    <p>
      After learning a concept create a flashcard with a question at the front
      and an answer at the back, you also have an option to include a code snippet.
    </p>

    <p>
      When you come back later to revise your flashcards, try to answer the question.
      If you're not 100% sure you know the answer, look at the answer. 
      Ideally you should repeat this process at least three times.
      If you feel confident about the topic, mark the flashcard as memorized.
    </p>

    <p>
      If you fully grasped the concept already, mark it as memorized. It won't
      be presented to you anymore, but it still will be available in Completed
      Collection.
    </p>
  </main>
</template>

<style scoped>
button {
  height: 55px;
  min-width: 220px;
  border: 2px solid #d33f64;
  color: #d33f64;
  background: transparent;
  white-space: nowrap;
  transition: all 0.05s linear;
  font-size: 1.2rem;
  font-weight: bold;
}

button:hover {
  cursor: pointer;
  transform: scale(1.04);
}

button:active {
  transform: scale(1);
}
</style>
