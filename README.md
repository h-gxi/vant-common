# vant-common

### 介绍

基于vant4封装的自定义组件库，适用于H5开发迭代，降低开发维护成本。

[在线预览](https://h-gxi.github.io/vant-common/)

## 使用说明

### 安装依赖

```bash
npm install vant-common --save
```

### 引入组件

```bash
// Export VantCommon components by default
import vantCommon from 'vant-common'
import 'vant-common/lib/index.css'

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
