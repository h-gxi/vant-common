<template>
  <demo-block title="基础用法">
    <van-cell is-link title="基本用法" @click="showBasicRef.open()" />
    <m-popup ref="showBasicRef" title="标题" @confirm="onConfirm" />
  </demo-block>
</template>

<script setup>
import { ref } from 'vue';
import MPopup from '../index';
import { useVant } from '../../utils/index';
useVant();

const showBasicRef = ref(null);

const onConfirm = (checked) => {
  console.log('checked :>> ', checked);
  showBasicRef.value.close();
};
</script>
