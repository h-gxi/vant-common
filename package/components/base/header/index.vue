<template>
  <div v-if="isSlotsLoaded" class="m-header" :style="styleObj">
    <div ref="headerRef" class="m-header--fixed">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, getCurrentInstance, onMounted, defineProps, defineEmits, defineExpose } from 'vue'

const props = defineProps({
  /** 指定header高度 */
  height: {
    type: [String, Number],
    default: null
  }
})

const emit = defineEmits(['onResize'])

const { proxy } = getCurrentInstance()
const offsetHeight = ref(46)

const isSlotsLoaded = computed(() => proxy.$slots.default().length > 0)

const styleObj = computed(() => {
  let style = ''
  if (props.height) {
    if (typeof props.height === 'number') {
      style = `height: ${props.height}px;`
    } else {
      style = `height: ${props.height};`
    }
  } else {
    if (offsetHeight.value > 0) {
      style = `height: ${offsetHeight.value}px;`
    }
  }
  return style
})
/**
 * 重置header高度
 */
const resize = () => {
  nextTick(() => {
    offsetHeight.value = proxy.$refs.headerRef.offsetHeight
    emit('onResize', offsetHeight.value)
  })
}

onMounted(() => {
  if (!props.height) {
    nextTick(() => {
      setTimeout(() => {
        if (proxy.$refs.headerRef?.offsetHeight) {
          offsetHeight.value = proxy.$refs.headerRef?.offsetHeight + 3
        }
      }, 50)
    })
  }
})

defineExpose({ resize })
</script>

