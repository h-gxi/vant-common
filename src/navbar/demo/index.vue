<template>
  <demo-block title="基础用法">
    <m-nav-bar title="标题" />
  </demo-block>

  <demo-block title="返回上级">
    <m-nav-bar title="标题" @click-left="onClickLeft" />
  </demo-block>

  <demo-block title="右侧按钮">
    <m-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </demo-block>

  <demo-block title="使用插槽">
    <m-nav-bar title="标题" left-text="返回" left-arrow>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </m-nav-bar>
  </demo-block>
</template>

<script setup>
import { Icon, NavBar, Toast  } from 'vant';
import MNavBar from '../index';
import 'vant/lib/index.css';
window.app.use(NavBar).use(Icon)

const onClickLeft = () => history.back();
const onClickRight = () => Toast('按钮');
</script>

