<template>
  <Popup ref="popupRef" :title="title" :round="round">
    <van-radio-group v-model="checked" @change="onChange">
      <div v-for="(item, i) in columns" :key="i" class="m-popup-radio__row">
        <div class="label">
          <img class="icon" v-lazy="icon" />
          <span :class="{ 'is-active': checked === item.value }">
            {{ item.label }}
          </span>
        </div>
        <div class="value"><van-radio :name="item.value"></van-radio></div>
      </div>
    </van-radio-group>
  </Popup>
</template>

<script lang="ts">
import { ref, defineComponent, nextTick, onMounted } from 'vue';
import type { PropType } from 'vue';
import Popup, { popupProps } from '../popup/index';

const name = 'm-popup-radio';

export type RadioItem = {
  label: string;
  value: string;
};

export const popupRadioProps = {
  ...popupProps,
  /** 选项列表数据 */
  columns: {
    type: Array as PropType<RadioItem[]>,
    default: [],
  },
  /** 默认选中项 */
  defaultValue: {
    type: String,
    default: '',
  },
  /** 图标 */
  icon: {
    type: String,
    default:
      'https://unpkg.com/vant-common@0.2.0-beta.14/assets/mobile-school.png',
  },
};

export default defineComponent({
  name,
  components: { Popup },
  props: popupRadioProps,
  emits: [],
  setup(props) {
    const popupRef = ref();
    const checked = ref('');

    const onChange = (name: string) => {
      popupRef.value.setValue(name);
    };

    const open = () => {
      nextTick(() => {
        popupRef.value.open();
      });
    };
    const close = () => popupRef.value.close();

    onMounted(() => {
      checked.value = props.defaultValue;
      popupRef.value.setValue(props.defaultValue);
    });

    return {
      popupRef,
      checked,
      onChange,
      open,
      close,
    };
  },
});
</script>
