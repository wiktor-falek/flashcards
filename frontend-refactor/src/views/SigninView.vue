<script setup>
import SigninForm from "../components/forms/SigninForm.vue";
import Logo from "../components/Logo.vue";
import { ref } from "vue";
import SignupForm from "../components/forms/SignupForm.vue";

const isSignInView = ref(true);
</script>

<template>
  <main>
    <div class="container">
      <div class="panel panel-left">
        <div class="wrapper">
          <div class="panel__header">
            <Logo />
            <p class="panel__header__text">Flashcards</p>
          </div>

          <div class="panel__greeting center" v-if="isSignInView">
            <h1>Welcome back</h1>
            <h2>Good to see you again</h2>
          </div>
          <div class="panel__greeting center" v-else>
            <h1>Learn with ease</h1>
            <h2 class="">Take your learning to the next level</h2>
          </div>

          <div class="panel__footer">flashcards.io</div>
        </div>
      </div>
      <div class="panel panel-right">
        <div class="wrapper">
          <div class="panel__header">
            <Logo />
            <p class="panel__header__text">Flashcards</p>
          </div>
          <!-- these components can toggle the isSignInView state with @signinViewToggle emit -->
          <SigninForm
            v-if="isSignInView"
            @signinViewToggle="isSignInView = false"
          />
          <SignupForm v-else @signinViewToggle="isSignInView = true" />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--font-color-dark);
}

.container {
  background-color: rgb(235, 235, 235);
  display: flex;
  flex-direction: row;
  max-height: 600px;
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 500px;
  min-width: 300px;
  width: 90vw;
  max-width: 400px;
}

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 15px 25px;
}

.panel__header {
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.logo {
  transform: scale(0.75);
}

.panel__header__text {
  font-size: 1.4rem;
  color: rgb(31, 28, 28);
}

.panel-left {
  display: none;
  background-color: var(--color-primary);
  background: linear-gradient(
    70deg,
    var(--color-primary),
    var(--color-secondary)
  );
}

@media screen and (min-width: 800px) {
  .panel-left {
    display: flex;
  }

  .panel-right .panel__header {
    display: none;
  }
}

.panel__greeting {
  margin-bottom: 60px;
}

h2 {
  font-size: 1.3rem;
}

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>
