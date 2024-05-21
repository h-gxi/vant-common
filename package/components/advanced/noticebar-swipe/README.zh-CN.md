# NoticebarSwipe 滚动通知栏

### 介绍

通知栏自动轮播内容，Noticebar+Swipe组件完成。

## 代码演示

### 基础用法

通过 `v-model` 属性绑定通知栏的内容，或通过 `value` 属性设置通知栏的内容。

```html
<m-noticebar-swipe v-model="noticeBars" @click="onClickNotice" />
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
<m-noticebar-swipe v-model="noticeBars" color="#1989fa" background="#ecf9ff" left-icon="info-o" @click="onClickNotice" />
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
| delay | 动画延迟时间 (s) | _number \| string_ | `1` |
| speed | 滚动速率 (px/s) | _number \| string_ | `60` |
| scrollable | 是否在长度溢出时滚动播放 | _boolean_ | `false` |
| autoplay | 自动轮播间隔，单位为 ms | _number \| string_ | `4000` |

### Events

| 事件名 | 说明                         | 回调参数            |
| ------ | ---------------------------- | ------------------- |
| click  | 点击通知栏时触发             | _event: MouseEvent_ |
| remove  | 关闭通知栏时触发            | _event: MouseEvent_ |

### 类型定义

组件导出以下类型定义：

```ts
import type { noticebarSwipeProps } from 'vant-common';
```
