<template>
  <div ref="rootRef" class="m-page-container" :style="{ background }">
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
