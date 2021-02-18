<template>
  <header class="header">
    <router-link class="skew" v-if="checkPath" to="/settings">
      <p class="reverse-skew">Settings</p>
    </router-link>
    <router-link v-else to="/home" class="signup">
      <p class="reverse-skew">Home</p>
    </router-link>
    <div class="skew" v-if="!isLoggedIn" @click="logout">
      <p class="reverse-skew">Logout</p>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    },
  },
  computed: {
    checkPath() {
      return this.$route.path === "/home" ? true : false;
    },
    isLoggedIn() {
      return this.$store.getters["auth/isAuthenticated"];
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 64px;
  background: $header-background;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 0 16%;
}

a,
div {
  background: $nav-button-color;
  width: 112px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  margin-right: 24px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  &:hover {
    border: 2px solid #8df35c;
  }
}

p {
  color: rgb(0, 0, 0);
  text-decoration: none;
  font-size: 20px;
}
</style>
