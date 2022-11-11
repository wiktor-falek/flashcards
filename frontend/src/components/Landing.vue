<script setup>
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import Logo from "../components/Logo.vue";

const sections = ref();
onMounted(() => {
  const observer = new IntersectionObserver((sections) => {
    for (const entry of sections) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    }
  });

  sections.value.forEach((section) => {
    observer.observe(section);
  });
});
</script>

<template>
  <header>
    <Logo />
  </header>

  <main v-for="_ in 1">
    <section ref="sections">
      <h1>Learn effectively with Flashcards</h1>
      <p class="subheading">
        Improve your study routine and retain information with ease
      </p>

      <RouterLink class="button" to="/signin">Get Started</RouterLink>
    </section>

    <section ref="sections">
      <h1>Why use flashcards?</h1>
      <p>
        Flashcards, when used correctly, are a proven method of engaging in
        active recall, which helps you retain your study material for longer.
      </p>

      <p>
        The goal of this app is to simplify the process of
        <a href="https://simple.wikipedia.org/wiki/Spaced_repetition"
          >spaced repetition</a
        >.
      </p>
    </section>

    <section ref="sections">
      <h1>How it works</h1>

      <p>
        After learning a concept create a flashcard with a question at the front
        and an answer at the back, you can also include a code snippet.
      </p>

      <p>
        When a flashcard shows up during your practise session, try to answer
        the question. Check if it matches the answer on the back side. Ideally
        you should aim to repeat this process at least three times.
      </p>

      <p>
        If you feel confident about the topic, mark the flashcard as memorized.
        It won't be presented to you anymore during practise, but it still will
        be available in seperate collection.
      </p>
    </section>

    <section ref="sections">
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
    </section>

    <section ref="sections">
      <h1>Open source</h1>
      <p class="subheading">This project is fully open source</p>

      <p>
        Feel free to contribute to the project, fork it or maybe even self host
        it.
      </p>

      <a class="button" href="https://github.com/wiktor-falek/flashcards" target="_blank"
        >Github</a
      >
    </section>
  </main>

  <footer>Wiktor Falek - All rights reserved</footer>
</template>

<style scoped>
main,
header {
  max-width: 800px;
  padding: 0px 20px;
  margin-left: auto;
  margin-right: auto;
}

header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
}

header > * {
  margin: 0;
}

.subheading {
  font-size: 1.1rem;
  color: var(--font-color-dark);
  margin-top: -10px;
  margin-bottom: 30px;
}

a:not(.button) {
  color: var(--link-color);
}

section {
  margin-bottom: 60px;
}

footer {
  margin-top: 200px;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.subheading {
  color: #e44f71;
}

p {
  margin-bottom: 1em;
}

h1,
.subheading {
  max-width: 800px;
}

h1 {
  font-size: 1.6rem;
  line-height: 1.3em;
  word-spacing: -3px;
  color: #ff7896;
  margin-top: 30px;
  margin-bottom: 15px;
}

@media screen and (min-width: 601px) {
  body {
    line-height: 1.6;
  }

  p {
    font-size: 1.2rem;
  }
  h1 {
    font-size: 2.2rem;
  }
  .subheading {
    font-size: 1.6rem;
    word-wrap: break-word;
  }

  .padding-top {
    padding-top: 60px;
  }
}

section {
  opacity: 0;
  transition: all 1s;
}

.show {
  opacity: 1;
}

@media (prefers-reduced-motion) {
  section {
    transition: none;
  }
}
</style>
