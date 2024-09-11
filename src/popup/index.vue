<template>
  <van-popup
    v-model:show="visible"
    :round="round"
    safe-area-inset-bottom
    position="bottom"
  >
    <div class="m-popup">
      <div class="m-popup-header">{{ title }}</div>
      <div class="m-popup-content">
        <slot />
      </div>
      <div class="m-popup-footer">
        <div class="btn cancel" @click="onCancel">取消</div>
        <div class="btn confirm" @click="onConfirm">确认</div>
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
};
export type PopupProps = ExtractPropTypes<typeof popupProps>;

export default defineComponent({
  name,
  props: popupProps,
  emits: ['confirm', 'cancel'],
  setup(props, { emit }) {
    const { linkChildren } = useChildren(POPUP_KEY);
    const visible = ref(false);
    const checked: any = ref(null);

    const setValue = (val: any) => {
      checked.value = val;
    };

    const onConfirm = () => {
      emit('confirm', checked.value);
    };

    const onCancel = () => {
      close();
      emit('cancel');
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
      onConfirm,
      onCancel,
      setValue,
      open,
      close,
    };
  },
});
</script>
