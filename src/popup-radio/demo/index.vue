<template>
  <demo-block title="基础用法">
    <van-cell is-link title="基本用法" @click="showBasicRef.open()" />
    <m-popup-radio
      ref="showBasicRef"
      title="标题"
      :columns="columns"
      default-value="1"
      @confirm="onConfirm"
    />
  </demo-block>
</template>

<script setup>
import { ref } from 'vue';
import MPopupRadio from '../index';
import { useVant } from '../../utils/index';
useVant();

const showBasicRef = ref(null);
const columns = [
  {
    label: '幼儿园/一年级/1班',
    value: '1',
  },
  {
    label: '幼儿园/一年级/2班',
    value: '2',
  },
  {
    label: '幼儿园/一年级/3班',
    value: '3',
  },
];

const onConfirm = (checked) => {
  console.log('checked :>> ', checked);
  showBasicRef.value.close();
};
</script>
