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
            <input
              id="username"
              v-model="username"
              @blur="usernameValidation"
              class="reverse-skew"
              type="text"
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
            <input
              id="avatar"
              @focus="removeDefaultAvatar"
              @blur="avatarValidation"
              class="reverse-skew test"
              type="url"
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
            <input
              id="password"
              v-model="password"
              @blur="passwordValidation"
              class="reverse-skew"
              type="password"
              required
            />
          </div>
        </div>
        <button type="submit" @click="checkInputs" class="submit-button skew">
          <p class="reverse-skew button-text">Sign in</p>
        </button>
      </form>
      <h3 class="text-link">
        <router-link to="home">Create a guest profile instead?</router-link>
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
          //todo Display to user that something went wrong
          const error = new Error(err);
          throw error;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-container {
  @include grid-12;
  grid-template-rows: 1fr;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  height: 100vh;
  width: 100vw;
  backdrop-filter: blur(5px);
}

.form-container--modal {
  background: rgb(255, 255, 255);
  grid-column: 4 / span 6;
  align-self: center;
  flex-direction: column;
  // align-items: center;
  display: grid;
  grid-template: 12rem 38rem min-content minmax(100px, 128px) 100px / repeat(
      6,
      1fr
    );
  column-gap: 0.83%;
  border-radius: 16px;
}

form {
  position: relative;
}

.form-title {
  font-size: 9rem;
  grid-area: 1 / 1 / 2 / 7;
  justify-self: center;
  align-self: end;
}

.avatar {
  position: relative;
  width: 30rem;
  height: 30rem;
  border-radius: 50%;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  grid-area: 2 / 3 / 3 / 5;
  justify-self: center;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  clip-path: circle(50% at 50% 50%);
}

.loader-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70%;
  width: 70%;
  // transform: scale(0.5);
}

.loader-1 {
  transform: rotateZ(-90deg);
}

.input-fields {
  grid-area: 3 / 2 / 4 / 6;
  justify-self: center;
  width: 100%;

  @media screen and (max-width: 700px) {
    width: 100%;
    margin-left: 2.5rem;
  }
}

.input-container {
  display: flex;
  width: 100%;
  min-height: fit-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border: 2px solid transparent;

  &:not(:first-child) {
    margin-top: 16px;
  }

  @media screen and (max-width: 700px) {
    &:not(:first-child) {
      margin-top: 24px;
    }
  }
}

.submit-button {
  position: absolute;
  // grid-area: 4 / 3 / 5 / 5;
  align-self: center;
  --button-width: 224px;
  --button-height: -48px;
  width: var(--button-width);
  height: 48px;
  left: calc(50% - var(--button-width) / 2);
  bottom: var(--button-height);
  margin-bottom: -4rem;
  background: #278618;
  font-size: 3rem;
  border: none;
  border-radius: 4px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);
  transition: 0.1s;

  &:hover {
    background: #2ea51c;
    margin-bottom: -3rem;
    box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.5);
  }

  &:active {
    margin-bottom: -4rem;
  }

  @media screen and (max-width: 700px) {
    margin-bottom: -8rem;
    margin-left: -1.5rem;
  }
}

.button-text {
  display: inline-block;
}

.text-link {
  grid-area: 5 / 2 / 6 / 6;
  justify-self: center;
  font-size: 24px;
  color: #0047ff;

  @media screen and (max-width: 700px) {
    font-size: 3.5vw;
  }
}

.invalid {
  border: 2px solid #eb5757;
}

a {
  color: #0047ff;
  text-decoration: none;
}

label {
  font-size: 24px;
  margin-left: 1rem;
  width: 100px;
}

.input-background {
  width: 75%;
  height: 48px;
  background: $form-input-color;

  @media screen and (max-width: 700px) {
    width: 100%;
  }
}

input {
  height: 100%;
  width: 100%;
  background: transparent;
  border: none;
  border-radius: 4px;
  font-size: 24px;
  padding: 0 1rem 0 2rem;

  &:focus {
    outline: none;
  }
}

// This removes the brower's default stying
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition: all 5000s ease-in-out 0s;
}
</style>
