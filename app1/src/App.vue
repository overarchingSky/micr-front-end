<template>
  <div id="app">
    <div id="nav">
      <router-link to="/app2/a">app2-a</router-link> |
      <router-link to="/app2/b">app2-b</router-link> |
      <router-link to="/app1/c">app1-c</router-link> |
      <router-link to="/app1/d">app1-d</router-link> |
      <router-link to="/app3/e">app3-e</router-link> |
      <router-link to="/app3/f">app3-f</router-link>
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
