<template>
  <demo-block title="基础用法">
    <m-list
      class="m-list"
      :offset="150"
      :query-method="queryMethod"
      image="images/mobile-nodata.png"
      @click="onClick"
    >
      <m-list-cell class="m-item">
        <template #default="{item,index}">
          <div v-show="index != 0" class="gray-divider" />
          <van-cell :border="false">
            <template #title>
              <div class="cell-title">
                {{ item.name }}
              </div>
            </template>
            <template #value>
              <div class="cell-value">
                {{ item.value }}
              </div>
            </template>
          </van-cell>
        </template>
      </m-list-cell>
    </m-list>
  </demo-block>
</template>

<script setup>
import { Icon, PullRefresh, List, Cell, Empty } from 'vant';
import MList from '../index';
import MListCell from '../../list-cell/index';
import 'vant/lib/index.css';
window.app.use(Icon).use(PullRefresh).use(List).use(Cell).use(Empty)

const queryMethod = ()=> {
  return new Promise((resolve) => {
    const res = {total:2,item:[{name:'【标题一】',value:'2024-01-30 15:10:22'},{name:'【标题二】',value:'2024-01-22 16:02:40'}]}
    resolve(res)
  })
}

const onClick = (item) => {
  console.log('item :>> ', item);
};

</script>

