<template>
  <header class="header">
    <router-link v-if="checkPath" to="/settings">
      <p>Settings</p>
    </router-link>
    <router-link v-else to="/home" class="signup">
      <p>Home</p>
    </router-link>
    <div v-if="isLoggedIn" @click="logout">
      <p>Logout</p>
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

<style scoped>
header {
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 50px;
  background: #000;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

a,
div {
  margin-right: 5%;
  border: 2px solid white;
  padding: 3px 20px;
  height: 70%;
  display: flex;
  align-items: center;
}

p {
  color: white;
  text-decoration: none;
}
</style>
