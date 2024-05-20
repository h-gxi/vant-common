# NavBar 导航栏

### 介绍

为页面提供导航功能，常用于页面顶部，微信小程序端中默认隐藏导航栏显示。

## 代码演示

### 基础用法

通过 `title` 属性设置导航栏标题。

```html
<m-nav-bar title="标题" />
```

### 返回上级

在导航栏实现返回上级功能。

```html
<m-nav-bar title="作业详情" @click-left="$router.back()" />
```

```html
<m-nav-bar title="作业频道" :click-left="configStore.onBackHome" />
```

```js
import { defineStore } from 'pinia'
import { router } from '@/router'
export const useConfigStore = defineStore('app.config', {
  state: () => {
    return {
      /** 返回APP首页地址 */
      backHomeUrl: '',
      /** 慧新E校学校ID */
      synjonesSchoolId: ''
    }
  },
  actions: {
    onBackHome() {
      if (this.backHomeUrl) {
        window.location.href = this.backHomeUrl
      } else {
        if (this.synjonesSchoolId) {
          ECampus.backHome()
        } else {
          var jsonStr = '{"primaryKey":"synjones.ecampus.window.pop"}'
          try {
          // Android系统
            window.AndroidFunc.SynJSNative(jsonStr)
          } catch (err) {
            try {
              // iOS系统
              window.webkit.messageHandlers.SynJSNative.postMessage(jsonStr)
            } catch (error) {
              router.back()
            }
          }
        }
      }
      return false // 停止触发@click-left事件
    }
  }
})
```

### 右侧按钮

在导航栏右侧添加可点击的按钮。

```html
<m-nav-bar
  title="标题"
  left-text="返回"
  right-text="按钮"
  left-arrow
  @click-left="onClickLeft"
  @click-right="onClickRight"
/>
```

```js
import { showToast } from 'vant';

export default {
  setup() {
    const onClickLeft = () => history.back();
    const onClickRight = () => showToast('按钮');
    return {
      onClickLeft,
      onClickRight,
    };
  },
};
```

### 使用插槽

可以通过插槽自定义导航栏两侧的内容。

```html
<m-nav-bar title="标题" left-text="返回" left-arrow>
  <template #right>
    <van-icon name="search" size="18" />
  </template>
</m-nav-bar>
```

### 禁用按钮

通过 `left-disabled` 或 `right-disabled` 属性来禁用两侧的按钮。按钮被禁用时透明度降低，且无法点击。

```html
<m-nav-bar
  title="标题"
  left-text="返回"
  right-text="按钮"
  left-arrow
  left-disabled
  right-disabled
/>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| show | 是否显示组件，默认auto微信小程序端隐藏显示 | _boolean \| string_ |`'auto'` |
| title | 标题 | _string_ | `''` |
| left-text | 左侧文案 | _string_ | `''` |
| right-text | 右侧文案 | _string_ | `''` |
| left-arrow | 是否显示左侧箭头 | _boolean_ | `true` |
| border | 是否显示下边框 | _boolean_ | `true` |
| fixed | 是否固定在顶部 | _boolean_ | `false` |
| placeholder | 固定在顶部时，是否在标签位置生成一个等高的占位元素 | _boolean_ | `false` |
| z-index | 导航栏 z-index | _number \| string_ | `99` |
| safe-area-inset-top | 是否开启[顶部安全区适配](#/zh-CN/advanced-usage#di-bu-an-quan-qu-gua-pei) | _boolean_ | `true` |

### Slots

| 名称  | 说明               |
| ----- | ------------------ |
| title | 自定义标题         |
| left  | 自定义左侧区域内容 |
| right | 自定义右侧区域内容 |

### Events

| 事件名      | 说明               | 回调参数            |
| ----------- | ------------------ | ------------------- |
| click-left  | 点击左侧按钮时触发 | _event: MouseEvent_ |
| click-right | 点击右侧按钮时触发 | _event: MouseEvent_ |
