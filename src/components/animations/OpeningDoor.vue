<template>
  <div class="container rotating-door">
    <div class="left-door item"></div>
    <div class="right-door item"></div>
  </div>
</template>
<style lang="scss" scoped>
html {
  --door-width: 200px;
  --margin-top: 1em;
}

.container {
  display: flex;
  justify-content: center;
  width: var(--door-width);
  background-color: rgb(0, 0, 0);
  margin: var(--margin-top) auto;
  box-shadow: 0px 0px 2px 2px;
  overflow: hidden;
}

.sliding-door {
  &:hover > .item.right-door {
    transform: translateX(100%);
  }
  &:hover > .item.left-door {
    transform: translateX(-100%);
  }
  & .item {
    background-color: #945ec9;
    border: 2px groove;

    &::before,
    &::after {
      border: 2px groove white;
    }
  }
}

.scaling-door {
  & .item {
    background-color: #c9945e;
    border: 5px ridge white;

    &::before,
    &::after {
      border: 5px double white;
    }
  }

  &:hover > .item {
    transform: scaleX(0);
  }
}

.rotating-door {
  perspective: 300px;

  & .item {
    background-color: #58c08c;
    border: 5px outset white;
    &::before,
    &::after {
      border: 5px inset white;
    }
  }

  &:hover > .left-door {
    transform: rotateY(90deg);
  }

  &:hover > .right-door {
    transform: rotateY(-90deg);
  }
}

.item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100%;
  min-height: 150px;
  transition: all 1s ease;

  &::before,
  &::after {
    content: "";
    display: block;
    width: 40%;
    height: 40%;
    margin: auto;
  }
}

.left-door {
  transform-origin: left;
}

.right-door {
  transform-origin: right;
}

/*--------- Helper Classes -----------*/
.card {
  padding: 1em;
  margin-bottom: 1em;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
}

/*--------- Element styles -----------*/
main {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

body {
  text-align: center;
}

h2,
h3 {
  margin: 0 0 5px 0;
}
</style>
