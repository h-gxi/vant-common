<template>
  <demo-block title="基础用法">
    <m-header>
      <m-nav-bar title="标题" />
      <van-search placeholder="搜索" />
    </m-header>
  </demo-block>

  <demo-block title="指定高度">
    <m-header :height="46">
      <m-nav-bar title="标题" />
    </m-header>
  </demo-block>
</template>

<script setup>
import MHeader from '../index';
import MNavBar from '../../navbar/index';

import { useVant } from '../../utils/index'
useVant()
</script>
