<template>
  <div class="modal-container">
    <div class="form-container--modal">
      <h1 class="form-title">Sign In!</h1>
      <sliding-door-animation class="animation"></sliding-door-animation>
      <form class="input-fields" @submit.prevent="submitForm">
        <div
          class="input-container skew"
          :class="{ invalid: emailInvalid && emailClicked }"
        >
          <label class="reverse-skew" for="email">Email:</label>
          <div class="input-background">
            <input
              id="email"
              @blur="emailValidation"
              v-model="email"
              class="reverse-skew"
              type="email"
            />
          </div>
        </div>
        <div
          class="input-container skew"
          :class="{ invalid: passwordInvalid && passwordClicked }"
        >
          <label class="reverse-skew" for="password">Password:</label>
          <div class="input-background">
            <input
              id="password"
              @blur="passwordValidation"
              v-model="password"
              class="reverse-skew"
              type="password"
            />
          </div>
        </div>
        <button class="submit-button skew">
          <p class="reverse-skew button-text">Sign in</p>
        </button>
      </form>
      <h3 class="text-link">
        <router-link to="home"
          >Don't have an account? Sign up instead!</router-link
        >
      </h3>
    </div>
  </div>
</template>

<script>
import SlidingDoorAnimation from "../../components/animations/OpeningDoor";
export default {
  components: {
    SlidingDoorAnimation,
  },
  data() {
    return {
      email: "",
      emailInvalid: true,
      emailClicked: false,
      password: "",
      passwordInvalid: true,
      passwordClicked: false,
    };
  },
  methods: {
    emailValidation(e) {
      this.emailInvalid = !/\S+@\S+\.\S+/.test(e.target.value);
      this.emailClicked = true;
    },
    passwordValidation(e) {
      this.passwordInvalid =
        e.target.value.length < 6 || !/\d/.test(e.target.value);
      this.passwordClicked = true;
    },
    submitForm() {
      this.$store.dispatch("auth/signIn", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/_form-styles.scss";

.form-container--modal {
  background: rgb(255, 255, 255);
  grid-column: 4 / span 6;
  align-self: center;
  flex-direction: column;
  // align-items: center;
  display: grid;
  grid-template: 12rem 60rem min-content minmax(100px, 128px) 100px / repeat(
      6,
      1fr
    );
  column-gap: 0.83%;
  border-radius: 16px;
}

.animation {
  height: 80%;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  grid-area: 2 / 3 / 3 / 5;
  justify-self: center;
  align-self: center;
}
</style>
