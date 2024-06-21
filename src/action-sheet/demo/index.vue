<template>
  <demo-block title="基础用法">
    <van-cell is-link title="基本用法" @click="showBasicRef.open()" />
    <van-cell is-link title="展示取消按钮" @click="showCancelRef.open()" />
    <m-action-sheet ref="showBasicRef" :actions="actions" @select="onSelect" />
    <m-action-sheet ref="showCancelRef" :actions="actions" close-on-click-action cancel-text="取消" @cancel="onCancel" />
  </demo-block>
</template>

<script setup>
import { ref, computed } from 'vue'
import MActionSheet from '../index';
import { useVant } from '../../utils/index'
useVant()
import { Toast } from 'vant';

const showBasicRef = ref(null)
const showCancelRef = ref(null)
const actions = computed(() => [
  { name: '选项一' },
  { name: '选项二' },
  { name: '选项三' },
]);

const onSelect = (item, index) => {
  console.log('item,index :>> ', item, index);
  Toast(item.name);
}

const onCancel = () => Toast('取消');

</script>
