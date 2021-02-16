<template>
  <div class="form-container">
    <div class="side"></div>
    <form @submit.prevent="submitForm" class="sign-up-container">
      <div class="input-fields">
        <h3 class="form-title">Sign up for an online account</h3>

        <div class="input-field">
          <label for="name">{{ checkName }}</label>
          <input id="name" type="text" :placeholder="getName" v-model="name" />
        </div>
        <div class="input-field">
          <label for="image">{{ checkImg }}</label>
          <input
            id="image"
            type="text"
            :placeholder="getImg"
            v-model="theUrl"
          />
        </div>
        <div
          class="image"
          :style="{ background: `url(${theUrl})` }"
          style="background-size:100% 100%;background-repeat:no-repeat;"
        ></div>
        <div class="input-field">
          <label for="email">Please fill out your email:</label>
          <input
            id="email"
            type="email"
            placeholder="example@example.com"
            v-model="email"
          />
        </div>
        <div class="input-field">
          <label for="password">Please choose a password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            v-model="password"
          />
        </div>
      </div>
      <div class="buttons">
        <input class="btn" type="submit" value="Sign Up" />
        <router-link to="/settings/signin"
          >Already have an account?</router-link
        >
      </div>
    </form>
    <div class="side"></div>
  </div>
</template>

<script>
import background from "../../assets/blank-profile-pic.png";

export default {
  props: ["checkName", "getName", "checkImg", "getImg", "url"],
  components: {},
  data() {
    return {
      name: "",
      theUrl: background,
      email: "",
      password: ""
    };
  },
  methods: {
    async submitForm() {
      try {
        await this.$store.dispatch("auth/signup", {
          name: this.name,
          url: this.theUrl,
          email: this.email,
          password: this.password
        });
        localStorage.setItem("conclave", null);
        this.$router.replace("/home");
      } catch (err) {
        const error = err || "An error in signup";
        throw error;
      }
    }
  },
  created() {
    this.theUrl = this.url;
  }
};
</script>

<style lang="scss" scoped></style>
