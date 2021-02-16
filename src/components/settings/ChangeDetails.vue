<template>
  <div class="form-container">
    <div class="side"></div>
    <form @submit.prevent="submitForm" class="sign-up-container">
      <div class="input-fields">
        <h3 class="form-title">Change your details!</h3>
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
      </div>
      <div
        class="image"
        :style="{ background: `url(${theUrl})` }"
        style="background-size:100% 100%;background-repeat:no-repeat;"
      ></div>
      <div class="buttons">
        <input type="submit" value="Update" />
      </div>
    </form>
    <div class="side"></div>
  </div>
</template>

<script>
export default {
  props: ["checkName", "getName", "checkImg", "getImg", "url"],
  data() {
    return {
      theUrl: "",
      name: ""
    };
  },
  methods: {
    submitForm() {
      const isLoggedIn = this.$store.getters["auth/isLoggedIn"];
      if (isLoggedIn) {
        this.$store.dispatch("auth/changeUserDetails", {
          name: this.name,
          url: this.theUrl
        });
      } else {
        localStorage.setItem(
          "conclave",
          JSON.stringify({
            name: this.name,
            url: this.theUrl
          })
        );
      }
    }
  },
  created() {
    this.theUrl = this.url;
  }
};
</script>

<style scoped></style>
