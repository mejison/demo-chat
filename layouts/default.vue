<template>
  <div class="app">
    <Nuxt />
  </div>
</template>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

* {
  box-sizing: border-box;
}

html,
body,
#__nuxt,
#__layout {
  margin: 0;
  padding: 0;
  height: 100%;
}

.app {
  background: #77a1d3; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #e684ae,
    #79cbca,
    #77a1d3
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #e684ae,
    #79cbca,
    #77a1d3
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
