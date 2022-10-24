<script setup>
import SigninForm from "../components/signin/SigninForm.vue";
import Logo from "../components/Logo.vue";
import { ref } from "vue";
import SignupForm from "../components/signin/SignupForm.vue";

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
            <p class="subheading">Glad to see you again!</p>
          </div>
          <div class="panel__greeting center" v-else>
            <h1>Welcome!</h1>
            <p class="subheading">Something something signup view text</p>
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
          <SigninForm v-if="isSignInView" @signinViewToggle="isSignInView = false" />
          <SignupForm v-else @signinViewToggle="isSignInView = true"/>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--font-color-dark);
}

.container {
  background-color: rgb(240, 240, 240);
  display: flex;
  flex-direction: row;
  margin-top: 20%;
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 580px;
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
  padding: 35px;
}

.panel__header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}

.panel__header__text {
  font-size: 1.6rem;
  color: rgb(31, 28, 28);
}

.panel-right {
}

.panel-right .wrapper {
  padding-top: 15px;
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

  .panel-right .wrapper {
    padding-top: 35px;
  }
}

.panel__greeting {
  margin-bottom: 60px;
}

.subheading {
  font-size: 1.3rem;
}

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
