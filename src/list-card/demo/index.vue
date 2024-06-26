<template>
  <demo-block class="container" title="基础用法">
    <div class="demo-list">
      <m-list-card 
        title="假期安全责任书，各位同学请查收" 
        label="发布于  2024-6-26 11:00" 
        content="尊敬的各位家长：假期将至，为使学生们过一个安全、健康而有意义的假期，切实保护学生的安全。"
        right-icon="share-o"
        right-text="分享"
        @click="onClick"
        @header-icon="onHeaderIcon"
        @toolbar-right="onToolbarRight"
      >
        <template #avatar>
          <van-image
            width="18px"
            height="18px"
            src="https://unpkg.com/@vant/assets@1.0.8/cat.jpeg"
          />
        </template>
        <template #toolbar-left>
          <div><van-icon name="comment-circle-o" style="margin-right: 4px;" /><span>已读</span><span style="color: black;margin-left: 2px;">20</span></div>
          <div style="margin-left: 12px;"><span>未读</span><span style="color: black;margin-left: 2px;">12</span></div>
          <div style="margin-left: 12px;"><span>已确认</span><span style="color: black;margin-left: 2px;">12</span></div>
        </template>
        <template #toolbar-right>
          <div style="color: #FFA000;">
            <van-icon name="bullhorn-o" style="margin-right: 4px;" />
            提醒
          </div>
        </template>
      </m-list-card>
      <m-list-card 
        title="假期安全责任书，各位同学请查收" 
        content="尊敬的各位家长：假期将至"
        toolbar-left="2024-6-25 17:19"
      >
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
        <template #label>
          王老师 
          <span>
            <van-icon name="manager" color="#4587FA" />
            <van-tag color="#EBF3FF" text-color="#4587FA" style="font-size: 10px;border-radius: 2px;">班主任</van-tag>
          </span> 
        </template>
        <template #toolbar-right>
          <van-icon name="guide-o" style="margin-right: 4px;" />
          分享
        </template>
      </m-list-card>
      <m-list-card 
        title="假期安全责任书，各位同学请查收" 
        label="发布于  2024-6-26 11:00" 
        content="尊敬的各位家长：假期将至"
      >
        <template #avatar>
          <van-image
            width="18px"
            height="18px"
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
import { Toast } from 'vant';

const onClick = ()=> {
  Toast('点击了卡片');
}
const onHeaderIcon = ()=> {
  Toast('点击了分享按钮');
}
const onToolbarRight = ()=> {
  Toast('点击了提醒按钮');
}
</script>

<style>
.container {
  background: #fff;
  height: 100vh;
}
.demo-list {
  padding: 0 16px;
}
</style>