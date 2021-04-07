<template>
  <div id="app">
    <turtle />
  </div>
</template>

<script>
import turtle from './views/turtle.vue'

export default {
  name: 'App',
  components: {
    turtle,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 24px;
}
</style>
