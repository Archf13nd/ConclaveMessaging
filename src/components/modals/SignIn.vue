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
      <h3 v-if="!errorMessage" @click="changeModal" class="text-link link">
        Don't have an account? Sign up instead!
      </h3>
      <h3 v-else class="text-link error-message">
        {{ errorMessage }}
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
      errorMessage: "",
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
    changeModal() {
      this.$emit("changeModal", "signup");
    },
    async submitForm() {
      try {
        await this.$store.dispatch("auth/signIn", {
          email: this.email,
          password: this.password,
        });
      } catch (err) {
        if (
          (err.error && err.error.message === "EMAIL_NOT_FOUND") ||
          (err.error && err.error.message === "INVALID_PASSWORD")
        ) {
          this.errorMessage = "Either your email or password was incorrect";
        } else {
          this.errorMessage =
            "We're sorry. It seems the server is having an off day";
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/_form-styles.scss";

.link:hover {
  transform: translateY(-3px);
  cursor: pointer;
}

.error-message {
  color: crimson;
}

.form-container--modal {
  background: rgb(255, 255, 255);
  grid-column: 4 / span 6;
  align-self: center;
  flex-direction: column;
  // align-items: center;
  display: grid;
  grid-template: 12rem 55rem min-content minmax(100px, 128px) 100px / repeat(
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
