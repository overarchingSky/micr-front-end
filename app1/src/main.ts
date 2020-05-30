import Vue from 'vue'
//import { registerMicroApps, start, setDefaultMountApp } from 'qiankun'
import App from './App.vue'
import router from './router'



Vue.config.productionTip = false

// const render = new Vue({
//   router,
//   render: h => h(App)
// })

const loader = () => {
  new Vue({
    router,
    render: h => h(App)
  })
}

loader()

// registerMicroApps([
//   {
//     name: 'web', // app name registered
//     entry: 'http://web4.5ihw.local:8082/',
//     container: '#app',
//     loader,
//     activeRule: '/web',
//   },
//   {
//     name: 'app1',
//     entry: 'http://localhost:8081',
//     container: '#app',
//     loader,
//     activeRule: '/app1',
//   },
// ]);

// setDefaultMountApp('/web');

// start();
