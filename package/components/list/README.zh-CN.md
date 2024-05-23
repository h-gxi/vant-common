# List 列表

### 介绍

滚动加载，当列表即将滚动到底部时，会触发事件并加载更多列表项，下拉刷新列表。

## 代码演示

### 基础用法

`m-list` 组件需要配合 `m-list-cell` 组件使用，需要设置 `query-method` 属性获取数据，带有Query参数查询需要设置 `query-model` 属性。

```html
<m-list
  class="m-list"
  :offset="150"
  :query-method="queryMethod"
  :query-model="queryModel"
  image="images/mobile-nodata.png"
  @click="onClick"
>
  <m-list-cell class="m-item">
    <template #default="{item,index}">
      <div v-show="index != 0" class="gray-divider" />
      <van-cell :border="false">
        <template #title>
          <div class="cell-title">
            {{ item.name }}
          </div>
        </template>
        <template #value>
          <div class="cell-value">
            {{ item.value }}
          </div>
        </template>
      </van-cell>
    </template>
  </m-list-cell>
</m-list>
```

```js
import { ref, computed } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const searchKey = ref('') // 远程搜索关键字

    const queryMethod = (params) => axios.get('/api/homework/page-list', params)

    /** 参数值改变时自动刷新列表数据 */
    const queryModel = computed(() => {
      const data = {}
      if (searchKey.value) {
        data['title'] = searchKey.value
      }
      return data
    })

    const onClick = (item) => {
      router.push({ name: 'detail', params: { id: item.id }})
    };

    return {
      queryMethod,
      onClick
    };
  },
};
```

### 格式化数据

格式化数据一般用于前端修改返回结果使用，设置 `formatter` 属性，`return` 返回格式化后数据列表。

```html
<m-list
  class="m-list"
  :query-method="queryMethod"
  :formatter="formatter"
  @click="onClick"
>
  <!-- ... -->
</m-list>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const formatter = (data) => {
      const res = data.map(item => {
        item['date'] = item.publishTime.split(' ')[0]
        return item
      })
      return res
    }

    return {
      formatter
    };
  },
};
```

### 过滤数据

过滤数据一般用于前端过滤使用，设置 `filter` 属性，`return` 返回过滤后数据列表。

```html
<m-list
  class="m-list"
  :query-method="queryMethod"
  :filter="filter"
  @click="onClick"
>
  <!-- ... -->
</m-list>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const searchKey = ref('') // 搜索关键字

    /** 前端过滤只能在页面已加载列表数据中过滤，后台数据过滤清使用远程过滤方式 */
    const filter = (data) => {
      if (searchKey.value) {
        return data.filter(m => m.name.indexOf(searchKey.value) !== -1)
      }
      return data
    }

    return {
      filter
    };
  },
};
```

### 分组数据

分组数据，设置 `group-by` 属性进行分组显示，每分组第一条记录包含`group`属性。

```html
<m-list
  class="m-list"
  :offset="150"
  :query-method="queryMethod"
  :query-model="queryModel"
  :formatter="formatter"
  :group-by="item=>item.date"
  @click="onClick"
>
  <m-list-cell class="m-item">
    <template #default="{item,group}">
      <div v-if="group" class="date" @click.stop="">{{ group }}</div>
      <van-cell-group inset class="cell-group">
        <van-cell :border="false" style="height: 100%">
          <template #title>
            <div class="cell-title">
              <span>{{ item.title }}</span>
            </div>
            <div class="cell-content">
              <span>{{ item.content }}</span>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </template>
  </m-list-cell>
</m-list>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const formatter = (data) => {
      const res = data.map(item => {
        item['date'] = item.publishTime.split(' ')[0]
        return item
      })
      return res
    }

    return {
      formatter
    };
  },
};
```


## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| offset | 滚动条与底部距离小于 offset 时触发 `query-method` 回调函数 | _number \| string_ | `250` |
| loading-text | 加载过程中的提示文案 | _string_ | `加载中...` |
| direction | 滚动触发加载的方向，可选值为 `up` | _string_ | `down` |
| image | 暂无数据时显示图片 | _string_ | - |
| image-size | 图片大小 | _number_ | `200` |
| page-size | 分页大小，每次加载数据条数 | _number_ | `10` |
| query-method | 加载数据时触发回调函数，返回 Promise | _(action: Object) => Promise\<Array\>_ | - |
| query-model | `query-method` 查询参数 | _Object_ | - |
| formatter | 格式化数据 | _(value) => any_ | - |
| filter | 过滤数据，前端过滤 | _(value) => any_ | - |
| group-by | 分组字段 | _(action: Object) => string \| string_ | - |

### Events

| 事件名 | 说明                               | 回调参数 |
| ------ | ---------------------------------- | -------- |
| click   | 点击 `m-list-cell` 组件时触发 | _item: object_        |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/config-provider)。

| 名称                         | 默认值                    | 描述 |
| ---------------------------- | ------------------------- | ---- |
| --van-list-text-color        | _var(--van-text-color-2)_ | -    |
| --van-list-text-font-size    | _var(--van-font-size-md)_ | -    |
| --van-list-text-line-height  | _50px_                    | -    |
| --van-list-loading-icon-size | _16px_                    | -    |
