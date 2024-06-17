<template>
  <demo-block title="基础用法">
    <m-noticebar-swipe v-model="noticeBars" @click="onClickNotice" />
  </demo-block>

  <demo-block title="自定义样式">
    <m-noticebar-swipe v-model="noticeBars2" color="#ed6a0c" background="#fffbe8" left-icon="info-o" @click="onClickNotice" />
  </demo-block>
</template>

<script setup>
import { ref } from 'vue'
import { Toast  } from 'vant';
import MNoticebarSwipe from '../index';


import { useVant } from '../../utils/index'
useVant()

const noticeBars = ref([
  {
    title: '“通知公告”功能介绍及使用案例1',
    html: '<img  src="images/notice-guide.png" style="width: 100%;">'
  },
  {
    title: '“通知公告”功能介绍及使用案例2',
    html: '<img  src="images/notice-guide.png" style="width: 100%;">'
  }
])

const noticeBars2 = ref([
  {
    title: '“通知公告”功能介绍及使用案例',
    html: '<img  src="images/notice-guide.png" style="width: 100%;">'
  }
])
const onClickNotice = (index) => {
  Toast('点击了' + index);
}
</script>

