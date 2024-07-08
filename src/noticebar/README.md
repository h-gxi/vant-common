# Noticebar 滚动通知栏

### 介绍

通知栏自动轮播内容，Noticebar + Swipe组件封装，配合Header组件使用，隐藏显示重新计算Header高度。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/quickstart)。

```js
import { createApp } from 'vue';
import { Noticebar } from 'vant-common';

const app = createApp();
app.use(Noticebar);
```

## 代码演示

### 基础用法

通过 `v-model` 属性绑定通知栏的内容，或通过 `value` 属性设置通知栏的内容。

```html
<m-noticebar v-model="noticeBars" @click="onClickNotice" />
```

```js
export default {
  setup() {
    const noticeBars = [
      {
        title: '“通知公告”功能介绍及使用案例',
        html: '<img  src=\"images/notice-guide.png\" style=\"width: 100%;\">'
      }
    ]
    const onClickNotice = (index) => {
      router.push({ name: 'noticebar', params: { id: index }})
    }
    return { noticeBars, onClickNotice };
  },
};
```

### 自定义样式

通过 `color` 属性设置文本颜色，通过 `background` 属性设置背景色。

```html
<m-noticebar v-model="noticeBars2" color="#2f54eb" background="#ecf9ff" left-icon="volume-o" @click="onClickNotice" />
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 绑定通知栏的内容 `[{title,html}]` | _array_ | - |
| value | 显示内容集合，v-model/value 二选一，使用value时触发@remove事件 | _array_ | - |
| color | 通知文本颜色 | _string_ | `#1989fa` |
| background | 滚动条背景 | _string_ | `#ecf9ff` |
| left-icon | 左侧图标名称或图片链接，等同于 Icon 组件的 [name 属性](#/zh-CN/icon#props) | _string_ | `volume-o` |
| scrollable | 是否在长度溢出时滚动播放 | _boolean_ | `false` |
| autoplay | 自动轮播间隔，单位为 ms | _number \| string_ | `4000` |

### Events

| 事件名 | 说明                         | 回调参数            |
| ------ | ---------------------------- | ------------------- |
| click  | 点击通知栏时触发             | _event: MouseEvent_ |
| remove  | 关闭通知栏时触发            | _event: MouseEvent_ |
