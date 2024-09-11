<template>
  <demo-block title="配合弹窗组件使用">
    <van-cell is-link title="底部弹窗" @click="showBasicRef.open()" />
    <m-popup ref="showBasicRef" title="选择学科" @confirm="onConfirm">
      <m-form-checkbox
        toolbar-title="从下面选择录入成绩的科目"
        :columns="columns"
        :default-value="['1', '2']"
      />
    </m-popup>
  </demo-block>
</template>

<script setup>
import { ref } from 'vue';
import MPopup from '../../popup/index';
import MFormCheckbox from '../index';
import { useVant } from '../../utils/index';
useVant();

const showBasicRef = ref(null);
const columns = [
  {
    label: '语文',
    value: '1',
  },
  {
    label: '数学',
    value: '2',
  },
  {
    label: '英语',
    value: '3',
  },
  {
    label: '物理',
    value: '4',
  },
  {
    label: '化学',
    value: '5',
  },
  {
    label: '其他',
    value: '6',
  },
];

const onConfirm = (checked) => {
  console.log('checked :>> ', checked);
  showBasicRef.value.close();
};
</script>
