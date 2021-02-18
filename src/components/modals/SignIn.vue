<template>
  <div class="modal-container">
    <div class="form-container--modal">
      <h1 class="form-title">Sign In!</h1>
      <sliding-door-animation class="animation"></sliding-door-animation>
      <form class="input-fields" @submit.prevent="submitForm">
        <div class="input-container">
          <label for="username">Username:</label>
          <input class="skew" type="name" />
        </div>
        <div class="input-container">
          <label for="username">Password:</label>
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
import SlidingDoorAnimation from "../../components/animations/OpeningDoor";
export default {
  components: {
    SlidingDoorAnimation,
  },
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
  display: grid;
  grid-template:
    1fr / repeat(2, minmax(3px, 1fr)) repeat(8, minmax(35px, 1fr))
    repeat(2, minmax(3px, 1fr));
  column-gap: 0.83%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  height: 100vh;
  width: 100vw;
  backdrop-filter: blur(10px);

  @media screen and (max-width: 1000px) {
    display: block;
  }
}

.form-container--modal {
  background: rgb(255, 255, 255);
  grid-column: 4 / span 6;
  align-self: center;

  display: grid;
  grid-template: 12rem 54rem 14rem 128px 100px / repeat(6, 1fr);
  column-gap: 0.83%;

  @media screen and (max-width: 1000px) {
    //   background: #000;
    grid-template-columns: repeat(6, minmax(30px, 1fr));
    column-gap: 0%;
    width: 90vw;
    margin: 2rem auto;
  }

  border-radius: 16px;
}

.form-title {
  font-size: 9rem;
  grid-area: 1 / 3 / 2 / 5;
  justify-self: center;
  align-self: end;

  @media screen and (max-width: 600px) {
    font-size: 5rem;
  }
}

.animation {
  height: 80%;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  grid-area: 2 / 3 / 3 / 5;
  justify-self: center;
  align-self: center;
}

.input-fields {
  grid-area: 3 / 2 / 4 / 6;
  justify-self: center;
  align-self: center;
  width: 100%;
}

.input-container {
  display: flex;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;

  @media screen and (max-width: 600px) {
    justify-content: center;
  }

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

  &:hover {
    transform: skew(-20deg) scale(1.01);
    background: #2aa317;
  }
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
  font-size: 3rem;
}

input {
  height: 48px;
  width: 75%;
  background: $form-input-color;
  border: none;
  border-radius: 4px;
}
</style>
