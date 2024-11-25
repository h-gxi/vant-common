<template>
  <div ref="rootRef" class="m-page-container" :style="{ background, minHeight }">
    <slot />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
const name = 'm-page-container';

export default defineComponent({
  name,
  props: {
    background: String,
    minHeight: {
      type: String,
      default: '100%'
    }
  },
  emits: [],
  setup() {
    const rootRef = ref<HTMLElement>();

    return {
      rootRef
    };
  },
});
</script>
