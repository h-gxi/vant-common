<template>
  <demo-block title="基础用法">
    <m-setps :active="active">
      <m-setps-item title="上传成绩单" />
      <m-setps-item title="成绩单设置" />
      <m-setps-item title="预览成绩单" />
    </m-setps>
  </demo-block>

  <demo-block title="自定义样式">
    <m-setps :active="0" active-icon="success" active-color="#ed6a0c">
      <m-setps-item title="上传成绩单" />
      <m-setps-item title="成绩单设置" />
      <m-setps-item title="预览成绩单" />
    </m-setps>
  </demo-block>

  <demo-block title="竖向步骤条">
    <m-setps :active="0" direction="vertical" style="padding: 0 16px;">
      <m-setps-item>
        <h3>【城市】物流状态1</h3>
        <p>2016-07-12 12:40</p>
      </m-setps-item>
      <m-setps-item>
        <h3>【城市】物流状态2</h3>
        <p>2016-07-11 10:00</p>
      </m-setps-item>
      <m-setps-item>
        <h3>快件已发货</h3>
        <p>2016-07-10 09:30</p>
      </m-setps-item>
    </m-setps>
  </demo-block>
</template>

<script setup>
import { ref } from 'vue'
import MSetps from '../index';
import MSetpsItem from '../../setps-item/index';

import { useVant } from '../../utils/index'
useVant()

const active = ref(1);
</script>

