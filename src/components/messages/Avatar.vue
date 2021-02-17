<template>
  <div class="avatar-container">
    <span class="username">{{ username }}</span>
    <div class="avatar"></div>
    <span class="date">{{ date }}</span>
  </div>
</template>

<script>
export default {
  props: ["username", "avatar", "date"],
};
</script>
