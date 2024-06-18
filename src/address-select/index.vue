<template>
  <div class="m-address">
    <div class="gray-divider" />

    <div class="m-address-select-list">
      <lazy-component v-for="(item,index) in checkedUsers" :key="index" class="m-address-cell">
        <div class="label">
          <img v-lazy="item.photo ? getImage(item.photo) : leafIcon">
          <span>{{ item.name }}</span>
        </div>
        <div class="right">
          <div class="van-checkbox__icon van-checkbox__icon--round van-checkbox__icon--checked" @click="onRemove(item)">
            <i class="van-badge__wrapper van-icon van-icon-minus remove" />
          </div>
        </div>
      </lazy-component>
      <van-empty v-if="checkedUsers.length === 0" image="https://unpkg.com/vant-common@0.1.9-beta.2/assets/mobile-nodata.png" image-size="200" :description="emptyMsg" />
    </div>
    <div class="van-safe-area-bottom" />
  </div>
</template>

<script setup>
import { computed, defineProps, defineOptions } from 'vue'
import { useAddressStore } from '../address/store'
import { addressProps } from '../address/props'
const addressStore = useAddressStore()

const name = 'm-address-select'
defineOptions({ name })
defineProps(addressProps)

const getImage = computed(() => addressStore.getImage)

/**
 * 已选中人员列表
 */
const checkedUsers = computed(() => {
  const nodes = Array.from(addressStore.checkedMap.values())
  return nodes.filter(m => m.type === 1)
})

const onRemove = (node) => {
  addressStore.remove(node)
}
</script>

