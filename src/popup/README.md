# Popup 弹出层

### 介绍

弹出层容器，用于底部弹窗操作使用，该组件为基础组件，可以自行扩展使用。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/quickstart)。

```js
import { createApp } from 'vue';
import { Popup } from 'vant-common';

const app = createApp();
app.use(Popup);
```

## 代码演示

### 基础用法

弹出层组件中包含了header标题栏和底部取消确认按钮，通过默认插槽展示内容区域。

```html
<van-cell is-link title="基本用法" @click="showBasicRef.open()" />
<m-popup ref="showBasicRef" title="标题" @confirm="onConfirm" />
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const showBasicRef = ref(null);

    const onConfirm = (checked) => {
      console.log('checked :>> ', checked);
      showBasicRef.value.close();
    };

    return {
      showBasicRef,
      onConfirm,
    };
  },
};
```

## API

### Props

| 参数  | 说明         | 类型    | 默认值 |
| ----- | ------------ | ------- | ------ |
| title | 标题         | string  | -      |
| round | 是否显示圆角 | boolean | `true` |
| footer | 是否显示底部按钮 | boolean | `true` |
| left-icon | 左上角按钮 可选值 arrow-left \| cross | string | `arrow-left` |
| cancel-text | 底部左侧按钮 | string | `取消` |
| cancel-func | 底部左侧按钮回调函数 | Function | - |
| confirm-text | 底部右侧按钮 | string | `确认` |
| cancel-func | 底部右侧按钮回调函数 | Function | - |
| auto-close | 是否调用回调函数后自动关闭 | boolean | `false` |

### Events

| 事件名  | 说明               | 回调参数     |
| ------- | ------------------ | ------------ |

### 方法

通过 ref 可以获取到 Popup 实例并调用实例方法，详见[组件实例方法](#/zh-CN/advanced-usage#zu-jian-shi-li-fang-fa)。

| 方法名 | 说明 | 参数 | 返回值 |
| ------ | ---- | ---- | ------ |
| open   | 显示 | -    | -      |
| close  | 关闭 | -    | -      |

### Slots

| 名称  | 说明               |
| ----- | ------------------ |
| default  | 自定义默认内容 |
| header-right | 自定义标题栏右侧图标区域         |
| footer  | 自定义底部按钮区域 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                                    | 默认值              | 描述 |
| --------------------------------------- | ------------------- | ---- |
| --m-popup-background-color              | _#ffffff_           | -    |
| --m-popup-header-color                  | _#000000_           | -    |
| --m-popup-header-font-size              | _18px_              | -    |
| --m-popup-header-font-weight            | _500_               | -    |
| --m-popup-header-padding-top            | _20px_              | -    |
| --m-popup-header-padding-bottom         | _16px_              | -    |
| --m-popup-header-background-color       | _#F1F8FF_           | -    |
| --m-popup-content-min-height            | _168px_             | -    |
| --m-popup-content-max-height            | _480px_             | -    |
| --m-popup-content-padding               | _0 16px_            | -    |
| --m-popup-footer-padding                | _16px_              | -    |
| --m-popup-footer-btn-radius             | _21px_              | -    |
| --m-popup-footer-btn-border             | _1px solid #9b9b9b_ | -    |
| --m-popup-footer-btn-font-size          | _16px_              | -    |
| --m-popup-footer-btn-font-weight        | _500_               | -    |
| --m-popup-footer-btn-line-height        | _22px_              | -    |
| --m-popup-footer-btn-height             | _42px_              | -    |
| --m-popup-footer-btn-confirm-background | _var(--van-primary-color)_           | -    |
| --m-popup-footer-btn-confirm-color      | _#ffffff_           | -    |
| --m-popup-footer-btn-cancel-color       | _#9B9B9B_           | -    |
