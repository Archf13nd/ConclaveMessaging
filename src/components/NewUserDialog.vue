<template>
  <div class="form-container">
    <div class="side"></div>
    <form class="sign-up-container" @submit.prevent="submit">
      <div class="input-fields">
        <h2 class="form-title">Make a local account</h2>
        <div class="input-field">
          <label for="name">Name:</label>
          <input id="name" type="text" v-model.trim="name" />
        </div>
        <div class="input-field">
          <label for="img">Image URL:</label>
          <input id="img" type="text" @blur="isImage" />
        </div>
      </div>

      <div
        class="image"
        :style="{ background: `url(${url})` }"
        style="background-size:cover;background-repeat:no-repeat;"
      ></div>

      <div class="buttons">
        <input class="btn" type="submit" value="Create local account" />
        <router-link to="/settings/signup"
          >Do you want an online account?</router-link
        >
      </div>
    </form>
    <div class="side"></div>
  </div>
</template>

<script>
import background from "../assets/blank-profile-pic.png";
import { v4 as uuidv4 } from "uuid";
export default {
  data() {
    return {
      name: "",
      defaultImg: true,
      url: background
    };
  },
  methods: {
    isImage(e) {
      this.url = e.target.value;
    },
    submit() {
      localStorage.setItem(
        "conclave",
        JSON.stringify({ name: this.name, url: this.url })
      );
      localStorage.setItem("localId", uuidv4());
      this.$emit("signedIn");
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog-container {
  width: 100vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-title {
  font-weight: bold;
  font-size: 20px;
}

.side {
  flex: 30 10 50px;
}

.sign-up-container {
  width: 100%;
  min-height: 75vh;
  border: 3px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 1%;
  flex: 10 1 300px;
}

.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center;
}

.buttons > a {
  margin-top: 20px;
}

.btn {
  display: inline-block;
  width: fit-content;
  padding: 2px;
}

.input-fields {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-field {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

label {
  display: block;
  align-self: flex-start;
}

input {
  height: 40px;
  width: 100%;
  border: 2px solid black;
}

.image {
  background: #000;
  width: 20vh;
  height: 20vh;
}

.image {
  // background: url("../assets/blank-profile-pic.png");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
