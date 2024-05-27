<template>
  <div class="m-setps" :class="[`m-setps--${direction}`]">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useChildren } from '@vant/use'
import { stepsProps } from './props'

const name = 'm-setps'
export const STEPS_KEY = Symbol(name)

export default defineComponent({
  name,
  props: stepsProps,
  emits: ['clickStep'],
  setup(props, { emit }) {
    const { linkChildren } = useChildren(STEPS_KEY)

    const onClickStep = (index) => emit('clickStep', index)

    linkChildren({
      props,
      onClickStep
    })

    return {}
  }
})
</script>
../props