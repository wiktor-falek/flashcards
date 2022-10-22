<script setup></script>

<template>
  <main>
    <h1>Learn effectively with Flashcards</h1>
    <p class="subheading">
      Improve your study routine and retain information with ease
    </p>

    <a class="button" href="#">Get Started</a>

    <h1>Why use flashcards?</h1>
    <p>
      Flashcards, when used correctly, are a proven method of engaging in active
      recall, which helps with retaining study material.
    </p>

    <p>
      The goal of this app is to simplify the process of
      <a href="https://simple.wikipedia.org/wiki/Spaced_repetition"
        >spaced repetition</a
      >.
    </p>

    <h1>How this works?</h1>

    <p>
      After learning a concept create a flashcard with a question at the front
      and an answer at the back, you also have an option to include a code
      snippet.
    </p>

    <p>
      When a flashcard shows up during your learning session, try to answer the
      question. Check if it matches the answer. Ideally you should aim to repeat
      this process at least three times.
    </p>

    <p>
      If you feel confident about the topic, mark the flashcard as memorized. It
      won't be presented to you anymore, but it still will be available in
      Completed Collection.
    </p>

    <h1>Main Features</h1>
    <ul>
      <li>
        <p>Code snippets with highlighting.</p>
      </li>
      <li>
        <p>Sorting by your custom tags.</p>
      </li>
      <li>
        <p>Lorem ipsum dolor sit amet.</p>
      </li>
    </ul>

    <h1>Open source</h1>
    <p class="subheading">This project is fully open source</p>

    <p>Feel free to contribute to the project or maybe even self host it.</p>

    <p>Click here to visit the Github repository.</p>

    <a class="button" href="https://github.com/wiktor-falek/flashcards"
      >Github</a
    >
  </main>

  <footer>Wiktor Falek - All rights reserved</footer>
</template>

<style scoped>
main {
  padding-bottom: 300px;
}

button,
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 10px;
  height: 55px;
  width: 220px;
  border: 2px solid #d33f64;
  color: #d33f64;
  background: transparent;
  white-space: nowrap;
  transition: all 0.05s linear;
  font-size: 1.2rem;
  font-weight: bold;
}

button:hover,
.button:hover {
  cursor: pointer;
  transform: scale(1.04);
}

button:active,
.button:active {
  transform: scale(1);
}
</style>
