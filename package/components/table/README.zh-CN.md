# Table 表格

### 介绍

表格组件，支持排序、固定列，横向滑动查看。


## 代码演示

### 基础用法

基础的表格展示用法。
`m-table` 绑定 `data` 对象数组后，在 `m-table-column` 中用 `prop` 属性来对应对象中的键名即可填入数据，用 `label` 属性来定义表格的列名。 可以使用 `min-width` 属性来定义最小列宽。

```html
<m-table :data="tableData">
  <m-table-column prop="date" label="Date" :min-width="120" />
  <m-table-column prop="name" label="Name" :min-width="120" />
  <m-table-column prop="address" label="Address" :min-width="180" />
</m-table>
```

```js
export default {
  setup() {
    const tableData = [
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }
    ]
    return { tableData };
  },
};
```

### 固定列

横向内容过多时，可选择固定列中使用 `fixed` 属性，如果为 `true`, 列将被左侧固定，超出屏幕外内容可横向滑动查看。

```html
<m-table :data="tableData">
  <m-table-column
    v-for="(c,i) in tableColumns"
    :key="i"
    :prop="c.prop"
    :label="c.label"
    :sortable="c.sortable"
    :min-width="c.width"
    :fixed="c.fixed"
  />
</m-table>
```

```js
export default {
  setup() {
    const tableData = [
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }
    ]
    const tableColumns = [
      { prop: 'date', label: 'Date', width: 80, align: 'center', fixed: true },
      { prop: 'name', label: 'Name', width: 80, align: 'center', fixed: true },
      { prop: 'address', label: 'Address', width: 100, align: 'center' }
    ]

    return { tableData, tableColumns };
  },
};
```


### 排序

对表格进行排序，支持前端排序或远程排序。
在列中设置 `sortable` 属性即可实现以该列为基准的排序，如果需要后端排序，需将 `sortable` 设置为 `custom` 同时在 `Table` 上监听 `sort-change` 事件。

```html
<m-table :data="tableData" @sort-change="onSortChange">
  <m-table-column prop="date" label="Date" :min-width="120" :sortable="true" />
  <m-table-column prop="name" label="Name" :min-width="120" sortable="custom" />
  <m-table-column prop="address" label="Address" :min-width="180" />
</m-table>
```

```js
export default {
  setup() {
    const tableData = [
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }
    ]
    const onSortChange = (data)=> {
      const { prop, order } = data
      // 向后台请求排序后数据
    }
    return { tableData, onSortChange };
  },
};
```

## API

### Table Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 表数据 | _Array_ | - |


### TableColumn Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prop | 字段名称 对应列内容的字段名， 也可以使用 property属性 | _string_ | - |
| label | 显示的标题 | _string_ | - |
| min-width | 对应列的最小宽度， 对应列的最小宽度 | _number_ | `80` |
| fixed | 列是否固定在左侧 | _boolean_ | `false` |
| sortable | 对应列是否可以排序， 如果设置为 `custom`，则代表用户希望远程排序，需要监听 `Table` 的 `sort-change` 事件 | _boolean \| string_ | - |
| align | 对齐方式 `left` \| `center` | _string_ | `left` |
| formatter | 用来格式化内容 | _(row: any, column: any, cellValue: any, index: number) => VNode \| string_ | - |

### Table Events

| 事件名     | 说明                       | 回调参数        |
| ---------- | -------------------------- | --------------- |
| sort-change | 当表格的排序条件发生变化的时候会触发该事件 | _(data: {prop: string, order: any }) => void_ |

### 类型定义

组件导出以下类型定义：

```ts
import type { TableProps, TableColumnProps } from 'vant-common';
```
