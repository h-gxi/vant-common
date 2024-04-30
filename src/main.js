import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vantCommon from '@/install'

// 全部注册Vant组件
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)
app.use(router)
app.use(vantCommon)
app.use(Vant)
app.use(Lazyload, {
  lazyComponent: true
})
app.mount('#app')
