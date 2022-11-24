<script setup>
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import Logo from "../components/Logo.vue";

const articleElement = ref();
onMounted(() => {
  const allChildren = [...articleElement.value.childNodes];
  const allSectionElements = allChildren.filter(
    (el) => el.tagName.toLowerCase() === "section"
  );
  const observer = new IntersectionObserver((allSectionElements) => {
    for (const entry of allSectionElements) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    }
  });

  allSectionElements.forEach((section) => {
    observer.observe(section);
  });
});
</script>

<template>
  <header>
    <Logo />
  </header>

  <main>
    <article ref="articleElement">
      <section>
        <h1>Learn effectively with Flashcards</h1>
        <h2>Improve your study routine and retain information with ease</h2>

        <RouterLink class="button" to="/signin">Get Started</RouterLink>
      </section>

      <section>
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

      <section>
        <h1>How it works</h1>

        <p>
          After learning a concept create a flashcard with a question at the
          front and an answer at the back, you can also include a code snippet.
        </p>

        <p>
          When a flashcard shows up during your practise session, try to answer
          the question. Check if it matches the answer on the back side. Ideally
          you should aim to repeat this process at least three times.
        </p>

        <p>
          If you feel confident about the topic, mark the flashcard as
          memorized. It won't be presented to you anymore during practise, but
          it still will be available in seperate collection.
        </p>
      </section>

      <section>
        <h1>Main Features</h1>
        <ul>
          <li>
            <p>Grouping flashcards by your custom tags.</p>
          </li>
          <li>
            <p>Code snippets with highlighting.</p>
          </li>
          <!-- <li> -->
          <!-- <p>Lorem ipsum dolor sit amet.</p> -->
          <!-- </li> -->
        </ul>
      </section>

      <section>
        <h1>Open source</h1>
        <h2>This project is fully open source under MIT license</h2>

        <p>
          Feel free to contribute to the project, fork it or maybe even self
          host it.
        </p>

        <a
          class="button"
          href="https://github.com/wiktor-falek/flashcards"
          target="_blank"
          >Github</a
        >
      </section>
    </article>
    <footer>
      <a href="https://falek.dev">Wiktor Falek</a>
      <p>&nbsp;- All rights reserved</p>
    </footer>
  </main>
</template>

<style scoped>
main,
header {
  max-width: 800px;
  padding: 0px 20px;
  margin: 0 auto;
}

header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
}

h1 {
  font-size: 1.6rem;
  word-spacing: -3px;
  color: #e05777;
}

h2 {
  font-size: 1.2rem;
  color: #e05777;
  margin-bottom: 30px;
}

a:not(.button) {
  color: var(--link-color);
}

ul {
  padding: 0 20px;
}

li {
  margin-bottom: 10px;
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

@media screen and (min-width: 601px) {
  body {
    line-height: 1.6;
  }

  p {
    font-size: 1.2rem;
  }
  h1 {
    font-size: 1.92rem;
  }
  h2 {
    font-size: 1.44rem;
  }

  .padding-top {
    padding-top: 60px;
  }
}

section {
  opacity: 0;
  transition: all 0.8s;
}

section p {
  margin-top: 15px;
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 10px;
  margin: 10px;
  height: 55px;
  width: 220px;
  border: 2px solid #d33f64;
  color: #d33f64;
  background: transparent;
  white-space: nowrap;
  transition: all 0.05s linear;
  font-size: 1.2rem;
  font-weight: bold;
  user-select: none;
}

.button:hover {
  cursor: pointer;
  transform: scale(1.05);
}
.button:active {
  transform: scale(1);
}

.show {
  opacity: 1;
}

@media (prefers-reduced-motion) {
  section {
    opacity: 1;
    transition: none;
  }
}
</style>
