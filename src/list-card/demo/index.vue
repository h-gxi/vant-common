<template>
  <demo-block title="基础用法">
    <div class="demo-list">
      <m-list-card></m-list-card>
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