import Vant, { Lazyload } from 'vant'
import { createPinia } from 'pinia'
import 'vant/lib/index.css';

export const useVant = ()=> {
    if(!window.Vant){
        window.Vant = Vant
        window.app.use(Vant)
        window.app.use(Lazyload, {
            lazyComponent: true
        })
    }
}

export const usePinia = ()=> {
    if(!window.Pinia){
        window.Pinia = true
        window.app.use(createPinia())
    }
}