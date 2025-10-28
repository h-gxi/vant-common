<template>
  <demo-block title="基础用法">
    <m-list
      :offset="150"
      :query-method="queryMethod"
      image="https://unpkg.com/vant-common@0.2.0-beta.14/assets/mobile-nodata.png"
      @click="onClick"
    >
      <template #header> </template>
      <m-list-cell>
        <template #default="{ item, index }">
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
import MList from '../index';
import MListCell from '../../list-cell/index';

import { useVant } from '../../utils/index';
useVant();

const queryMethod = () => {
  return new Promise((resolve) => {
    const res = {
      total: 2,
      item: [
        { name: '【标题一】', value: '2024-01-30 15:10:22' },
        { name: '【标题二】', value: '2024-01-22 16:02:40' },
        { name: '【标题二】', value: '2024-01-22 16:02:40' },
        { name: '【标题二】', value: '2024-01-22 16:02:40' },
        { name: '【标题二】', value: '2024-01-22 16:02:40' },
        { name: '【标题二】', value: '2024-01-22 16:02:40' },
        { name: '【标题二】', value: '2024-01-22 16:02:40' },
        { name: '【标题二】', value: '2024-01-22 16:02:40' },
        { name: '【标题二】', value: '2024-01-22 16:02:40' },
        { name: '【标题二】', value: '2024-01-22 16:02:40' },
        { name: '【标题二】', value: '2024-01-22 16:02:40' },
        { name: '【标题二】', value: '2024-01-22 16:02:40' },
        { name: '【标题二】', value: '2024-01-22 16:02:40' },
        { name: '【标题二】', value: '2024-01-22 16:02:40' },
        { name: '【标题二】', value: '2024-01-22 16:02:40' },
        { name: '【标题二】', value: '2024-01-22 16:02:40' },
        { name: '【标题二】', value: '2024-01-22 16:02:40' },
        { name: '【标题二】', value: '2024-01-22 16:02:40' },
        { name: '【标题二】', value: '2024-01-22 16:02:40' },
        { name: '【标题二】', value: '2024-01-22 16:02:40' },
      ],
    };
    resolve(res);
  });
};

const onClick = (item) => {
  console.log('item :>> ', item);
};
</script>
