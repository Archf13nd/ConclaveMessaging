<template>
  <section class="settings-container">
    <div class="form-view">
      <div class="settings-nav-link">
        <router-link v-if="!currentPath" to="/settings/details"
          ><p class="reverse-skew">Details</p></router-link
        >
        <router-link v-else to="/settings/deletedata"
          ><p class="reverse-skew">Delete</p></router-link
        >
      </div>
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      userDetails: null,
      currentPath: true,
    };
  },
  methods: {
    whatPath() {
      this.currentPath =
        this.$route.path === "/settings/details" ? true : false;
    },
  },
  updated() {
    this.currentPath = this.$route.path === "/settings/details" ? true : false;
  },
};
</script>

<style lang="scss" scoped>
.settings-container {
  // width: 100vw;
  // height: 100%;
  display: grid;
  grid-template:
    90% 10% / repeat(2, minmax(3px, 1fr)) repeat(8, minmax(35px, 1fr))
    repeat(2, minmax(3px, 1fr));
  column-gap: 0.83%;
}

.form-view {
  height: calc(100vh - calc(#{$header-height} + 24px));
  position: relative;
  background: $background-body;
  grid-area: 1 / 4 / 3 / 10;
  margin-top: calc(#{$header-height} + 24px);
}

.settings-nav-link {
  position: absolute;
  top: 0;
  left: 0;
  height: 6rem;
  width: 14rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $nav-button-color;
  margin: 2rem;
  transform: skewX(-20deg);
  box-shadow: $shadow-default;
}

a {
  display: inline-block;
  text-decoration: none;
  font-size: 24px;
  color: #000;
}
</style>
