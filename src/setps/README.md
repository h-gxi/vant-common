# Steps 步骤条

### 介绍

步骤条常用于表单分步完成时使用，提供横向和纵向两种布局方式。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

```js
import { createApp } from 'vue';
import { Setps, SetpsItem } from 'vant-common';

const app = createApp();
app.use(Setps);
app.use(SetpsItem);
```

## 代码演示

### 基础用法

`active` 属性表示当前步骤的索引，从 0 起计。

```html
<m-setps :active="active">
  <m-setps-item title="上传成绩单" />
  <m-setps-item title="成绩单设置" />
  <m-setps-item title="预览成绩单" />
</m-setps>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const active = ref(1);
    return { active };
  },
};
```

### 自定义样式

可以通过 `active-icon` 和 `active-color` 属性设置激活状态下的图标和颜色。

```html
<m-setps :active="0" active-icon="success" active-color="#ed6a0c">
  <m-setps-item title="上传成绩单" />
  <m-setps-item title="成绩单设置" />
  <m-setps-item title="预览成绩单" />
</m-setps>
```

### 竖向步骤条

可以通过设置 `direction` 属性来改变步骤条的显示方向。

```html
<m-setps :active="0" direction="vertical">
  <m-setps-item>
    <h3>【城市】物流状态1</h3>
    <p>2016-07-12 12:40</p>
  </m-setps-item>
  <vm-setps-item>
    <h3>【城市】物流状态2</h3>
    <p>2016-07-11 10:00</p>
  </vm-setps-item>
  <m-setps-item>
    <h3>快件已发货</h3>
    <p>2016-07-10 09:30</p>
  </m-setps-item>
</m-setps>
```

## API

### Steps Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| active | 当前步骤对应的索引值 | _number \| string_ | `0` |
| direction | 步骤条方向，可选值为 `vertical` | _string_ | `horizontal` |
| active-icon | 激活状态的图标 | _string_ | - |
| inactive-icon | 未激活状态图标 | _string_ | - |
| active-color | 激活状态颜色 | _string_ | `#3c9cff` |
| inactive-color | 未激活状态颜色 | _string_ | `#969799` |
| icon-size | 图标大小 | _number_ | `17` |

### StepItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题文字 | _string_ | - |
| error | 是当前步骤是否处于失败状态 | _boolean_ | `false` |

### Steps Events

| 事件名     | 说明                       | 回调参数        |
| ---------- | -------------------------- | --------------- |
| click-step | 点击步骤的标题或图标时触发 | _index: number_ |
