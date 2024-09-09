<template>
  <div class="m-setps" :class="[`m-setps--${direction}`,type]">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, type ExtractPropTypes } from 'vue'
import { useChildren } from '@vant/use'
import { stepsProps } from './props'

const name = 'm-setps'
export const STEPS_KEY = Symbol(name)
export type StepsProps = ExtractPropTypes<typeof stepsProps>;

export default defineComponent({
  name,
  props: stepsProps,
  emits: ['clickStep'],
  setup(props, { emit }) {
    const { linkChildren } = useChildren(STEPS_KEY)

    const onClickStep = (index: number) => emit('clickStep', index)

    linkChildren({
      props,
      onClickStep
    } as any)

    return {}
  }
})
</script>
