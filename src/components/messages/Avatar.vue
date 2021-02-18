<template>
  <div
    class="avatar"
    :style="{ background: `center / contain url(${avatar})` }"
  >
    <span class="username">{{ username }}</span>
    <div class="pointer"></div>
    <span class="date">{{ dateString }}</span>
  </div>
</template>

<script>
export default {
  props: ["username", "avatar", "date"],
  computed: {
    dateString() {
      const timestamp = this.date;
      const dateString = new Date(timestamp);
      const minutes = dateString.getMinutes();
      const hours = dateString.getHours();
      const day = dateString.getDate();
      const month = dateString.getMonth() + 1;
      const year = dateString.getFullYear();
      return `${+hours > 9 ? hours : `0` + hours}:${
        +minutes > 9 ? minutes : `0` + minutes
      } - ${day}/${month}/${year}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-container {
  position: relative;
  display: inline-block;
  text-align: center;
}

.username {
  position: absolute;
  text-align: center;
  width: 100%;
  top: -20px;
  left: 0;
}

.avatar {
  position: relative;
  width: 64px;
  height: 64px;
  margin-top: -8px;
  border-radius: 50%;
  background: #000; //todo
}

.date {
  position: absolute;
  text-align: center;
  width: 100%;
  bottom: -12px;
  left: 0;
  font-size: 8px;
  font-weight: bold;
}

.pointer {
  position: absolute;
  top: 20px;
  left: calc(64px + 8px);
  width: 24px;
  height: 24px;
  clip-path: polygon(100% 0, 0 50%, 100% 100%);
  background: linear-gradient(
    to right,
    #e3e3e3 0%,
    #e8e7e7 84.37%,
    #9c9b9b 100%
  );
}
</style>
