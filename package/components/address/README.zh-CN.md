# Address 通讯录

### 介绍

该组件使用场景为选择发送对象时，多层级组织架构切换显示，可选择部门或人员。


## 代码演示

### 基础用法

新增通讯录页面中使用组件。
`m-address` 组织架构列表显示， `m-address-select` 已选择部门或人员显示，组件中已包含标题导航栏显示，通过 `title` 属性设置标题。

```html
<m-address
  v-if="$route.query.page!=='select'"
  ref="mAddressRef"
  :title="props.title"
  :hide-select="props.hideSelect"
  :multiple="props.multiple"
  :leaf-icon="props.leafIcon || 'images/mobile-init-image.png'"
  :empty-msg="props.emptyMsg || '暂无成员'"
  :filter-msg="props.filterMsg || '请输入部门名称/用户姓名搜索'"
  :suffix-text="props.suffixText || '人'"
  @on-save="onSave"
/>
<m-address-select
  v-if="$route.query.page==='select'"
  :title="props.selectTile"
  :leaf-icon="props.leafIcon || 'images/mobile-init-image.png'"
  :empty-msg="props.emptyMsg || '暂无成员'"
/>
```

```js
<script setup>
import { ref, computed, watch, defineProps, nextTick } from 'vue'
import { usePageStore } from '@/store'
const { api, router } = $xzx
const pageStore = usePageStore()

defineProps({
  reload: {
    type: String,
    default: ''
  }
})

const props = computed(() => pageStore.props || {
  selectKey: 'selectedValue' // 表单中绑定字段名
})

const mAddressRef = ref(null)
watch(() => pageStore.formParms[props.value.selectKey], (val) => {
  let checkedKeys = []
  if (Array.isArray(val)) {
    checkedKeys = [...val]
  } else {
    checkedKeys = [val]
  }
  const initOptions = {
    rootTitle: props.value.addressRootTitle || '全部',
    actionFunc: props.value.addressActionFunc,
    actionParms: props.value.addressActionParms,
    getImageFunc: api.imageManage.getImage,
    data: null,
    defaultCheckedKeys: checkedKeys
  }
  nextTick(() => {
    if (mAddressRef.value) {
      console.log('address watch :>> ', initOptions)
      mAddressRef.value.reload(initOptions)
    }
  })
}, { immediate: true })

const onSave = (data) => {
  if (Array.isArray(data)) {
    const ids = data.map(m => m.id)
    if (pageStore.formParms[props.value.selectKey] !== undefined) {
      pageStore.formParms[props.value.selectKey] = [...ids]
    }
    props.value.selectedNodes = data // 传递选中节点数据
  } else {
    if (pageStore.formParms[props.value.selectKey] !== undefined) {
      pageStore.formParms[props.value.selectKey] = data?.id
    }
    props.value.selectedNode = data // 传递选中节点数据
  }
  router.back()
}
</script>
```

## API

### Address Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | `m-nav-bar` 导航栏标题 | _string_ | - |
| hideSelect | 隐藏左下角已选择区域 | _boolean_ | `false` |
| multiple | 是否多选 | _boolean_ | `false` |
| leafIcon | 叶子节点图标 | _string_ | `images/mobile-init-image.png` |
| emptyMsg | 列表数据空文案 | _string_ | `暂无成员` |
| filterMsg | 搜索列表空文案 | _string_ | `请输入部门名称/用户姓名搜索` |
| suffixText | 已选择对象后缀 | _string_ | `人` |

### Address Events

| 事件名     | 说明                       | 回调参数        |
| ---------- | -------------------------- | --------------- |
| on-save | 保存已修改时触发，开启多选时返回数组对象 | _(data: Array\|Object) => void_ |

