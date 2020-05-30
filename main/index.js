import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, initGlobalState } from 'qiankun';
import './index.less';

/**
 * 主应用 **可以使用任意技术栈**
 * 以下分别是 React 和 Vue 的示例，可切换尝试
 */
//import render from './render/ReactRender';
import render from './render/VueRender'

/**
 * Step1 初始化应用（可选）
 */
render({ loading: true });

const loader = loading => render({ loading });




/**
 * Step2 注册子应用
 */

registerMicroApps(
  [
    {
      name: 'web', // app name registered
      entry: 'http://web4.5ihw.local:8082/',
      container: '#subapp-container',
      loader,
      activeRule: '/web',
    },
    {
      name: 'app1',
      entry: 'http://localhost:8081',
      container: '#subapp-container',
      loader,
      activeRule: '/app1',
    }
  ]
);

const { onGlobalStateChange, setGlobalState } = initGlobalState({
  menus:[],
  user: 'qiankun',
});

let  menus = []

onGlobalStateChange((value, prev) => {
  console.log('[onGlobalStateChange - master]:', value)
});

// setGlobalState({
  
// });

/**
 * Step3 设置默认进入的子应用
 */
setDefaultMountApp('/vue');

/**
 * Step4 启动应用
 */
start({
  fetch(url, ...args) {
    console.log('+++url',url)
    console.log('+++args',args)
    if (url === '/images/logon/theme01/bg.jpg') {
      return {
        async text() { return '' }
      };
    }

    return window.fetch(url, ...args);
  }
});

runAfterFirstMounted(() => {
  console.log('[MainApp] first app mounted');
});
