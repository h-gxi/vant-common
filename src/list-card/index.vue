<template>
  <div class="m-list--card" :class="[{ 'show-toobar__line': isShowToolbar }]" @click="onClick">
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
            <div class="header-icon" @click.stop="onHeaderIcon">
              <van-icon :name="rightIcon" :class-prefix="classPrefix" />
              <div class="label">{{ rightText }}</div>
            </div>
          </slot>
        </div>
      </div>
      <div
        class="m-list--card__content"
        :class="[contentClass, { 'hide-toobar': !isShowToolbar }]"
      >
        {{ content }}
      </div>
      <div v-if="isShowToolbar" class="m-list--card__toolbar">
        <div class="toolbar-left">
          <slot name="toolbar-left">
            <span class="toolbar-left__span">{{ toolbarLeft }}</span>
          </slot>
        </div>
        <div
          class="right"
          :style="toolbarRightStyle"
          @click.stop="onToolbarRight"
        >
          <slot name="toolbar-right" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  type ExtractPropTypes,
  type CSSProperties,
} from 'vue';

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
  toolbarLeft: String,
  /** 正文样式 */
  contentClass: {
    type: String,
    default: 'van-multi-ellipsis--l2',
  },
  /** 底部右边字体颜色 */
  toolbarRightColor: String,
};
export type ListCardProps = ExtractPropTypes<typeof listCardProps>;

export default defineComponent({
  name,
  props: listCardProps,
  emits: ['click', 'header-icon', 'toolbar-right'],
  setup(props, { emit, slots }) {
    const isShowToolbar = computed(
      () =>
        props.toolbarLeft || slots['toolbar-left'] || slots['toolbar-right'],
    );
    const toolbarRightStyle = computed(() => {
      if (props.toolbarRightColor) {
        const style: CSSProperties = {
          color: props.toolbarRightColor,
        };
        return style;
      }
      return '';
    });
    const onClick = (event: MouseEvent) => {
      emit('click', event);
    };
    const onHeaderIcon = (event: MouseEvent) => {
      emit('header-icon', event);
    };
    const onToolbarRight = (event: MouseEvent) => {
      emit('toolbar-right', event);
    };
    return {
      isShowToolbar,
      toolbarRightStyle,
      onClick,
      onHeaderIcon,
      onToolbarRight,
    } as any;
  },
});
</script>
