# Address 通讯录

### 介绍

该组件使用场景为选择发送对象时，多层级组织架构切换显示，可选择部门或人员，选择对象为叶子节点数据，支持单选和多选模式。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/quickstart)。

```js
import { createApp } from 'vue';
import { Address, AddressSelect } from 'vant-common';

const app = createApp();
app.use(Address);
app.use(AddressSelect);
```

## 代码演示

### 基础用法

新增通讯录页面中使用组件。
`m-address` 组织架构列表显示， `m-address-select` 已选择部门或人员显示。

```html
<m-address
  v-if="$route.query.page!=='select'"
  ref="mAddressRef"
  multiple
  @on-save="onSave"
/>
<m-address-select
  v-if="$route.query.page==='select'"
/>
```

```js
<script setup>
import { ref, onMounted } from 'vue'

const mAddressRef = ref(null)

// 绑定数据结构
const data = [
    {
        "id": "3a0481ab-946b-0ac9-2973-2d6e61dd838c",
        "name": "测试数据",
        "type": 0,
        "photo": "",
        "parentId": null,
        "sex": 0,
        "deptId": null,
        "deptName": null,
        "children": [
            {
                "id": "3a0481ab-97a4-5b9f-abb6-a6cee5bcd3d8",
                "name": "1年级",
                "type": 0,
                "photo": "",
                "parentId": "3a0481ab-946b-0ac9-2973-2d6e61dd838c",
                "sex": 0,
                "deptId": null,
                "deptName": null,
                "children": [
                    {
                        "id": "3a0481ab-9846-f5a6-d6b4-ed4972557a15",
                        "name": "1班",
                        "type": 2,
                        "photo": "",
                        "parentId": "3a0481ab-97a4-5b9f-abb6-a6cee5bcd3d8",
                        "sex": 0,
                        "deptId": null,
                        "deptName": null,
                        "children": [
                            {
                                "name": "学生1",
                                "type": 1,
                                "photo": "",
                                "parentId": "3a0481ab-9846-f5a6-d6b4-ed4972557a15",
                                "sex": 0,
                                "deptId": null,
                                "deptName": null,
                                "children": [],
                                "id": "3a0a8c44-1080-d40c-9600-128f7a49d973"
                            },
                            {
                                "name": "学生2",
                                "type": 1,
                                "photo": "",
                                "parentId": "3a0481ab-9846-f5a6-d6b4-ed4972557a15",
                                "sex": 1,
                                "deptId": null,
                                "deptName": null,
                                "children": [],
                                "id": "3a0d2958-f618-5a32-8882-07cdefce2b6e"
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

const getClassAddressSelectList = async ()=> {
  return new Promise((resolve) => {
    resolve(data)
  })
}

const initOptions = {
  rootTitle: '全部',
  actionFunc: getClassAddressSelectList, // 通讯录组件接口地址
  actionParms: {}, // 通讯录组件接口参数
  getImageFunc: null,
  data: null,
  defaultCheckedKeys: []
}

onMounted(() => {
  if (mAddressRef.value) {
    mAddressRef.value.reload(initOptions)
  }
})

const onSave = (data) => { 
  console.log('data :>> ', data);
}
</script>
```

## API

### Address Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| hideSelect | 隐藏左下角已选择区域 | _boolean_ | `false` |
| sticky | 粘性布局，使用粘性布局时，滚动到顶部时会自动吸顶 | _boolean_ | `false` |
| multiple | 是否多选，开启多选时支持批量选择操作 | _boolean_ | `false` |
| icon | 节点图标 | _string_ | `https://unpkg.com/vant-common@0.2.0-beta.14/assets/mobile-school.png` |
| leafIcon | 叶子节点图标 | _string_ | `https://unpkg.com/vant-common@0.2.0-beta.14/assets/mobile-init-image.png` |
| emptyMsg | 列表数据空文案 | _string_ | `暂无成员` |
| emptyImage | 列表数据空图片 | _string_ | `https://unpkg.com/vant-common@0.2.0-beta.14/assets/mobile-nodata.png` |
| image-size | 图片大小，默认单位为 px | _number \| string \| Array_ | - |
| filterMsg | 搜索列表空文案 | _string_ | `请输入部门名称/用户姓名搜索` |
| suffixText | 已选择对象后缀 | _string_ | `人` |

### Address Events

| 事件名     | 说明                       | 回调参数        |
| ---------- | -------------------------- | --------------- |
| on-save | 保存已修改时触发，开启多选时返回数组对象 | _(data: Array\|Object) => void_ |

### Address Slots

| 名称  | 说明               |
| ----- | ------------------ |
| search-icon | 自定义搜索框图标         |