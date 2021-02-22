<template>
  <div>
    <sign-up-modal
      v-if="!userLoggedIn && timePassed && !existingUser"
    ></sign-up-modal>
    <sign-in-modal
      v-if="!userLoggedIn && timePassed && existingUser"
    ></sign-in-modal>
    <the-header></the-header>
    <router-view :class="{ blur: !timePassed }"></router-view>
  </div>
</template>

<script>
import theHeader from "./components/ui/Header.vue";
import SignUpModal from "./components/modals/SignUp.vue";
import SignInModal from "./components/modals/SignIn.vue";

export default {
  name: "App",
  components: {
    theHeader,
    SignUpModal,
    SignInModal,
  },
  data() {
    return {
      timePassed: false,
      existingUser: false,
    };
  },
  computed: {
    userLoggedIn() {
      return this.$store.getters["auth/isValidSession"];
    },
  },
  created() {
    this.$store.dispatch("auth/autoSignIn");
    console.log("app created");
    this.existingUser = localStorage.getItem("existingUser");
    setTimeout(() => {
      this.timePassed = true;
    }, 300);
  },
  updated() {
    this.existingUser = JSON.parse(localStorage.getItem("existingUser"));
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

.blur {
  filter: blur(5px);
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

.hidden {
  display: none;
}
/* .show {
  display: block;
} */

.skew {
  transform: skewX(-20deg);
}

.reverse-skew {
  transform: skewX(20deg);
}
</style>
