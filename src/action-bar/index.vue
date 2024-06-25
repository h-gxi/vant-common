<template>
  <div class="m-action-bar__placeholder" :style="styleObj">
    <div ref="rootRef" class="m-action-bar">
      <slot />
    </div>
    <div class="van-safe-area-bottom"></div>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted, nextTick, defineComponent } from 'vue';
import { useRect, useChildren } from '@vant/use'
const name = 'm-action-bar';
export const ACTIONBAR_KEY = Symbol(name)

export default defineComponent({
  name,
  emits: [],
  setup() {
    const { linkChildren } = useChildren(ACTIONBAR_KEY)
    const offsetHeight = ref(55);
    const rootRef = ref<HTMLElement>();
    const styleObj = computed(() => {
      let style = '';
      if (offsetHeight.value > 0) {
        style = `height: ${offsetHeight.value}px;`;
      }
      return style;
    });

    onMounted(() => {
      nextTick(() => {
        setTimeout(() => {
          const rect = useRect(rootRef);
          offsetHeight.value = rect.height;
        }, 50);
      });
    });

    linkChildren()
    return {
      rootRef,
      styleObj
    }
  }
})
</script>
