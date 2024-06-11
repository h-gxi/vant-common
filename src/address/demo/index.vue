<template>
  <m-address
    ref="mAddressRef"
    :title="props.title"
    :hide-select="props.hideSelect"
    :multiple="props.multiple"
    :leaf-icon="props.leafIcon || 'https://unpkg.com/vant-common@0.1.9-beta.2/assets/mobile-init-image.png'"
    :empty-msg="props.emptyMsg || '暂无成员'"
    :filter-msg="props.filterMsg || '请输入部门名称/用户姓名搜索'"
    :suffix-text="props.suffixText || '人'"
    @on-save="onSave"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MAddress from '../index';

import { useVant, usePinia } from '../../utils/index'
useVant()
usePinia()

const mAddressRef = ref(null)

const data = [
  {
      "name": "测试学校",
      "type": 0,
      "parentId": null,
      "children": [
          {
              "name": "幼儿园",
              "type": 2,
              "parentId": "3a0481ab-946b-0ac9-2973-2d6e61dd838c",
              "children": [
                  {
                      "name": "1年级",
                      "type": 2,
                      "parentId": "3a0481ab-9530-60b9-579d-4c1f65b5c096",
                      "children": [
                          {
                              "name": "1班",
                              "type": 1,
                              "parentId": "3a0481ab-97a4-5b9f-abb6-a6cee5bcd3d8",
                              "children": [],
                              "id": "3a0481ab-9846-f5a6-d6b4-ed4972557a15"
                          },
                          {
                              "name": "2班",
                              "type": 1,
                              "parentId": "3a0481ab-97a4-5b9f-abb6-a6cee5bcd3d8",
                              "children": [],
                              "id": "3a04a69f-f721-b836-4ace-49be8b76cfd0"
                          },
                          {
                              "name": "3班",
                              "type": 1,
                              "parentId": "3a0481ab-97a4-5b9f-abb6-a6cee5bcd3d8",
                              "children": [],
                              "id": "3a04a69f-f726-cfad-7e97-068f551be10e"
                          }
                      ],
                      "id": "3a0481ab-97a4-5b9f-abb6-a6cee5bcd3d8"
                  }
              ],
              "id": "3a0481ab-9530-60b9-579d-4c1f65b5c096"
          },
          {
              "name": "高中",
              "type": 2,
              "parentId": "3a0481ab-946b-0ac9-2973-2d6e61dd838c",
              "children": [
                  {
                      "name": "1年级",
                      "type": 2,
                      "parentId": "3a0481ab-954e-ac26-0441-22bd1266d893",
                      "children": [
                          {
                              "name": "1班",
                              "type": 1,
                              "parentId": "3a04dea2-fd97-a747-5f91-f5e9009fd88a",
                              "children": [],
                              "id": "3a051310-e8e4-3b92-e9f0-eeed839c07bf"
                          },
                          {
                              "name": "2班",
                              "type": 1,
                              "parentId": "3a04dea2-fd97-a747-5f91-f5e9009fd88a",
                              "children": [],
                              "id": "3a051310-e8e9-678d-c598-e73a3a33fb3f"
                          },
                          {
                              "name": "3班",
                              "type": 1,
                              "parentId": "3a04dea2-fd97-a747-5f91-f5e9009fd88a",
                              "children": [],
                              "id": "3a051310-e8ed-397c-5171-f18e892eb9da"
                          }
                      ],
                      "id": "3a04dea2-fd97-a747-5f91-f5e9009fd88a"
                  }
              ],
              "id": "3a0481ab-954e-ac26-0441-22bd1266d893"
          }
      ],
      "id": "3a0481ab-946b-0ac9-2973-2d6e61dd838c"
  }
]


const getClassAddressSelectList = async ()=> {
  return new Promise((resolve) => {
    resolve(data)
  })
}

const props = ref({
  addressRootTitle: '通讯录', // 导航根标题，默认显示“全部”
  addressActionFunc: getClassAddressSelectList, // 通讯录组件接口地址
  addressActionParms: {}, // 通讯录组件接口参数
  title: '接收班级',
  selectTile: '已选择班级',
  leafIcon: 'https://unpkg.com/vant-common@0.1.9-beta.2/assets/mobile-school.png', // 叶子节点图标
  emptyMsg: '暂无班级', // 列表数据空文案
  filterMsg: '请输入部门名称/用户姓名搜索', // 搜索列表空文案
  suffixText: '班级', // 已选择对象后缀
  selectKey: 'classId' // 表单中绑定字段名
})




const initOptions = {
  rootTitle: props.value.addressRootTitle || '全部',
  actionFunc: props.value.addressActionFunc,
  actionParms: props.value.addressActionParms,
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

