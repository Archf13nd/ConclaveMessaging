<template>
  <div class="setting-links">
    <div class="nav-divider">
      <router-link to="/settings/details">Details</router-link>
      <router-link to="/settings/signup">Sign up</router-link>
    </div>
    <div class="nav-divider">
      <router-link to="/settings/signin">Sign in</router-link>
      <router-link to="/settings/deletedata">Delete Data</router-link>
    </div>
  </div>
  <div class="form-view">
    <router-view
      :checkName="checkName"
      :getName="getName"
      :checkImg="checkImg"
      :getImg="getImg"
      :url="url"
    ></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      url: ""
    };
  },
  computed: {
    checkName() {
      if (this.checkData()) {
        return "Change your username:";
      } else {
        return "Choose a username:";
      }
    },
    getName() {
      if (this.checkData()) {
        return JSON.parse(localStorage.getItem("conclave"))["name"];
      } else {
        return "";
      }
    },
    checkImg() {
      if (this.checkData("url")) {
        return "Change your profile picture :)";
      } else {
        return "Choose a profile picture";
      }
    },
    getImg() {
      if (this.checkData("url")) {
        return JSON.parse(localStorage.getItem("conclave"))["url"];
      } else {
        return "";
      }
    }
  },
  methods: {
    checkData(field = "name") {
      if (localStorage.getItem("conclave")) {
        return JSON.parse(localStorage.getItem("conclave"))[field]
          ? true
          : false;
      }
    },
    confirm() {
      const dataObject = JSON.parse(localStorage.getItem("conclave"));
      this.name ? (dataObject.name = this.name) : false;
      this.url ? (dataObject.url = this.url) : false;
      localStorage.setItem("conclave", JSON.stringify(dataObject));
      this.$router.push("/home");
    }
  },
  created() {
    if (localStorage.getItem("conclave")) {
      this.url = JSON.parse(localStorage.getItem("conclave"))["url"];
    }
  }
};
</script>

<style scoped>
.setting-links {
  display: flex;
  justify-content: center;
  max-width: 80%;
  margin: 30px auto;
}

.form-view {
  margin-top: 50px;
}

.nav-divider {
  width: fit-content;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

a {
  width: fit-content;
  min-width: 90px;
  height: 30px;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  text-decoration: none;
  margin: 5px 20px;
}
</style>
