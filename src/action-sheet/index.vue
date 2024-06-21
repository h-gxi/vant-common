<template>
  <div class="m-action-sheet">
    <van-popup v-model:show="visible" :round="round" safe-area-inset-bottom position="bottom">
      <div class="m-action-sheet__content">
        <button v-for="(item, i) in actions" type="button" class="m-action-sheet__item" @click="onclick(item, i)">
          {{ item.name }}
        </button>
        <template v-if="cancelText">
          <div class="m-action-sheet__gap"></div>
          <button type="button" class="m-action-sheet__cancel" @click="onClose()">
            {{ cancelText }}
          </button>
          <div class="m-action-sheet__bottom"></div>
        </template>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import type { PropType, ExtractPropTypes } from 'vue';
const name = 'm-action-sheet';

export type ActionSheetAction = {
  name?: string;
};

export const actionSheetProps = {
  /** 面板选项列表 */
  actions: {
    type: Array as PropType<ActionSheetAction[]>,
    default: [],
  },
  /** 取消按钮文字 */
  cancelText: {
    type: String,
    default: ''
  },
  /** 是否显示圆角 */
  round: {
    type: Boolean,
    default: false
  },
  /** 是否在点击选项后关闭 */
  closeOnClickAction: {
    type: Boolean,
    default: false
  }
}
export type ActionSheetProps = ExtractPropTypes<typeof actionSheetProps>;

export default defineComponent({
  name,
  props: actionSheetProps,
  emits: ['select', 'cancel'],
  setup(props, { emit }) {
    const visible = ref(false)

    const onclick = (item: ActionSheetAction, i: number) => {
      if (props.closeOnClickAction) {
        close()
      }
      emit('select', item, i)
    }
    const onClose = () => {
      close()
      emit('cancel')
    }

    const open = () => {
      visible.value = true
    }
    const close = () => {
      visible.value = false
    }

    return {
      visible,
      onclick,
      onClose,
      open,
      close
    }
  }
})
</script>

<style scoped></style>