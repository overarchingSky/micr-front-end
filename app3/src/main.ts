import Vue from 'vue'
import App from './App.vue'
import router from './router'
import MircApp from './mirc-app'

new MircApp(router)

Vue.config.productionTip = false

window.vm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
