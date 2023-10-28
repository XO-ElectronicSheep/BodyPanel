<script setup>
import { RouterView } from 'vue-router';

/* import Home from './components/Home.vue' */
</script>

<template>
  <!--  <Home /> -->

  <RouterView />
</template>

<style >
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 62.5%;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: #ffffff;
  width: 100%;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}


#app {
  height: 100% !important;
}
</style>
<!--  -->