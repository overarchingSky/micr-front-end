import Vue, { VNode } from 'vue'
import { RouteConfig } from 'vue-router';


declare module 'vue-router' {
    interface RouteConfig {
        /**
         * 是否是远程路由
         */
        isRemoteRoute?: boolean;
        /**
         * 是否已安装
         */
        installed?: boolean;
    }
}

interface BfhlMircApp {
    /**
     * 远程路由
     */
    remoteRoutes: RouteConfig[];
}

declare global {
    interface Window { vm: any; $BfhlMircApp: BfhlMircApp}
}