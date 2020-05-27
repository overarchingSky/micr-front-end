import urlUtils from 'url'
import MircApp from './index'

/**
 * 矫正url host
 * @param App 
 * @param url 
 */
export function correctUrl(App: MircApp,url: string){
    if(App && App.moduleName !== App.currentModuleName){
        const parsedUrl = urlUtils.parse(url)
        const parsedUrlFixed = urlUtils.parse(App.modules[App.currentModuleName].host)
        parsedUrl.host = parsedUrlFixed.host
        parsedUrl.protocol = parsedUrlFixed.protocol
        console.log('parsedUrl',parsedUrl)
        return urlUtils.format(parsedUrl)
    }
    return url
}

export function hookImg(App: MircApp) {
    const createElement = document.createElement
    document.createElement = function(...args){
        console.log('创建元素',args)
        const tag = args[0]
        //@ts-ignore
        const el = createElement.call(this, ...args)
        if(tag === 'img'){
            // 默认失败，强制触发onerror
            el.src = "data:image/png," + Math.random()
            el.onerror = function(){
                console.log('err image',this.src)
                const url = correctUrl(App, this.src)
                console.log('new url',url)
                this.src = url
            }
        }
        
        return el
    }
}

export function hookLink(App: MircApp) {
    const property = Object.getOwnPropertyDescriptor(HTMLLinkElement.prototype, 'href') as PropertyDescriptor 
    const nativeSet = property.set;

    function customiseSrcSet(url) {
        url = correctUrl(App, url)
        console.log('hookLink',url)
        // @ts-ignore 
        nativeSet.call(this, url);
    }
    Object.defineProperty(HTMLLinkElement.prototype, 'href', {
      set: customiseSrcSet,
    });
}

export function hookScript(App: MircApp) {
    const property = Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'src') as PropertyDescriptor 
    const nativeSet = property.set;

    function customiseSrcSet(url) {
        url = correctUrl(App, url)
        console.log('hookScript',url)
        // @ts-ignore 
        nativeSet.call(this, url);
    }
    Object.defineProperty(HTMLScriptElement.prototype, 'src', {
      set: customiseSrcSet,
    });
}

export function proxyFetch(App: MircApp){
    const fet = Object.getOwnPropertyDescriptor(window, 'fetch')
    Object.defineProperty(window, 'fetch', {
        value: function (...args) {
            console.log('args',args)
          // do something
          return (fet as PropertyDescriptor).value.apply(this, args)
        }
    })
}

export function proxyXMLHttpRequest(App: MircApp){
     // @ts-ignore
     XMLHttpRequest.prototype.nativeOpen = XMLHttpRequest.prototype.open
     function customizeOpen(method: string, url: string): void
     function customizeOpen(method: string, url: string, async?: boolean, username?: string | null | undefined, password?: string | null | undefined): void {
         console.log('moduleName',App.moduleName)
         console.log('currentModuleName',App.currentModuleName)
         url = correctUrl(App, url)
         //@ts-ignore
         this.nativeOpen( method, url, async as boolean, username, password);
     }
     XMLHttpRequest.prototype.open = customizeOpen
}