<template>
  <section class="delete-user-container">
    <h3 class="danger-title">DANGER!</h3>
    <info
      >I hereby acknowledge that by smashing the delete button my account and
      all the information associated with it will be deleted forever. No take
      backs. We will be sorry to see you go.</info
    >
    <button type="submit" @click="deleteData">
      <p class="button-text">DELETE</p>
    </button>
  </section>
</template>

<script>
export default {
  methods: {
    async deleteData() {
      try {
        await this.$store.dispatch("auth/deleteAccount");
      } catch (error) {
        alert(
          "I'm sorry. We cannot delete your account at this time. Please try again later"
        );
        throw error;
      }
      this.$router.replace("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.delete-user-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: space-around;
  padding: 0rem 8rem;
}

.danger-title {
  font-size: 9rem;
}

info {
  margin-top: 2rem;
  font-size: 3rem;
}

button {
  margin: 4rem auto;
  height: 20rem;
  width: 39rem;
  background: red;
  color: rgb(0, 0, 0);
  font-size: 50px;
  border: none;
}

.button-text {
  position: relative;
  height: 120%;
  width: 110%;
  left: -5%;
  top: -10%;
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
