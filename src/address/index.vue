<template>
  <div ref="container" class="m-address">
    <van-sticky :container="container" :position="sticky?'top':'bottom'">
      <van-search v-model="filterText" :show-action="filterText.length>0" placeholder="搜索" shape="round" />
      <div class="gray-divider" />
      <div class="m-address-breadcrumb">
        <template v-for="(item, index) in breadcrumbNode" :key="index">
          <span v-if="index<breadcrumbNode.length-1" class="m-address-breadcrumb__title" @click="onClick(item)">{{ item.title }}<i>></i></span>
          <span v-else class="m-address-breadcrumb__label">{{ item.title }}</span>
        </template>
      </div>
    </van-sticky>

    <div class="m-address-list">
      <lazy-component v-for="(item,index) in dataNode" :key="index" class="m-address-cell">
        <template v-if="item.type===1">
          <van-checkbox v-model="item.checked" :name="item.id" @click="onChangeChecked(item)">
            <template #icon>
              <van-icon :class="{checked:item.checked}" name="success" />
            </template>
          </van-checkbox>
          <div class="label">
            <img v-lazy="item.photo ? getImage(item.photo) : leafIcon">
            <span>{{ item.name }}</span>
          </div>
          <div class="right" />
        </template>
        <template v-else>
          <van-checkbox v-if="multiple" v-model="item.checked" :name="item.id" @click="onChangeChecked(item)">
            <template #icon>
              <van-icon :class="{checked:item.checked}" :name="item.checkedAll ? 'success' : 'minus'" />
            </template>
          </van-checkbox>
          <img v-lazy="'https://unpkg.com/vant-common@0.1.9-beta.2/assets/mobile-school.png'">
          <div class="label" @click="onClick(item)">
            <span>{{ item.name }}</span>
          </div>
          <div class="right" @click="onClick(item)">
            <i v-if="item.breadcrumb" class="van-icon van-icon-arrow van-cell__right-icon" />
          </div>
        </template>
      </lazy-component>
      <van-loading v-if="loading && dataNode.length === 0" size="24px" vertical>加载中...</van-loading>
      <van-empty v-if="!loading && dataNode.length === 0" image="https://unpkg.com/vant-common@0.1.9-beta.2/assets/mobile-nodata.png" image-size="200" :description="emptyText" />
    </div>
    <div class="van-safe-area-bottom" />

    <div class="m-address-action-bar">
      <div class="m-address-action-bar__fixed van-safe-area-bottom">
        <div v-if="!hideSelect && multiple" class="m-address-action-bar__select">
          已选择：
          <router-link to="?page=select">
            {{ checkedUsers.length }} {{ suffixText }} <van-icon name="arrow-up" color="#1989fa" />
          </router-link>
        </div>
        <van-button
          class="m-address-action-bar__btn"
          round
          block
          color="#F29103"
          type="primary"
          :disabled="disabled"
          native-type="submit"
          @click="onSave"
        >
          确定
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import _ from 'lodash'
import { ref, computed, watch, defineOptions, defineProps, defineEmits, defineExpose } from 'vue'
import { useAddressStore } from './store'
import { addressProps } from './props'
const addressStore = useAddressStore()

const name = 'm-address'
defineOptions({ name })
const emit = defineEmits(['onSave'])
const props = defineProps(addressProps)

const { hideSelect, sticky, multiple, leafIcon, emptyMsg, filterMsg, suffixText } = props

const filterText = ref('')
const emptyText = computed(() => {
  if (filterText.value) return filterMsg || '请输入部门名称/用户姓名搜索'
  return emptyMsg || '暂无成员'
})
const disabled = ref(false)
const loading = ref(true)
const container = ref(null);

const getImage = computed(() => addressStore.getImage)

watch(filterText, (val) => {
  addressStore.filter(val)
})

const initOptions = {
  rootTitle: '全部',
  actionFunc: '',
  actionParms: {},
  getImageFunc: '',
  data: null,
  defaultCheckedKeys: []
}

/**
 * 加载数据，内部只下载一次
 * @param {*} actionFunc 接口地址
 * @param {*} actionParms 接口参数
 * @param {*} getImageFunc 获取照片接口
 * @param {*} data 本地数据
 * @param {*} defaultCheckedKeys 默认选中项
 */
const reload = (options) => {
  Object.assign(initOptions, options)
  // 初始化发送对象组件
  addressStore.config(initOptions.rootTitle, initOptions.actionFunc, initOptions.getImageFunc)
  loading.value = true
  addressStore.init(initOptions.actionParms, initOptions.data, initOptions.defaultCheckedKeys)
    .then(() => { loading.value = false })
}

defineExpose({ reload })

/**
 * 计算当前页面显示列表
 */
const dataNode = computed(() => addressStore.getDataNode)

/**
 * 面包屑数据
 */
const breadcrumbNode = computed(() => addressStore.breadcrumb)

/**
 * 已选中人员列表
 */
const checkedUsers = computed(() => {
  const nodes = Array.from(addressStore.checkedMap.values())
  return nodes.filter(m => m.type === 1)
})

/**
 * 导航
 */
const onClick = (node) => {
  addressStore.selectNode(node)
}

/**
 * 选中改变时触发
 */
const onChangeChecked = (node) => {
  const { name, checked, checkedAll } = node
  console.log('onChangeChecked :>> ', JSON.stringify({ name, checked, checkedAll }), node)
  addressStore.checked(node, multiple)
}

/**
 * 保存已修改
 */
const onSave = () => {
  if (multiple) {
    emit('onSave', JSON.parse(JSON.stringify(checkedUsers.value)))
  } else {
    // const first = checkedUsers.value.findLast(m => m.id)
    const first = _.findLast(checkedUsers.value, m => m.id)
    emit('onSave', first)
  }
}
</script>

