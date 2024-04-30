# vant-common

### 介绍

基于vant3封装的自定义组件库，适用于H5开发迭代，降低开发维护成本。

## 使用说明

1. 安装依赖
```bash
npm install vant-common --save
```
2. 引用组件方式
```bash
// Export VantCommon components by default
import vantCommon from 'vant-common'

// 全部注册Vant组件
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)
// ...
app.use(vantCommon) 
app.use(Vant)
app.use(Lazyload, {
  lazyComponent: true
})
app.mount('#app')
```