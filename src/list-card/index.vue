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
            <van-icon
              :name="rightIcon"
              :class-prefix="prefix"
              class="header-icon"
            />
          </slot>
        </div>
      </div>
      <div class="m-list--card__content van-multi-ellipsis--l2">
        {{ content }}
      </div>
      <div class="m-list--card__toolbar">
        <div class="left">2024-6-25 17:19</div>
        <div class="right">分享</div>
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
  /** 类名前缀，用于使用自定义图标 */
  classPrefix: String,
  /** 标题文字 */
  title: String,
  /** 标签文字 */
  label: String,
  /** 正文 */
  content: String,
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
