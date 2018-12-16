<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import "@/assets/style/global-vars.scss";

* {
  font-family: Roboto;
}

#app {
  background-color: $background-color;
  margin: 0;
  padding: 0;
  height: 100vh;
  overflow: auto;
  // width: 100%;
  // position: absolute;
}
</style>
