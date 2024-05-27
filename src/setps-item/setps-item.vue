<template>
  <div ref="mSetpsItemRef" class="m-setps-item" :class="[`m-setps-item--${parentProps.direction}`]" @click="onClickStep">
    <div v-if="showLine" class="m-setps-item--line" :class="[`m-setps-item--line--${parentProps.direction}`]" :style="[lineStyle]" />
    <div class="m-setps-item--wrapper" :class="[`m-setps-item--wrapper--${parentProps.direction}`]">
      <div class="m-setps-item--wrapper__circle" :style="[circleStyle]">
        <van-icon v-if="isFinish" name="success" :color="parentProps.activeColor" size="12" />
        <span v-else class="m-setps-item--wrapper__circle__text" :class="[{isActive}]">{{ index+1 }}</span>
      </div>
    </div>
    <div class="m-setps-item--value" :class="[`m-setps-item--value--${parentProps.direction}`]" :style="[contentStyle]">
      <slot>
        <span>{{ title }}</span>
      </slot>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, computed, onMounted } from 'vue'
import { useParent } from '@vant/use'
import { useRect } from '@vant/use'
import { stepsItemProps } from '../setps/props'
import { STEPS_KEY } from '../setps/setps.vue'

const name = 'm-setps-item'

export default defineComponent({
  name,
  props: stepsItemProps,
  emits: [],
  setup() {
    const { parent, index } = useParent(STEPS_KEY)
    if (!parent) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[Vant] <m-setps> must be a child component of <m-setps>.')
      }
      return
    }

    const mSetpsItemRef = ref()
    const parentProps = parent.props
    const size = ref({
      width: 0,
      height: 0
    })
    onMounted(() => {
      const rect = useRect(mSetpsItemRef)
      size.value.width = rect.width
      size.value.height = rect.height
    })

    const showLine = computed(() => index.value + 1 < parent.children.length)

    const getStatus = () => {
      const active = +parentProps.active
      if (index.value < active) {
        return 'finish'
      }
      return index.value === active ? 'process' : 'waiting'
    }

    const isActive = computed(() => getStatus() === 'process')
    const isFinish = computed(() => getStatus() === 'finish')

    const lineStyle = computed(() => {
      const style = {
        background: isFinish.value ? parentProps.activeColor : parentProps.inactiveColor
      }
      if (parentProps.direction === 'horizontal') {
        style.width = size.value.width + 'px'
        style.left = size.value.width / 2 + 'px'
      } else {
        style.height = size.value.height + 'px'
      }
      return style
    })

    const circleStyle = computed(() => ({
      backgroundColor: getStatus() === 'process' ? parentProps.activeColor : 'transparent',
      borderColor: getStatus() === 'finish' ? parentProps.activeColor : (getStatus() === 'process' ? 'transparent' : parentProps.inactiveColor)
    }))

    const contentStyle = computed(() => ({
      color: getStatus() === 'waiting' ? parentProps.inactiveColor : parentProps.activeColor
    }))

    const onClickStep = () => parent.onClickStep(index.value)

    return {
      index,
      mSetpsItemRef,
      parentProps,
      showLine,
      isActive,
      isFinish,
      lineStyle,
      circleStyle,
      contentStyle,
      onClickStep
    }
  }
})

</script>

