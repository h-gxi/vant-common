<template>
  <van-nav-bar
    v-if="!isWeiXin"
    class="m-nav-bar"
    :left-text="leftText"
    :right-text="rightText"
    :left-arrow="leftArrow"
    :border="border"
    :fixed="fixed"
    :placeholder="placeholder"
    :z-index="zIndex"
    safe-area-inset-top
    @click-left="onClickLeft"
  >
    <template #title>
      {{ title }}
    </template>
  </van-nav-bar>
</template>

<script>
import { ref, computed, defineComponent } from 'vue'
import { navbarProps } from './props'

const name = 'm-nav-bar'

export default defineComponent({
  name,
  props: navbarProps,
  emits: ['click-left'],
  setup(props, { emit, slots }) {
    const isWeiXin = computed(() => /MicroMessenger/i.test(navigator.userAgent))

    const onClickLeft = () => {
      const { clickLeft } = props
      if (clickLeft) {
        const res = props.clickLeft()
        if (res === false) {
          return
        }
      }
      emit('click-left')
    }
    return {
      isWeiXin,
      onClickLeft
    }
  }
})
</script>

