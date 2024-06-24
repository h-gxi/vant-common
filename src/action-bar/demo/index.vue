<template>
  <demo-block title="基础用法">
    <m-action-bar>
      <m-action-bar-item type="icon" icon="shop-o" text="草稿箱" />
      <m-action-bar-item type="button" text="创建通知" />
      <m-action-bar-item type="icon" icon="envelop-o" text="收件箱" />
    </m-action-bar>
  </demo-block>
</template>

<script setup>
// import { ref, computed } from 'vue'
import MActionBar from '../index';
import MActionBarItem from '../../action-bar-item/index'
import { useVant } from '../../utils/index'
useVant()
// import { Toast } from 'vant';

// const onSelect = (item, index) => {
//   console.log('item,index :>> ', item, index);
//   Toast(item.name);
// }


</script>

<style lang="sass">
.demo-action-bar .m-action-bar {
    position: relative;
    padding-bottom: 0;
}
</style>
