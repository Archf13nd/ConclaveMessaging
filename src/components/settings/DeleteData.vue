<template>
  <div class="container">
    <h3 class="font-bold">Delete your data:</h3>
    <p>This cannot be undone</p>
    <button type="submit" @click="deleteData">DELETE</button>
  </div>
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
    }
  }
};
</script>

<style scoped>
.container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

button {
  margin-top: 20px;
  height: 200px;
  width: 300px;
  background: red;
  color: aliceblue;
  font-size: 50px;
}
/*  */
</style>
