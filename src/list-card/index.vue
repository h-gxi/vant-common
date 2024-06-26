<template>
  <div class="m-list--card">
    <div class="m-list--card__left">
      <slot name="avatar"></slot>
    </div>
    <div class="m-list--card__box">
      <div class="m-list--card__header">
        <div class="left">
          <div class="header-title van-ellipsis">{{ title }}</div>
          <div class="header-label">
            <slot name="label">{{ label }}</slot>
          </div>
        </div>
        <div class="right">
          <slot name="right">
            <span class="header-icon">
              <van-icon :name="rightIcon" :class-prefix="prefix" />
              <label>{{ rightText }}</label> 
            </span>
          </slot>
        </div>
      </div>
      <div class="m-list--card__content van-multi-ellipsis--l2">
        {{ content }}
      </div>
      <div class="m-list--card__toolbar">
        <div class="toolbar-left">
          <slot name="toolbar-left">
            <span class="toolbar-left__span">{{ toolbarLeft }}</span>
          </slot>
        </div>
        <div class="right"><slot name="toolbar-right" /></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type ExtractPropTypes } from 'vue';

const name = 'm-list-card';

const listCardProps = {
  /** 右上角图标 */
  rightIcon: String,
  /** 右上角文字 */
  rightText: String,
  /** 类名前缀，用于使用自定义图标 */
  classPrefix: String,
  /** 标题文字 */
  title: String,
  /** 标签文字 */
  label: String,
  /** 正文 */
  content: String,
  /** 底部左边文字 */
  toolbarLeft: String
};
export type ListCardProps = ExtractPropTypes<typeof listCardProps>;

export default defineComponent({
  name,
  props: listCardProps,
  setup() {
    return {} as any;
  },
});
</script>
