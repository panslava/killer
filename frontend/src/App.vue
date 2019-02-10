<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
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
  position: relative;
  z-index: 0;
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
