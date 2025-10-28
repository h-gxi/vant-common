<template>
  <div class="m-form-checkbox">
    <div v-if="toolbar" class="m-form-checkbox-content__toolbar">
      <div class="title">{{ toolbarTitle }}</div>
      <div>
        <van-checkbox v-model="checkedAll" @change="onChageAll"
          >全选</van-checkbox
        >
      </div>
    </div>
    <van-checkbox-group
      v-model="checkedGroup"
      direction="horizontal"
      @change="onChage"
    >
      <div
        v-for="(item, i) in columns"
        :key="i"
        class="m-form-checkbox-content__item"
        :class="{
          'm-form-checkbox-content__item--checked': checkedGroup.includes(
            item.value,
          ),
        }"
      >
        <van-checkbox :name="item.value">{{ item.label }}</van-checkbox>
      </div>
    </van-checkbox-group>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, nextTick, onMounted } from 'vue';
import type { PropType } from 'vue';
import { useParent } from '@vant/use';
import { POPUP_KEY } from '../popup/index';

const name = 'm-form-checkbox';

export type CheckboxItem = {
  label: string;
  value: string;
};

export const formCheckboxProps = {
  /** 选项列表数据 */
  columns: {
    type: Array as PropType<CheckboxItem[]>,
    default: [],
  },
  /** 默认选中项 */
  defaultValue: {
    type: Array as PropType<string[]>,
    default: [],
  },
  /** 开启顶部工具栏 */
  toolbar: {
    type: Boolean,
    default: true,
  },
  /** 顶部工具栏标题 */
  toolbarTitle: {
    type: String,
    default: '',
  },
};

export default defineComponent({
  name,
  props: formCheckboxProps,
  emits: ['change'],
  setup(props, { emit }) {
    const { parent } = useParent(POPUP_KEY);

    const checkedAll = ref(false);
    const checkedGroup = ref<string[]>([]);

    const onChage = (arr: string[]) => {
      if (arr.length === 0) {
        checkedAll.value = false;
      }
      if (arr.length === props.columns.length) {
        checkedAll.value = true;
      }
      setValue(checkedGroup.value);
      emit('change', checkedGroup.value);
    };
    const onChageAll = (checked: boolean) => {
      if (checked) {
        checkedGroup.value = props.columns.map((m) => m.value);
      } else {
        checkedGroup.value = [];
      }
    };

    const setValue = (val: any) => {
      if (parent) {
        (parent as any).setValue(val);
      }
    };

    onMounted(() => {
      nextTick(() => {
        checkedGroup.value = props.defaultValue;
        setValue(props.defaultValue);
      });
    });

    return {
      checkedAll,
      checkedGroup,
      onChage,
      onChageAll,
    };
  },
});
</script>
