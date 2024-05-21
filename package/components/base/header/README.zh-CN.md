# Header 头部

### 介绍

头部组件用于固定在页面顶部显示，自动计算Header高度。

## 代码演示

### 基础用法

头部自动预留header等高区域，下面内容无需padding-top。

```html
<m-header>
  <m-nav-bar title="标题" />
  <van-search placeholder="搜索" />
</m-header>

<div class="list"></div>
```

### 指定高度

除了特殊场景需要，无需指定高度，内容区域高度自动计算。

```html
<m-header :height='46'>
  <m-nav-bar title="标题" />
  <van-search placeholder="搜索" />
</m-header>
```

### 重置高度

子组件中需要改变header高度时，通过resize重置高度。

```js
import { defineComponent } from 'vue'
import { useParent } from '@vant/use'
import { HEADER_KEY } from 'vant-common'

export default defineComponent({
  setup(props) {
    const { parent, index } = useParent(HEADER_KEY)

    const onClose = () => {
      // 刷新header高度
        parent?.resize()
    }

    return {
      onClose
    }
  }
})
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| height | 指定高度 | _number \| string_ |   |


### Events

| 事件名      | 说明               | 回调参数            |
| ----------- | ------------------ | ------------------- |
| on-resize  | 调用resize方法后触发 | offsetHeight: Number |

### 类型定义

组件导出以下类型定义：

```ts
import type { HeaderProps } from 'vant-common';
```
