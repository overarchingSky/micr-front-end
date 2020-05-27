import VueRouter, { RouteConfig } from 'vue-router'
import { BfhlMircApp } from './types'
import { hookScript, proxyXMLHttpRequest, hookLink, correctUrl, hookImg } from './proxy'

function proxy(App){
    
   hookImg(App)
   hookLink(App)
   hookScript(App)
   proxyXMLHttpRequest(App)
    // return
    // const appendChild = document.head.appendChild
    // document.head.appendChild = function<T extends Node>(s: T ){
    //     // @ts-ignore
    //     let src = s.src
    //     if(App && App.moduleName !== App.currentModuleName){
    //         // @ts-ignore
    //         src = App.modules[App.currentModuleName].host + '/' + s.src.replace(/^http(s)?:\/\/(.*?)\//,'')
    //     }
    //     // @ts-ignore
    //     s.src = src
    //     appendChild.call(document.head, s)
    //     return s
    // }
}

function addScripts(urls: string[]){
    return new Promise((resolve,reject) => {
        let loadedCount = 0
        urls.forEach(url => {
            const tag = /.css/.test(url) ? 'link' : 'script'
            const s = document.createElement(tag)
            if(tag === 'script'){
                console.log('tag',tag,url)
                s.charset="utf-8"
                //@ts-ignore
                s.src = url
                s.onload = function(){
                    ++loadedCount
                    if(loadedCount === urls.length){
                        resolve()
                    }
                }
                s.onerror = function(){
                    reject()
                }
            }else{
                //@ts-ignore
                s.href = url
                //@ts-ignore
                s.rel = 'stylesheet'
                ++loadedCount
                if(loadedCount === urls.length){
                    resolve()
                }
            }
            
            
            document.head.appendChild(s)
        })
    })
    
}

let timer

export function getRemoteMircApp() {
    return window.$BfhlMircApp = (window.$BfhlMircApp || {
        remoteRoutes:[]
    }) as BfhlMircApp
}


// class MircAppModules {
//     modules = []
//     constructor(data){
//         this.
//     }
// }

export default class MircApp {
    router
    // 当前子应用所属模块名
    moduleName = 'app1'
    // 当前路由对应的模块名
    currentModuleName
    modules = {
        'app1':{
            host:'http://192.168.142.20:8080',
            loaded:false,
            vendors:[
                '/js/chunk-vendors.5b52e27c.js',
            ],
            assets:[
                '/js/mirc-app.js'
            ],
        },
        'app2':{
            host:'http://192.168.142.20:8081',
            loaded:false,
            vendors:[
                '/js/chunk-vendors.22e914ed.js',
            ],
            assets:[
                '/js/mirc-app.js',
                '/css/app.5c9713c3.css'
            ],
        },
        'app3':{
            host:'http://192.168.142.20:8084',
            loaded:false,
            vendors:[
                '/js/chunk-vendors.22e914ed.js',
            ],
            assets:[
                '/js/mirc-app.js'
            ]
        }
    }
    remoteRoutes: RouteConfig[] = []
    constructor(router: VueRouter) {
        this.router = router
        this.remoteRoutes = getRemoteMircApp().remoteRoutes
        const oldPush = this.remoteRoutes.push
        // eslint-disable-next-line 
        const self = this
        this.remoteRoutes.push = function(...items: RouteConfig[]){
            console.log('push route')
            timer && clearInterval(timer)
            timer = setTimeout(() => {
                console.log(self.remoteRoutes)
                self.installRoutes()
            }, 0);
            items.forEach(item => {
                item.isRemoteRoute = true
                item.installed = false
            })
            return oldPush.call(self.remoteRoutes,...items)
        }
        this.installRoutes()

        proxy(this)

        this.router.beforeEach((to,from,next) => {
            console.log('to',to)
            this.currentModuleName = to.path.replace(/(^\/)|(\/$)/g,'').split('/')[0]
            if(this.currentModuleName === this.moduleName){
                next()
            }else{
                // const base = document.getElementById('base') as HTMLBaseElement
                // if(this.moduleName !== this.currentModuleName){
                //     base.href = this.modules[this.currentModuleName].host
                // }
                // console.log('loadModule')
                //@ts-ignore
                this.loadModule().then(next)
            }
        })
    }
    /**
     * 注册路由
     * @param routes 
     */
    installRoutes(routes?: RouteConfig[]){
        const self = this as BfhlMircApp
        const RouteReadyToInstall = (routes || self.remoteRoutes).filter((route: RouteConfig) => route.isRemoteRoute && !route.installed)
        console.log('remote route install',RouteReadyToInstall)
        this.router.addRoutes(RouteReadyToInstall)
        RouteReadyToInstall.forEach(route => route.installed = true)
    }
    /**
     * 加载远程模块
     */
    loadModule(){
        const currentModule = this.modules[this.currentModuleName]
        if(currentModule.loaded){
            return Promise.resolve()
        }
        return addScripts(currentModule.vendors).then(() => {
            return addScripts(currentModule.assets)
        }).then(data => {
            currentModule.loaded = true
            return data
        })
    }
}