<template>
  <div v-if="isSlotsLoaded" class="m-header" :style="styleObj">
    <div ref="headerRef" class="m-header--fixed">
      <slot />
    </div>
  </div>
</template>

<script>
import { ref, computed, defineComponent, nextTick, onMounted } from 'vue';
import { useChildren } from '@vant/use';
import { useRect } from '@vant/use';
import { headerProps } from './props';

const name = 'm-header';
export const HEADER_KEY = Symbol(name);

export default defineComponent({
  name,
  props: headerProps,
  emits: ['onResize'],
  setup(props, { emit, slots }) {
    const { linkChildren } = useChildren(HEADER_KEY);

    const offsetHeight = ref(46);
    const headerRef = ref(null);
    
    const isSlotsLoaded = computed(() => slots.default && slots.default().length > 0);

    const styleObj = computed(() => {
      let style = '';
      if (props.height) {
        if (typeof props.height === 'number') {
          style = `height: ${props.height}px;`;
        } else {
          style = `height: ${props.height};`;
        }
      } else {
        if (offsetHeight.value > 0) {
          style = `height: ${offsetHeight.value}px;`;
        }
      }
      return style;
    });

    /**
     * 重置header高度
     */
    const resize = () => {
      nextTick(() => {
        offsetHeight.value = headerRef.value?.offsetHeight;
        emit('onResize', offsetHeight.value);
      });
    };

    linkChildren({
      resize,
    });

    onMounted(() => {
      if (!props.height) {
        nextTick(() => {
          setTimeout(() => {
            const rect = useRect(headerRef);
            offsetHeight.value = rect.height + 3;
          }, 50);
        });
      }
    });

    return {
      isSlotsLoaded,
      styleObj,
      headerRef,
      resize,
    };
  },
});
</script>
