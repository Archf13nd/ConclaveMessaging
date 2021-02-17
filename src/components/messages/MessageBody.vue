<template>
  <div class="message-body">
    <p>{{ messageContents }}</p>
  </div>
</template>

<script>
export default {
  props: ["messageContents"],
};
</script>
