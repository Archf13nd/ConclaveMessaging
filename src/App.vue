<template>
  <div>
    <the-header></the-header>
    <router-view></router-view>
  </div>
</template>

<script>
import theHeader from "./components/ui/Header.vue";

export default {
  name: "App",
  components: {
    theHeader,
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
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
}

.form-container {
  width: 100vw;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-title {
  font-weight: bold;
  font-size: 20px;
  display: inline-block;
}

.side {
  flex: 30 10 50px;
}

.sign-up-container {
  width: 100%;
  height: 100%;
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
  margin-top: 20px;
}

.buttons > a {
  margin-top: 20px;
  text-decoration: none;
  color: blue;
}

.btn {
  display: inline-block;
  width: fit-content;
  padding: 2px;
}

.input-fields {
  width: 100%;
  /* min-height: 50%; */
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
  margin: 20px;
}

.image {
  /* background: url("../assets/blank-profile-pic.png"); */
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
