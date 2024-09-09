<template>
  <div ref="mSetpsItemRef" class="m-setps-item" :class="[`m-setps-item--${parentProps.direction}`,{isActive,isFinish}]" @click="onClickStep">
    <div v-if="showLine" class="m-setps-item--line" :class="[`m-setps-item--line--${parentProps.direction}`]" :style="[lineStyle]" />
    <div class="m-setps-item--wrapper" :class="[`m-setps-item--wrapper--${parentProps.direction}`]">
      <div class="m-setps-item--wrapper__circle" :style="[circleStyle]">
        <van-icon v-if="isSuccess" name="success" :color="parentProps.activeColor" size="12" />
        <span v-else class="m-setps-item--wrapper__circle__text" :class="[{isActive}]" :style="[circleTextStyle]">{{ index+1 }}</span>
      </div>
    </div>
    <div class="m-setps-item--value" :class="[`m-setps-item--value--${parentProps.direction}`]" :style="[contentStyle]">
      <slot>
        <span>{{ title }}</span>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed, onMounted, type ExtractPropTypes } from 'vue'
import { useParent } from '@vant/use'
import { useRect } from '@vant/use'
import { stepsItemProps } from '../setps/props'
import { STEPS_KEY, type StepsProps } from '../setps/index'

const name = 'm-setps-item'
export type StepsItemProps = ExtractPropTypes<typeof stepsItemProps>;

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
    const parentProps = (parent as any).props as StepsProps
    const size = ref({
      width: 0,
      height: 0
    })
    onMounted(() => {
      const rect = useRect(mSetpsItemRef)
      size.value.width = rect.width
      size.value.height = rect.height
    })

    const showLine = computed(() => {
      if (parentProps.type === 'thickline') {
        return true
      }
      return index.value + 1 < parent.children.length
    })

    const getStatus = () => {
      const active = +parentProps.active
      if (index.value < active) {
        return 'finish'
      }
      return index.value === active ? 'process' : 'waiting'
    }

    const isActive = computed(() => getStatus() === 'process')
    const isFinish = computed(() => getStatus() === 'finish')
    const thickline = computed(() => getStatus() === 'process' || getStatus() === 'finish')
    const isSuccess = computed(()=> {
      if (parentProps.type === 'thickline') {
        return false
      }
      return getStatus() === 'finish'
    })

    const lineStyle = computed(() => {
      const style = {
        background: isFinish.value ? parentProps.activeColor : parentProps.inactiveColor
      } as any
      if (parentProps.direction === 'horizontal') {
        style.width = size.value.width + 'px'
        style.left = size.value.width / 2 + 'px'
        if (parentProps.type === 'thickline') {
          style.left = 0
          style.background = thickline.value ? parentProps.activeColor : ''
        }
      } else {
        style.height = size.value.height + 'px'
      }
      return style
    })

    const circleStyle = computed(() => { 
      if (parentProps.type === 'thickline') {
        return {
          borderColor : thickline.value ? parentProps.activeColor : '',
        }
      }
      return ({
        backgroundColor: getStatus() === 'process' ? parentProps.activeColor : '#fff',
        borderColor: getStatus() === 'finish' ? parentProps.activeColor : (getStatus() === 'process' ? 'transparent' : parentProps.inactiveColor)
      })
    })

    const circleTextStyle = computed(()=> {
      if (parentProps.type === 'thickline') {
        return {
          color : thickline.value ? parentProps.activeColor : '',
        }
      }
      return ''
    })

    const contentStyle = computed(() => {
      if (parentProps.type === 'thickline') {
        return {
          color: isFinish.value ? (parentProps.activeTextColor || parentProps.activeColor) : ''
        }
      }
      return ({
        color: getStatus() === 'waiting' ? parentProps.inactiveColor : (parentProps.activeTextColor || parentProps.activeColor)
      })
    })

    const onClickStep = () => (parent as any).onClickStep(index.value)

    return {
      index,
      mSetpsItemRef,
      parentProps,
      showLine,
      isActive,
      isFinish,
      isSuccess,
      lineStyle,
      circleStyle,
      circleTextStyle,
      contentStyle,
      onClickStep
    } as any
  }
})

</script>

