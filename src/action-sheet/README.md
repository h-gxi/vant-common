# ActionSheet 动作面板

### 介绍

底部弹起的模态面板，包含与当前情境相关的多个选项。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/quickstart)。

```js
import { createApp } from 'vue';
import { ActionSheet } from 'vant-common';

const app = createApp();
app.use(ActionSheet);
```

## 代码演示

### 基础用法

动作面板通过 actions 属性来定义选项，actions 属性是一个由对象构成的数组，数组中的每个对象配置一列，对象格式见文档下方表格。

```html
<van-cell is-link title="基本用法" @click="showBasicRef.open()" />
<m-action-sheet ref="showBasicRef" :actions="actions" close-on-click-action @select="onSelect" />
```

```js
import { ref } from 'vue';
import { showToast } from 'vant';

export default {
  setup() {
    const showBasicRef = ref(null);
    const actions = [
      { name: '选项一' },
      { name: '选项二' },
      { name: '选项三' },
    ];
    const onSelect = (item, i) => {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      showBasicRef.close();
      showToast(item.name);
    };

    return {
      showBasicRef,
      actions,
      onSelect,
    };
  },
};
```

### 展示图标

使用 actions 的 icon 字段可以为选项设置图标。

```html
<van-cell is-link title="展示图标" @click="showIconRef.open()" />
<m-action-sheet ref="showIconRef" :actions="actions" close-on-click-action @select="onSelect" />
```

```js
import { ref } from 'vue';
import { showToast } from 'vant';

export default {
  setup() {
    const showIconRef = ref(null);
    const actions = [
      { name: '选项一', icon: 'cart-o' },
      { name: '选项二', icon: 'shop-o' },
      { name: '选项三', icon: 'star-o' },
    ];
    const onSelect = (item, i) => {
      showIconRef.close();
      showToast(item.name);
    };

    return {
      showIconRef,
      actions,
      onSelect,
    };
  },
};
```

### 展示标题栏

设置 title 属性后，显示标题栏，left-icon 属性自定义标题栏左侧图标，header-right自定义插槽修改右侧图标。

```html
<van-cell is-link title="展示取消按钮" @click="showHeaderRef.open()" />
<m-action-sheet ref="showHeaderRef" title="我的标题" :actions="actions" close-on-click-action cancel-text="取消" @cancel="onCancel" />
```

```js
import { ref } from 'vue';
import { showToast } from 'vant';

export default {
  setup() {
    const showHeaderRef = ref(null);
    const actions = [
      { name: '选项一' },
      { name: '选项二' },
      { name: '选项三' },
    ];
    const onCancel = () => showToast('取消');

    return {
      showHeaderRef,
      actions,
      onCancel
    };
  },
};
```

### 展示取消按钮

设置 cancel-text 属性后，会在底部展示取消按钮，点击后关闭当前面板并触发 cancel 事件。

```html
<van-cell is-link title="展示取消按钮" @click="showCancelRef.open()" />
<m-action-sheet ref="showCancelRef" :actions="actions" close-on-click-action cancel-text="取消" @select="onCancel" />
```

```js
import { ref } from 'vue';
import { showToast } from 'vant';

export default {
  setup() {
    const showBasicRef = ref(null);
    const actions = [
      { name: '选项一' },
      { name: '选项二' },
      { name: '选项三' },
    ];
    const onCancel = () => showToast('取消');

    return {
      showBasicRef,
      actions,
      onCancel
    };
  },
};
```

## API

### Props

| 参数   | 说明     | 类型               | 默认值 |
| ------ | -------- | ------------------ | ------ |
| actions | 面板选项列表 | ActionSheetAction[] |    `[]`    |
| title | 显示标题 | string |    -  
| cancel-text | 取消按钮文字 | string |    -    |
| round | 是否显示圆角 | boolean |    `false`    |
| left-icon | 左上角按钮图标 | string |    `arrow-left`  |
| close-on-click-action | 是否在点击选项后关闭 | boolean |    `false`    |

### Events

| 事件名    | 说明                 | 回调参数             |
| --------- | -------------------- | -------------------- |
| select | 点击选项时触发 | action: ActionSheetAction, index: number |
| cancel | 点击取消按钮时触发 | - |

### 方法

通过 ref 可以获取到 ActionSheet 实例并调用实例方法，详见[组件实例方法](#/zh-CN/advanced-usage#zu-jian-shi-li-fang-fa)。

| 方法名 | 说明     | 参数 | 返回值 |
| ------ | -------- | ---- | ------ |
| open | 显示 | -    | -      |
| close | 关闭 | -    | -      |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --m-action-sheet-max-height | _80%_ | - |
| --m-action-sheet-item-text-color | _#000_ | - |
| --m-action-sheet-item-padding | _16px_ | - |
| --m-action-sheet-item-font-size | _16px_ | - |
| --m-action-sheet-item-background | _#fff_ | - |
| --m-action-sheet-item-after-color | _#F3F3F3_ | - |
| --m-action-sheet-item-active-color | _#E8E8E8_ | - |
| --m-action-sheet-item-line-height | _52px_ | - |
| --m-action-sheet-cancel-text-color | _#000_ | - |
| --m-action-sheet-cancel-padding-top | _10px_ | - |
| --m-action-sheet-cancel-padding-color | _#F3F3F3_ | - |
| --m-action-sheet-cancel-padding-bottom | _15px_ | - |
