<template>
  <demo-block title="基础用法">
    <van-cell is-link title="基本用法" @click="showBasicRef.open()" />
    <m-popup ref="showBasicRef" title="标题">
      <span>显示内容</span>
    </m-popup>

    <van-cell is-link title="自定义标题栏" @click="showHeaderRef.open()" />
    <m-popup ref="showHeaderRef" title="自定义标题" left-icon="cross">
      <template #header-right>
        <van-checkbox v-model="checked">全选</van-checkbox>
      </template>
      <span>显示内容</span>
    </m-popup>

    <van-cell is-link title="自定义按钮" @click="showButtonRef.open()" />
    <m-popup ref="showButtonRef" title="自定义按钮" cancel-text="重置" :cancel-func="onCancel" :confirm-func="onConfirm">
      <span>显示内容</span>
    </m-popup>
  </demo-block>
</template>

<script setup>
import { ref } from 'vue';
import MPopup from '../index';
import { useVant } from '../../utils/index';
useVant();

const showBasicRef = ref(null);
const showHeaderRef = ref(null);
const showButtonRef = ref(null);
const checked = ref(false);

const onCancel = ()=> {
  console.log('onCancel :>> 重置');
}

const onConfirm = (checked) => {
  console.log('checked :>> ', checked);
  showButtonRef.value.close();
};
</script>
