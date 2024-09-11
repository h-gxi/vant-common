# FormCheckbox 表单多选项

### 介绍

表单多选项组件，一般配合m-popup弹窗组件内使用，也支持单独使用组件。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/quickstart)。

```js
import { createApp } from 'vue';
import { FormCheckbox } from 'vant-common';

const app = createApp();
app.use(FormCheckbox);
```

## 代码演示

### 基础用法

组件直接使用时，需要用到 change 事件来监听选项值改变。

```html
<div style="padding: 0 16px; background: #fff">
  <m-form-checkbox
    toolbar-title="从下面选择计算等级的科目"
    :columns="columns"
    @change="onChange"
  />
</div>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const onChange = (checked) => {
      console.log('checked :>> ', checked);
    };

    return {
      onChange,
    };
  },
};
```

### 配合弹窗组件使用

通过 columns 属性来定义选项，columns 属性是一个由对象构成的数组，每个对象中必须包含label和value属性。

```html
<van-cell is-link title="底部弹窗" @click="showBasicRef.open()" />
<m-popup ref="showBasicRef" title="选择学科" @confirm="onConfirm">
  <m-form-checkbox
    toolbar-title="从下面选择录入成绩的科目"
    :columns="columns"
    :default-value="['1', '2']"
  />
</m-popup>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const showBasicRef = ref(null);
    const columns = [
      {
        label: '语文',
        value: '1',
      },
      {
        label: '数学',
        value: '2',
      },
      {
        label: '英语',
        value: '3',
      },
      {
        label: '物理',
        value: '4',
      },
      {
        label: '化学',
        value: '5',
      },
      {
        label: '其他',
        value: '6',
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

| 参数          | 说明                         | 类型                     | 默认值 |
| ------------- | ---------------------------- | ------------------------ | ------ |
| toolbar-title | 顶部工具栏标题               | string                   | -      |
| toolbar       | 开启顶部工具栏，支持全选功能 | boolean                  | `true` |
| columns       | 选项列表数据                 | PropType<CheckboxItem[]> | `[]`   |
| default-value | 默认选中项                   | PropType<string[]>       | `[]`   |

### Events

| 事件名 | 说明                                     | 回调参数     |
| ------ | ---------------------------------------- | ------------ |
| change | 修改已选项时触发，单独使用组件时需要用到 | checked: any |

### 方法

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                                            | 默认值    | 描述 |
| ----------------------------------------------- | --------- | ---- |
| --m-form-checkbox-content-toolbar-padding       | _16px 0_  | -    |
| --m-form-checkbox-content-toolbar-margin-bottom | _16px_    | -    |
| --m-form-checkbox-content-icon-size             | _16px_    | -    |
| --m-form-checkbox-content-item-background       | _#f1f2f6_ | -    |
| --m-form-checkbox-content-item-color            | _#999999_ | -    |
| --m-form-checkbox-content-item-font-size        | _14px_    | -    |
