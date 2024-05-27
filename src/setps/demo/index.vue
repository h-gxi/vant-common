<template>
  <demo-block title="基础用法">
    <m-setps :active="active" active-color="#3c9cff">
      <m-setps-item title="上传成绩单" />
      <m-setps-item title="成绩单设置" />
      <m-setps-item title="预览成绩单" />
    </m-setps>
  </demo-block>

  <demo-block title="自定义样式">
    <m-setps :active="0" active-icon="success" active-color="#3c9cff">
      <m-setps-item title="上传成绩单" />
      <m-setps-item title="成绩单设置" />
      <m-setps-item title="预览成绩单" />
    </m-setps>
  </demo-block>
</template>

<script setup>
import { ref } from 'vue'
import { Icon  } from 'vant';
import MSetps from '../setps.vue';
import MSetpsItem from '../../setps-item/setps-item.vue';
import 'vant/lib/index.css';
window.app.use(Icon)

const active = ref(1);
</script>

