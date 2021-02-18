<template>
  <div class="modal-container">
    <div class="form-container--modal">
      <h1 class="form-title">Sign up!</h1>
      <div
        class="avatar"
        :style="{ background: `center / contain url(${avatar})` }"
      ></div>
      <form class="input-fields" @submit.prevent="submitForm">
        <div class="input-container">
          <label for="username">Username:</label>
          <input class="skew" type="name" />
        </div>
        <div class="input-container">
          <label for="username">Avatar:</label>
          <input class="skew" type="name" />
        </div>
        <div class="input-container">
          <label for="username">Password:</label>
          <input class="skew" type="name" />
        </div>
        <div class="input-container">
          <label for="username">Email:</label>
          <input class="skew" type="name" />
        </div>
      </form>
      <button class="submit-button skew">
        <p class="reverse-skew">Sign in</p>
      </button>
      <h3 class="text-link">
        <router-link to="home">Create a guest profile instead?</router-link>
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatar:
        "https://t4.ftcdn.net/jpg/03/09/97/57/360_F_309975771_1LcdaVK6D7eokEDzaAInNBGOG5tA9M80.jpg",
    };
  },
};
</script>

<style lang="scss" scoped>
.modal-container {
  @include grid-12;
  grid-template-rows: 1fr;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  height: 100vh;
  width: 100vw;
  backdrop-filter: blur(5px);
}

.form-container--modal {
  background: rgb(255, 255, 255);
  grid-column: 4 / span 6;
  align-self: center;
  flex-direction: column;
  // align-items: center;
  display: grid;
  grid-template: 12rem 38rem 240px 128px 100px / repeat(6, 1fr);
  column-gap: 0.83%;
  border-radius: 16px;
}

.form-title {
  font-size: 9rem;
  grid-area: 1 / 3 / 2 / 5;
  justify-self: center;
  align-self: end;
}

.avatar {
  width: 30rem;
  height: 30rem;
  border-radius: 50%;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  grid-area: 2 / 3 / 3 / 5;
  justify-self: center;
  align-self: center;
}

.input-fields {
  grid-area: 3 / 2 / 4 / 6;
  justify-self: center;
  width: 100%;
}

.input-container {
  display: flex;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:not(:first-child) {
    margin-top: 16px;
  }
}

.submit-button {
  grid-area: 4 / 3 / 5 / 5;
  align-self: center;
  height: 48px;
  background: #278618;
  font-size: 3rem;
  border: none;
  border-radius: 4px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);
}

.text-link {
  grid-area: 5 / 2 / 6 / 6;
  justify-self: center;
  font-size: 24px;
  color: #0047ff;
}

a {
  color: #0047ff;
  text-decoration: none;
}

label {
  font-size: 24px;
}

input {
  height: 48px;
  width: 75%;
  background: $form-input-color;
  border: none;
  border-radius: 4px;
}
</style>
