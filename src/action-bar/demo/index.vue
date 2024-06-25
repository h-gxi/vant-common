<template>
  <demo-block title="基础用法">
    <m-action-bar>
      <m-action-bar-item type="button" text="保存修改" @click="onClick" />
    </m-action-bar>
  </demo-block>
  <demo-block title="不同类型按钮">
    <m-action-bar>
      <m-action-bar-item type="icon" icon="shop-o" text="保存草稿" @click="onClick" />
      <m-action-bar-item type="button" text="提交" @click="onClick" />
    </m-action-bar>
  </demo-block>
  <demo-block title="通知公告案例">
    <m-action-bar>
      <m-action-bar-item type="icon" icon="shop-o" text="草稿箱" @click="onClick" />
      <m-action-bar-item type="button" text="创建通知" @click="onClick" />
      <m-action-bar-item type="icon" icon="envelop-o" text="收件箱" @click="onClick" />
    </m-action-bar>
  </demo-block>
</template>

<script setup>
import MActionBar from '../index';
import MActionBarItem from '../../action-bar-item/index'
import { useVant } from '../../utils/index'
useVant()
import { Toast } from 'vant';

const onClick = () => {
  Toast('点击了按钮');
}


</script>

<style lang="sass">
.demo-action-bar .m-action-bar {
    position: relative;
    padding-bottom: 0;
}
</style>
