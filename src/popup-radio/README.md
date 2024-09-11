# PopupRadio 弹出层单选项

### 介绍

弹出层单选项，基于Popup组件扩展的自定义组件。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/quickstart)。

```js
import { createApp } from 'vue';
import { PopupRadio } from 'vant-common';

const app = createApp();
app.use(PopupRadio);
```

## 代码演示

### 基础用法

弹出层单选项通过 columns 属性来定义选项，columns 属性是一个由对象构成的数组，每个对象中必须包含label和value属性。

```html
<van-cell is-link title="基本用法" @click="showBasicRef.open()" />
<m-popup-radio
  ref="showBasicRef"
  title="标题"
  :columns="columns"
  default-value="1"
  @confirm="onConfirm"
/>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const showBasicRef = ref(null);
    const columns = [
      {
        label: '幼儿园/一年级/1班',
        value: '1',
      },
      {
        label: '幼儿园/一年级/2班',
        value: '2',
      },
      {
        label: '幼儿园/一年级/3班',
        value: '3',
      },
    ];
    const onConfirm = (checked) => {
      console.log('checked :>> ', checked);
      showBasicRef.value.close();
    };

    return {
      showBasicRef,
      columns,
      onConfirm,
    };
  },
};
```

## API

### Props

| 参数         | 说明         | 类型                  | 默认值                                                                 |
| ------------ | ------------ | --------------------- | ---------------------------------------------------------------------- |
| title        | 标题         | string                | -                                                                      |
| round        | 是否显示圆角 | boolean               | `true`                                                                 |
| columns      | 选项列表数据 | PropType<RadioItem[]> | `[]`                                                                   |
| defaultValue | 默认选中项   | string                | -                                                                      |
| icon         | 图标         | string                | `https://unpkg.com/vant-common@0.2.0-beta.14/assets/mobile-school.png` |

### Events

| 事件名  | 说明               | 回调参数     |
| ------- | ------------------ | ------------ |
| confirm | 点击确认按钮时触发 | checked: any |
| cancel  | 点击取消按钮时触发 | -            |

### 方法

通过 ref 可以获取到 PopupRadio 实例并调用实例方法，详见[组件实例方法](#/zh-CN/advanced-usage#zu-jian-shi-li-fang-fa)。

| 方法名 | 说明 | 参数 | 返回值 |
| ------ | ---- | ---- | ------ |
| open   | 显示 | -    | -      |
| close  | 关闭 | -    | -      |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                                   | 默认值     | 描述 |
| -------------------------------------- | ---------- | ---- |
| --m-popup-radio-row-padding            | _16px 4px_ | -    |
| --m-popup-radio-row-icon-size          | _24px_     | -    |
| --m-popup-radio-row-icon-margin-right  | _8px_      | -    |
| --m-popup-radio-row-label-font-size    | _16px_     | -    |
| --m-popup-radio-row-label-font-weight  | _400_      | -    |
| --m-popup-radio-row-label-color        | _#999999_  | -    |
| --m-popup-radio-row-label-active-color | _#2f54eb_  | -    |
