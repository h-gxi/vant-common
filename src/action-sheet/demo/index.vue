<template>
  <demo-block title="基础用法">
    <van-cell is-link title="基本用法" @click="showBasicRef.open()" />
    <van-cell is-link title="展示图标" @click="showIconRef.open()" />
    <van-cell is-link title="展示标题栏" @click="showHeaderRef.open()" />
    <van-cell is-link title="展示取消按钮" @click="showCancelRef.open()" />
    <m-action-sheet ref="showBasicRef" :actions="actions" @select="onSelect" />
    <m-action-sheet ref="showIconRef" :actions="actions2" @select="onSelect" />
    <m-action-sheet ref="showCancelRef" :actions="actions" close-on-click-action cancel-text="取消" @cancel="onCancel" />
    <m-action-sheet ref="showHeaderRef" title="我的标题" :actions="actions" close-on-click-action cancel-text="取消" @cancel="onCancel" />
  </demo-block>
</template>

<script setup>
import { ref, computed } from 'vue'
import MActionSheet from '../index';
import { useVant } from '../../utils/index'
useVant()
import { showToast } from 'vant';

const showBasicRef = ref(null)
const showIconRef = ref(null);
const showHeaderRef = ref(null);
const showCancelRef = ref(null)
const actions = computed(() => [
  { name: '选项一' },
  { name: '选项二' },
  { name: '选项三' },
]);

const actions2 = computed(() => [
  { name: '选项一', icon: 'cart-o' },
  { name: '选项二', icon: 'shop-o' },
  { name: '选项三', icon: 'star-o' },
]);

const onSelect = (item, index) => {
  console.log('item,index :>> ', item, index);
  showToast(item.name);
}

const onCancel = () => showToast('取消');

</script>
