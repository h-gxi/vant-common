<template>
  <van-popup
    v-model:show="visible"
    :round="round"
    safe-area-inset-bottom
    position="bottom"
  >
    <div class="m-popup">
      <div v-if="header" class="m-popup-header">
        <div v-if="leftIcon" class="left">
          <van-icon :name="leftIcon" @click="onBack" />
        </div>
        <div class="title">{{ title }}</div>
        <div class="right">
          <slot name="header-right">
            <van-icon name="cross" @click="onCancel" />
          </slot>
        </div>
      </div>
      <div class="m-popup-content">
        <slot />
      </div>
      <div v-if="footer" class="m-popup-footer">
        <slot name="footer">
          <div v-if="cancelText" class="btn cancel" @click="onCancel">{{ cancelText }}</div>
          <div v-if="confirmText" class="btn confirm" @click="onConfirm">{{ confirmText }}</div>
        </slot>
      </div>
    </div>
  </van-popup>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import type { ExtractPropTypes } from 'vue';
import { useChildren } from '@vant/use';
const name = 'm-popup';
export const POPUP_KEY = Symbol(name);

export const popupProps = {
  /** 标题 */
  title: {
    type: String,
    default: '',
  },
  /** 是否显示圆角 */
  round: {
    type: Boolean,
    default: true,
  },
  /** 是否显示标题栏 */
  header: {
    type: Boolean,
    default: true,
  },
  /** 是否显示底部按钮 */
  footer: {
    type: Boolean,
    default: true,
  },
  /** 左上角按钮 可选值 arrow-left | cross  */
  leftIcon: {
    type: String,
    default: 'arrow-left',
  },
  /** 底部左侧按钮  */
  cancelText: {
    type: String,
    default: '取消',
  },
  /** 底部左侧按钮回调函数  */
  cancelFunc: {
    type: Function,
    default: null,
  },
  /** 底部右侧按钮  */
  confirmText: {
    type: String,
    default: '确认',
  },
  /** 标题栏左侧按钮回调函数  */
  backFunc: {
    type: Function,
    default: null,
  },
  /** 底部右侧按钮回调函数  */
  confirmFunc: {
    type: Function,
    default: null,
  },
  /** 是否调用回调函数后自动关闭 */
  autoClose: {
    type: Boolean,
    default: false,
  },
};
export type PopupProps = ExtractPropTypes<typeof popupProps>;

export default defineComponent({
  name,
  props: popupProps,
  emits: [],
  setup(props) {
    const { linkChildren } = useChildren(POPUP_KEY);
    const visible = ref(false);
    const checked: any = ref(null);

    const setValue = (val: any) => {
      checked.value = val;
    };

    const onBack = ()=> {
      if (props.backFunc) {
        props.backFunc()
        if (props.autoClose) {
          close();
        }
      } else {
        close();
      }
    }

    const onConfirm = () => {
      if (props.confirmFunc) {
        props.confirmFunc(checked.value);
        if (props.autoClose) {
          close();
        }
      } else {
        close();
      }
    };

    const onCancel = () => {
      if (props.cancelFunc) {
        props.cancelFunc();
        if (props.autoClose) {
          close();
        }
      } else {
        close();
      }
    };

    const open = () => {
      visible.value = true;
    };
    const close = () => {
      visible.value = false;
    };

    linkChildren({
      setValue,
      open,
      close,
    } as any);

    return {
      visible,
      onBack,
      onConfirm,
      onCancel,
      setValue,
      open,
      close,
    };
  },
});
</script>
