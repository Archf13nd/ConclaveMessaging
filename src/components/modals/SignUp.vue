<template>
  <div class="modal-container">
    <div class="form-container--modal">
      <h1 class="form-title">Sign up!</h1>
      <div
        v-if="!showLoader"
        class="avatar"
        :style="{ background: `center / contain no-repeat url(${avatar})` }"
      ></div>
      <div v-else class="avatar">
        <div class="loader-container">
          <loader-goo :color="loaderSuccess" class="loader-1"></loader-goo>
          <loader-goo :color="loaderSuccess"></loader-goo>
        </div>
      </div>
      <form class="input-fields" @submit.prevent="submitForm">
        <div
          class="input-container skew"
          :class="{ invalid: usernameInvalid && usernameClicked }"
        >
          <label class="reverse-skew" for="username">Username:</label>
          <div class="input-background">
            <label
              v-if="usernameInvalid && usernameClicked"
              class="invalid-label reverse-skew"
              for="avatar"
              required
              >Length must be less than 10 characters</label
            >
            <input
              id="username"
              v-model="username"
              @blur="usernameValidation"
              class="reverse-skew"
              type="text"
              placeholder="Length greater than 2 and less than 10"
              required
            />
          </div>
        </div>
        <div
          class="input-container skew"
          :class="{ invalid: avatarInvalid && avatarClicked }"
        >
          <label class="reverse-skew" for="avatar" required>Avatar:</label>
          <div class="input-background">
            <label
              v-if="avatarInvalid && avatarClicked"
              class="invalid-label reverse-skew"
              for="avatar"
              required
              >This URL type is not supported</label
            >
            <input
              id="avatar"
              @focus="removeDefaultAvatar"
              @blur="avatarValidation"
              class="reverse-skew test"
              type="url"
              placeholder="Paste an image url"
              required
            />
          </div>
        </div>
        <div
          class="input-container skew"
          :class="{ invalid: emailInvalid && emailClicked }"
        >
          <label class="reverse-skew" for="email" required>Email:</label>
          <div class="input-background">
            <input
              id="email"
              v-model="email"
              @blur="emailValidation"
              class="reverse-skew"
              type="email"
              placeholder="Type in your email address"
              required
            />
          </div>
        </div>
        <div
          class="input-container skew"
          :class="{ invalid: passwordInvalid && passwordClicked }"
        >
          <label class="reverse-skew" for="password" required>Password:</label>
          <div class="input-background">
            <label
              v-if="passwordInvalid && passwordClicked"
              class="invalid-label reverse-skew"
              for="avatar"
              required
              >Not secure enough. Include a number</label
            >
            <input
              id="password"
              v-model="password"
              @blur="passwordValidation"
              class="reverse-skew"
              type="password"
              placeholder="Length > 6 and includes a number"
              required
            />
          </div>
        </div>
        <button type="submit" @click="checkInputs" class="submit-button skew">
          <p class="reverse-skew button-text">Sign up!</p>
        </button>
      </form>
      <h3 v-if="!errorMessage" @click="changeModal" class="text-link link">
        Already have an account? Sign in instead!
      </h3>
      <h3 v-else class="text-link error-message">
        {{ errorMessage }}
      </h3>
    </div>
  </div>
</template>

<script>
import LoaderGoo from "../../components/animations/LoadingGoo.vue";
export default {
  components: {
    LoaderGoo,
  },
  data() {
    return {
      username: "",
      avatar:
        "https://cdn.pixabay.com/photo/2016/07/11/20/08/raccoon-1510501_960_720.png",
      email: "",
      password: "",
      usernameInvalid: true,
      usernameClicked: false,
      avatarInvalid: true,
      showLoader: false,
      loaderSuccess: true,
      avatarClicked: false,
      emailInvalid: true,
      emailClicked: false,
      passwordInvalid: true,
      passwordClicked: false,
      errorMessage: "",
    };
  },
  methods: {
    usernameValidation(e) {
      e.target.value.length > 1 && e.target.value.length < 10
        ? (this.usernameInvalid = false)
        : (this.usernameInvalid = true);
      this.usernameClicked = true;
    },
    avatarValidation(e) {
      const avatarRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
      if (avatarRegex.test(e.target.value)) {
        this.avatar = e.target.value;
        this.avatarInvalid = false;
        this.showLoader = false;
        this.loaderSuccess = true;
      } else {
        this.avatarInvalid = true;
        this.loaderSuccess = false;
      }
    },
    removeDefaultAvatar() {
      if (!this.avatarClicked) {
        this.avatar = "";
        this.avatarInvalid = false;
      }
      this.avatarClicked = true;
      this.showLoader = true;
    },
    emailValidation(e) {
      this.emailInvalid = !/\S+@\S+\.\S+/.test(e.target.value);
      this.emailClicked = true;
    },
    passwordValidation(e) {
      this.passwordInvalid =
        e.target.value.length < 6 || !/\d/.test(e.target.value);
      this.passwordClicked = true;
    },
    checkInputs() {
      let count = 4;
      if (!this.usernameClicked) {
        this.usernameClicked = true;
        count -= 1;
      }
      if (!this.avatarClicked) {
        this.avatarClicked = true;
        count -= 1;
      }
      if (!this.emailClicked) {
        this.emailClicked = true;
        count -= 1;
      }
      if (!this.passwordClicked) {
        this.passwordClicked = true;
        count -= 1;
      }
      const success = count === 4;
      return success;
    },
    changeModal() {
      this.$emit("changeModal", "signin");
    },
    async submitForm() {
      if (this.checkInputs()) {
        try {
          await this.$store.dispatch("auth/signup", {
            username: this.username,
            avatar: this.avatar,
            email: this.email,
            password: this.password,
          });
        } catch (err) {
          console.log(err);
          if (err.error && err.error.message === "EMAIL_EXISTS") {
            this.errorMessage =
              "We already have an account with that email address";
          } else {
            this.errorMessage =
              "We are really sorry. Our server seems to be having problems";
          }
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

.invalid-label {
  font-size: 1.5rem;
  margin-left: 0;
  width: 200px;
  position: absolute;
  top: -15px;
  color: crimson;
  font-weight: bold;
}
</style>
