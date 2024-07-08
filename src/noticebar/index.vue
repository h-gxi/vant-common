<template>
  <van-notice-bar
    v-show="visible"
    class="m-noticebar"
    :scrollable="scrollable"
    :color="color"
    :background="background"
    :left-icon="leftIcon"
    @close="onClose"
  >
    <template #right-icon>
      <van-icon name="cross" @click="onClose" />
    </template>
    <van-swipe
      ref="swipeRef"
      vertical
      class="m-noticebar__swipe"
      :autoplay="autoplay"
      :touchable="false"
      :show-indicators="false"
      @change="swipeChage"
    >
      <van-swipe-item
        v-for="(item,index) in swipeItems"
        :key="index"
        @click="onClick(index)"
      >
        {{ item.title }}
      </van-swipe-item>
    </van-swipe>
  </van-notice-bar>
</template>

<script lang="ts">
import { ref, computed, defineComponent, type ExtractPropTypes } from 'vue'
import { useParent } from '@vant/use'
import { noticebarProps } from './props'
import { HEADER_KEY } from '../header/index'

const name = 'm-noticebar'
export type NoticebarProps = ExtractPropTypes<typeof noticebarProps>;

export default defineComponent({
  name,
  props: noticebarProps,
  emits: ['remove', 'click', 'update:modelValue'],
  setup(props, { emit }) {
    const { parent } = useParent(HEADER_KEY)

    const swipeItems = computed({
      get() {
        if (props.value) {
          return props.value
        }
        return props.modelValue || []
      },
      set(value) {
        emit('update:modelValue', value)
      }
    })
    const visible = computed(() => swipeItems.value.length > 0)

    const swipeRef: any = ref<HTMLElement>();
    const swipeIndex = ref(0)

    const swipeChage = (index: number) => {
      swipeIndex.value = index
    }

    const onClose = () => {
      if (props.value) {
        emit('remove', swipeIndex.value)
      } else {
        swipeItems.value.splice(swipeIndex.value, 1)
      }
      if (swipeIndex.value > 0) {
        swipeRef.value?.swipeTo(swipeIndex.value--)
      }

      if (!visible.value) {
        // 刷新header高度
        (parent as any)?.resize()
      }
    }

    const onClick = (index: number) => {
      emit('click', index)
    }

    return {
      visible,
      swipeRef,
      swipeItems,
      swipeChage,
      onClose,
      onClick
    }
  }
})
</script>

