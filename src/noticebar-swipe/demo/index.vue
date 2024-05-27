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
import { Icon, NoticeBar, Swipe, SwipeItem, Toast  } from 'vant';
import MNoticebarSwipe from '../index.vue';
import 'vant/lib/index.css';
window.app.use(Icon).use(NoticeBar).use(Swipe).use(SwipeItem)

const noticeBars = ref([
  {
    title: '“通知公告”功能介绍及使用案例',
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

