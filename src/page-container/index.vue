<template>
  <div
    ref="rootRef"
    class="m-page-container"
    :style="{ background, minHeight }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { useChildren } from '@vant/use';
const name = 'm-page-container';
export const PAGE_KEY = Symbol(name);

export default defineComponent({
  name,
  props: {
    background: String,
    minHeight: {
      type: String,
      default: '100%',
    },
  },
  emits: [],
  setup() {
    const rootRef = ref<HTMLElement>();
    const { linkChildren } = useChildren(PAGE_KEY);
    /** 标题栏高度 */
    const headerHeight = ref(0);
    const setHeight = (value: number) => {
      headerHeight.value = value;
    };

    linkChildren({
      headerHeight,
      setHeight,
    } as any);

    return {
      rootRef,
    };
  },
});
</script>
