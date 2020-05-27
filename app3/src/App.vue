<template>
  <div id="app">
    <div id="nav">
      <router-link to="/app2/a">a</router-link> |
      <router-link to="/app2/b">b</router-link> |
      <router-link to="/app1/c">c</router-link> |
      <router-link to="/app1/d">d</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
