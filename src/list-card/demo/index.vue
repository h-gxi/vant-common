<template>
  <demo-block title="基础用法">
    <div class="demo-list">
      <m-list-card title="假期安全责任书，各位同学请查收" label="王老师 班主任" content="尊敬的各位家长：假期将至，为使学生们过一个安全、健康而有意义的假期，切实保护学生的安全。">
        <template #avatar>
          <van-image
            width="18px"
            height="18px"
            src="https://unpkg.com/@vant/assets@1.0.8/cat.jpeg"
          />
        </template>
        <template #right>
          <van-image
            width="58px"
            height="32px"
            src="https://unpkg.com/@vant/assets@1.0.8/cat.jpeg"
          />
        </template>
      </m-list-card>
    </div>
  </demo-block>
</template>

<script setup>
import MListCard from '../index';

import { useVant } from '../../utils/index'
useVant()


</script>

<style>
.demo-list {
  padding: 0 16px;
}
</style>