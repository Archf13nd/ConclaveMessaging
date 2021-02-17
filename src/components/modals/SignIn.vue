<template>
  <div class="form-container">
    <div class="side"></div>
    <form @submit.prevent="submitForm" class="sign-up-container">
      <div class="input-fields">
        <h3 class="form-title">Sign in to your account</h3>
        <div class="input-field">
          <label for="email">Email:</label>
          <input id="email" type="email" placeholder="Email" v-model="email" />
        </div>
        <div class="input-field">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            v-model="password"
          />
        </div>
      </div>
      <div class="buttons">
        <button type="submit">Sign In</button>
        <router-link to="/settings/signup"
          >Don't have an account? Sign up instead</router-link
        >
      </div>
    </form>
    <div class="side"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async submitForm() {
      await this.$store.dispatch("auth/login", {
        email: this.email,
        password: this.password,
      });
      this.$router.replace("/home");
    },
  },
};
</script>
