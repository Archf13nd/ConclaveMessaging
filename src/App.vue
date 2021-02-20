<template>
  <div>
    <sign-up-modal></sign-up-modal>
    <!-- <sign-in-modal></sign-in-modal> -->
    <the-header></the-header>
    <router-view></router-view>
  </div>
</template>

<script>
import theHeader from "./components/ui/Header.vue";
import SignUpModal from "./components/modals/SignUp.vue";
// import SignInModal from "./components/modals/SignIn.vue";

export default {
  name: "App",
  components: {
    theHeader,
    SignUpModal,
    // SignInModal, //todo
  },
};
</script>

<style>
*,
*::after,
*::before {
  box-sizing: inherit;
  padding: 0;
  margin: 0;
}

html {
  font-size: 8px;
  box-sizing: border-box;
  min-height: 100vh;
}

body {
  padding: 0;
  margin: 0;
}

.skew {
  transform: skewX(-20deg);
}

.reverse-skew {
  transform: skewX(20deg);
}
</style>
