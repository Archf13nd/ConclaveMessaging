<template>
  <div class="details-container">
    <div class="form-container--modal">
      <h1 class="form-title" :style="{ color: titleColor }">{{ title }}</h1>
      <div
        class="avatar"
        :style="{
          background: `center / contain url(${
            avatar || getUserDetails.avatar
          })`,
        }"
      ></div>
      <form class="input-fields" @submit.prevent="submitForm">
        <div class="input-container skew" :class="{ invalid: usernameInvalid }">
          <label class="reverse-skew" for="username">Username:</label>
          <div class="input-background">
            <input
              id="username"
              class="reverse-skew"
              type="text"
              v-model="username"
              :placeholder="getUserDetails.username"
            />
          </div>
        </div>
        <div class="input-container skew" :class="{ invalid: avatarInvalid }">
          <label class="reverse-skew" for="avatar">Avatar:</label>
          <div class="input-background">
            <input
              id="avatar"
              class="reverse-skew"
              type="text"
              v-model="avatar"
              :placeholder="getUserDetails.avatar"
            />
          </div>
        </div>
        <div class="input-container skew" :class="{ invalid: emailInvalid }">
          <label class="reverse-skew" for="email">Email:</label>
          <div class="input-background">
            <input
              id="email"
              class="reverse-skew"
              type="email"
              v-model="email"
              :placeholder="getUserDetails.email"
            />
          </div>
        </div>
        <div class="input-container skew" :class="{ invalid: passwordInvalid }">
          <label class="reverse-skew" for="password">Password:</label>
          <div class="input-background">
            <input
              id="password"
              class="reverse-skew"
              type="password"
              v-model="password"
              placeholder="*******"
            />
          </div>
        </div>
        <button class="submit-button skew">
          <p class="button-text reverse-skew">Confirm changes</p>
        </button>
      </form>
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
      title: "Change Details",
      username: "",
      usernameInvalid: false,
      avatar: "",
      avatarInvalid: false,
      email: "",
      emailInvalid: false,
      password: "",
      passwordInvalid: false,
      titleColor: "#000",
    };
  },
  methods: {
    async submitForm(instruction) {
      let username = this.getUserDetails.username;
      let avatar = this.getUserDetails.avatar;
      let email = this.getUserDetails.email;
      let password = this.getUserDetails.password;
      let isChange = null;

      if (this.username) {
        this.username.length > 1 && this.username.length < 10
          ? (username = this.username)
          : (this.usernameInvalid = true);
        isChange = true;
      }
      if (this.avatar) {
        const avatarRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
        avatarRegex.test(this.avatar)
          ? (avatar = this.avatar)
          : (this.avatarInvalid = true);
        avatar !== this.getUserDetails.avatar ? (isChange = true) : false;
      }
      if (this.email) {
        if (this.email !== email && /\S+@\S+\.\S+/.test(this.email)) {
          this.$store.dispatch("auth/updateUserEmail", { email: this.email });
          this.title = "Success!";
          this.titleColor = "#56C568";
        }
      }
      if (this.password) {
        this.password.length >= 6 || /\d/.test(this.password)
          ? this.$store.dispatch("auth/updateUserPassword", {
              password: this.password,
            })
          : (this.passwordInvalid = true);
        this.title = "Success!";
        this.titleColor = "#56C568";
      }
      if (!isChange || instruction === "nosubmit") {
        return;
      }
      try {
        await this.$store.dispatch("auth/updateUserProfile", {
          username: username,
          avatar: avatar,
        });
        this.title = "Success!";
        this.titleColor = "#56C568";
      } catch {
        this.title = "Update Failed";
        this.titleColor = "#EB5757";
      }
    },
  },
  computed: {
    getUserDetails() {
      return this.$store.getters["auth/getUserDetails"];
    },
  },
  watch: {
    getUserDetails() {
      this.avatar = this.getUserDetails.avatar;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/_form-styles.scss";

.details-container {
  // background: rgba(0, 0, 0, 0.336);
  width: 100%;
  height: 100%;
}

.form-container--modal {
  background: rgba(255, 255, 255, 0);
  grid-column: 4 / span 6;
  align-self: center;
  flex-direction: column;
  // align-items: center;
  display: grid;
  grid-template: 12rem 38rem 240px 128px 100px / repeat(6, 1fr);
  column-gap: 0.83%;
  border-radius: 16px;
}

input::placeholder {
  color: #000;
}
input:focus::placeholder {
  color: rgba(0, 0, 0, 0);
}

// .form-title {
//   font-size: 9rem;
//   grid-area: 1 / 3 / 2 / 5;
//   justify-self: center;
//   align-self: end;
// }

// .avatar {
//   width: 30rem;
//   height: 30rem;
//   border-radius: 50%;
//   box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
//   grid-area: 2 / 3 / 3 / 5;
//   justify-self: center;
//   align-self: center;
// }

// .input-fields {
//   grid-area: 3 / 2 / 4 / 6;
//   justify-self: center;
//   width: 100%;
// }

// .input-container {
//   display: flex;
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;

//   &:not(:first-child) {
//     margin-top: 16px;
//   }
// }

// .submit-button {
//   grid-area: 4 / 3 / 5 / 5;
//   align-self: center;
//   height: 48px;
//   background: #278618;
//   font-size: 3rem;
//   border: none;
//   border-radius: 4px;
//   box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);
// }

// .text-link {
//   grid-area: 5 / 2 / 6 / 6;
//   justify-self: center;
//   font-size: 24px;
//   color: #0047ff;
// }

// a {
//   color: #0047ff;
//   text-decoration: none;
// }

// label {
//   font-size: 24px;
// }

// input {
//   height: 48px;
//   width: 75%;
//   background: $form-input-color;
//   border: none;
//   border-radius: 4px;
// }
</style>
