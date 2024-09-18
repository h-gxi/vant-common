<template>
  <div
    ref="tableRef"
    :key="columns"
    class="m-table"
    :class="[{ 'is-scrolling': isScrolling, 'is-border': border }]"
    style="width: 100%"
  >
    <div class="m-table__header" :style="headerStyle">
      <slot />
    </div>
    <div v-for="(row, i) in tableData" :key="i" class="m-table__row">
      <div
        v-for="item in columns"
        :key="item.prop"
        class="m-table__cell"
        :class="[
          {
            'is-sticky': item.fixed,
            'is-last-column': isSticky(item),
            'is-nowrap': item.nowrap,
          },
        ]"
        :style="styleObj(item)"
      >
        <span
          class="cell"
          v-html="getCellValue(row, item, i)"
          @click="onClick(row, item)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import _ from 'lodash';
import {
  ref,
  reactive,
  computed,
  defineComponent,
  nextTick,
  onActivated,
  type ExtractPropTypes,
} from 'vue';
import { useChildren, useScrollParent, useEventListener } from '@vant/use';
import { tableProps } from './props';

const name = 'm-table';
export const TABLE_KEY = Symbol(name);
export type TableProps = ExtractPropTypes<typeof tableProps>;

export default defineComponent({
  name,
  props: tableProps,
  emits: ['sort-change', 'cell-click'],
  setup(props, { emit }) {
    const state = reactive({
      prop: '',
      order: '',
    });

    const tableData = computed(() => {
      let array = _.cloneDeep(props.data || []);
      if (state.prop && state.order) {
        array = array.sort((a: any, b: any) => {
          /** 处理空字符串比0小 */
          const _a = a[state.prop] === '' ? -1 : a[state.prop];
          const _b = b[state.prop] === '' ? -1 : b[state.prop];
          if (_a < _b) {
            return state.order === 'descending' ? 1 : -1;
          }
          if (_a > _b) {
            return state.order === 'descending' ? -1 : 1;
          }
          return 0;
        });
      }
      return array;
    });

    const columns: any = ref([]);

    const addColumn = (e: never) => {
      columns.value.push(e);
    };
    const clearColumn = () => {
      columns.value = [];
    };
    /** 排序功能 */
    const setOrder = (sortable: any, prop: any, order: any) => {
      columns.value.forEach((e: any) => {
        if (e.prop === prop) {
          e.order = order;
        } else {
          e.order = '';
        }
      });
      // 远程排序
      if (sortable === 'custom') {
        state.prop = '';
        state.order = '';
        emit('sort-change', { prop, order });
      } else {
        state.prop = prop;
        state.order = order;
      }
    };

    const isSticky = (item: any) => {
      const node = _.findLast(columns.value, (m: any) => m.fixed);
      if (node) {
        return node.prop === item.prop;
      }
      return false;
    };

    const styleObj = (item: any) => {
      const style = {
        width: `${item.minWidth}px`,
        paddingLeft: '12px',
      } as any;
      if (item.fixed) {
        style['left'] = `${item.left}px`;
      }
      if (item.align === 'center') {
        if (item.sortable) {
          style.paddingLeft = `${(item.minWidth - 50) / 2}px`;
        } else {
          style.paddingLeft = `${item.minWidth / 2 - 15}px`;
        }
      }
      return style;
    };

    const headerStyle = computed(() => {
      if (props.headerBgColor) {
        return { backgroundColor: props.headerBgColor };
      }
      return '';
    });

    const getCellValue = (row: any, item: any, i: any) => {
      if (item.formatter) {
        return item.formatter(row, item, row[item.prop], i) || '';
      }
      return row[item.prop];
    };

    onActivated(() => {
      /** 使用路由缓存时清空columns */
      columns.value = [];
    });

    /** 点击单元格触发 */
    const onClick = (row: any, item: any) => {
      emit('cell-click', row, item, item.prop);
    };

    const tableRef = ref();
    const scrollParent = useScrollParent(tableRef);
    const scroller = computed(() => scrollParent.value);

    const isScrolling = ref(false);

    const check = () => {
      nextTick(() => {
        isScrolling.value = (scroller.value as any).scrollLeft > 0;
      });
    };

    useEventListener('scroll', check, {
      target: scroller,
      passive: true,
    });

    const { linkChildren } = useChildren(TABLE_KEY);

    linkChildren({
      columns,
      addColumn,
      clearColumn,
      setOrder,
    } as any);

    return {
      tableRef,
      isScrolling,
      tableData,
      columns,
      isSticky,
      styleObj,
      headerStyle,
      getCellValue,
      onClick,
    } as any;
  },
});
</script>
