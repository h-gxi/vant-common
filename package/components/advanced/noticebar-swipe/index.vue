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
      <van-icon name="cross" size="16" @click="onClose" />
    </template>
    <van-swipe
      ref="swipeRef"
      vertical
      class="m-noticebar-swipe"
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

<script>
import { ref, computed, defineComponent } from 'vue'
import { useParent } from '@vant/use'
import { noticebarSwipeProps } from './props'
import { HEADER_KEY } from '../../base/header/index.vue'

const name = 'm-noticebar-swipe'

export default defineComponent({
  name,
  props: noticebarSwipeProps,
  emits: ['remove', 'click', 'update:modelValue'],
  setup(props, { emit, slots }) {
    const { parent, index } = useParent(HEADER_KEY)

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

    const swipeRef = ref(null)
    const swipeIndex = ref(0)

    const swipeChage = (index) => {
      console.log('index :>> ', index)
      swipeIndex.value = index
    }

    const onClose = () => {
      if (props.value) {
        emit('remove', swipeIndex.value)
      } else {
        swipeItems.value.splice(swipeIndex.value, 1)
      }
      if (swipeIndex.value > 0) {
        swipeRef.value.swipeTo(swipeIndex.value--)
      }

      if (!visible.value) {
        // 刷新header高度
        parent?.resize()
      }
    }

    const onClick = (index) => {
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

