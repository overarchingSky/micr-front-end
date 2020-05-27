import { BfhlMircApp } from '@/mirc-app/types'
import { RouteConfig } from 'vue-router'
import { routes } from '@/router'
import { getRemoteMircApp } from '.'

const moduleName = 'app1'

function AddModuleName(routes){
    routes.forEach(route => {
        route.moduleName = moduleName
        route.remoteRoutes = true
        route.installed = false
        if(route.children){
            AddModuleName(route.children)
        }
    });
}

AddModuleName(routes)

const bfhlMircApp = getRemoteMircApp()
console.log('app1 remoteRoutes',window.$BfhlMircApp,bfhlMircApp.remoteRoutes, window.$BfhlMircApp.remoteRoutes === bfhlMircApp.remoteRoutes)
bfhlMircApp.remoteRoutes.push(...routes)
window.$BfhlMircApp = bfhlMircApp