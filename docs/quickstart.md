# 快速上手

### 安装

```bash
# 通过 npm
npm i vant-common

# 通过 yarn
yarn add vant-common

# 通过 pnpm
pnpm add vant-common

# 通过 bun
bun add vant-common
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
