<template>
  <div v-if="isSlotsLoaded" class="m-header" :style="styleObj">
    <div ref="headerRef" class="m-header--fixed">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import {
  ref,
  computed,
  defineComponent,
  nextTick,
  onMounted,
  type ExtractPropTypes,
} from 'vue';
import { useChildren, useParent } from '@vant/use';
import { useRect } from '@vant/use';
import { PAGE_KEY } from '../page-container/index';

const name = 'm-header';
export const HEADER_KEY = Symbol(name);

const headerProps = {
  /** 指定header高度 */
  height: {
    type: [String, Number],
    default: null,
  },
};

export type HeaderProps = ExtractPropTypes<typeof headerProps>;

export default defineComponent({
  name,
  props: headerProps,
  emits: ['onResize'],
  setup(props, { emit, slots }) {
    const { linkChildren } = useChildren(HEADER_KEY);
    const { parent } = useParent(PAGE_KEY);

    const offsetHeight = ref(46);
    const headerRef = ref<HTMLElement>();

    const isSlotsLoaded = computed(
      () => slots.default && slots.default().length > 0,
    );

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

    const setHeight = () => {
      if (parent) {
        (parent as any).setHeight(offsetHeight.value);
      }
    };

    /**
     * 重置header高度
     */
    const resize = (): void => {
      nextTick(() => {
        offsetHeight.value = headerRef.value?.offsetHeight as any;
        setHeight();
        emit('onResize', offsetHeight.value);
      });
    };

    linkChildren({
      resize,
    } as any);

    onMounted(() => {
      if (!props.height) {
        nextTick(() => {
          setTimeout(() => {
            const rect = useRect(headerRef);
            offsetHeight.value = rect.height + 3;
            setHeight();
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
