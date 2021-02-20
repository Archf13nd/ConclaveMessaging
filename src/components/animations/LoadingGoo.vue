<template>
  <div class="wrapper">
    <div class="ball-1" :class="checkColor"></div>
    <div class="ball-2" :class="checkColor"></div>
    <div class="ball-3" :class="checkColor"></div>
  </div>
</template>

<script>
export default {
  props: ["color"],
  computed: {
    checkColor() {
      return {
        "ball-success": this.color,
        "ball-danger": !this.color,
      };
    },
  },
};
</script>

<style scoped>
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: blur(15px) contrast(30);
  background: rgba(255, 255, 255, 0.384);
}

.ball-success {
  position: absolute;
  width: 120px;
  height: 120px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(0deg);
  transform-origin: 66px center;
  margin-left: 40px;
}

.ball-danger {
  position: absolute;
  width: 120px;
  height: 120px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: 66px center;
  margin-left: 40px;
}

.ball-success:before {
  content: "";
  width: 68px;
  height: 68px;
  position: absolute;
  top: 50%;
  left: -10px;
  transform: translateY(-50%);
  border-radius: 100%;
  background: rgb(9, 250, 9);
}
.ball-danger:before {
  content: "";
  width: 68px;
  height: 68px;
  position: absolute;
  top: 50%;
  left: -10px;
  transform: translateY(-50%);
  border-radius: 100%;
  background: rgb(255, 0, 0);
}

.ball-1 {
  margin-left: -50px;
}

.ball-2 {
  margin-left: 25px;
  transform: translateY(-50%) rotate(180deg);
  margin-left: -100px;
  animation: rotate-1 1.7s linear infinite;
  z-index: 2;
}

@keyframes rotate-1 {
  0% {
    margin-left: -18px;
    transform: translateY(-50%) rotate(0deg);
    transform-origin: 66px center;
  }
  25% {
    margin-left: -25px;
    transform: translateY(-50%) rotate(-180deg);
    transform-origin: 66px center;
  }
  50% {
    margin-left: -33px;
    transform: translateY(-50%) rotate(-360deg);
    transform-origin: 66px center;
  }
  50.1% {
    transform-origin: -12px center;
  }
  75% {
    margin-left: -36px;
    transform: translateY(-50%) rotate(-180deg);
    transform-origin: -12px center;
  }
  75.01% {
    margin-left: -66px;
    transform: translateY(-50%) rotate(-180deg);
    transform-origin: -12px center;
  }
  100% {
    margin-left: -18px;
    transform: translateY(-50%) rotate(0deg);
    transform-origin: -12px center;
  }
}

.ball-3 {
  margin-left: 120px;
}
</style>
