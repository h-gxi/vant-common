<template>
  <div ref="tableRef" class="m-table" :class="[{'is-scrolling':isScrolling}]" style="width: 100%;">
    <div class="m-table__header">
      <slot />
    </div>
    <div v-for="(row,i) in tableData" :key="i" class="m-table__row">
      <div v-for="item in columns" :key="item.prop" class="m-table__cell" :class="[{'is-sticky':item.fixed, 'is-last-column':isSticky(item)}]" :style="styleObj(item)">
        <span class="cell" v-html="getCellValue(row,item,i)" />
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { ref, reactive, computed, defineComponent, nextTick, onActivated } from 'vue'
import { useChildren, useScrollParent, useEventListener } from '@vant/use'
import { tableProps } from './props'

const name = 'm-table'
export const TABLE_KEY = Symbol(name)

export default defineComponent({
  name,
  props: tableProps,
  emits: ['sort-change'],
  setup(props, { emit, slots }) {
    const state = reactive({
      prop: '',
      order: ''
    })

    const tableData = computed(() => {
      let array = _.cloneDeep(props.data || [])
      if (state.prop && state.order) {
        array = array.sort((a, b) => {
          /** 处理空字符串比0小 */
          const _a = a[state.prop] === '' ? -1 : a[state.prop]
          const _b = b[state.prop] === '' ? -1 : b[state.prop]
          if (_a < _b) {
            return state.order === 'descending' ? 1 : -1
          }
          if (_a > _b) {
            return state.order === 'descending' ? -1 : 1
          }
          return 0
        })
      }
      return array
    })

    const columns = ref([])

    const addColumn = (e) => {
      columns.value.push(e)
    }
    const clearColumn = () => {
      columns.value = []
    }
    /** 排序功能 */
    const setOrder = (sortable, prop, order) => {
      columns.value.forEach(e => {
        if (e.prop === prop) {
          e.order = order
        } else {
          e.order = ''
        }
      })
      // 远程排序
      if (sortable === 'custom') {
        state.prop = ''
        state.order = ''
        emit('sort-change', { prop, order })
      } else {
        state.prop = prop
        state.order = order
      }
    }

    const isSticky = (item) => {
      const node = _.findLast(columns.value, m => m.fixed)
      if (node) {
        return node.prop === item.prop
      }
      return false
    }

    const styleObj = (item) => {
      const style = {
        width: `${item.minWidth}px`,
        paddingLeft: '12px'
      }
      if (item.fixed) {
        style['left'] = `${item.left}px`
      }
      if (item.align === 'center') {
        if (item.sortable) {
          style.paddingLeft = `${(item.minWidth - 50) / 2}px`
        } else {
          style.paddingLeft = `${(item.minWidth) / 2 - 15}px`
        }
      }
      return style
    }

    const getCellValue = (row, item, i) => {
      if (item.formatter) {
        return item.formatter(row, item, row[item.prop], i) || ''
      }
      return row[item.prop]
    }

    onActivated(() => {
      /** 使用路由缓存时清空columns */
      columns.value = []
    })

    const tableRef = ref()
    const scrollParent = useScrollParent(tableRef)
    const scroller = computed(() => scrollParent.value)

    const isScrolling = ref(false)

    const check = () => {
      nextTick(() => {
        isScrolling.value = scroller.value.scrollLeft > 0
      })
    }

    useEventListener('scroll', check, {
      target: scroller,
      passive: true
    })

    const { linkChildren } = useChildren(TABLE_KEY)

    linkChildren({
      columns,
      addColumn,
      clearColumn,
      setOrder
    })

    return {
      tableRef,
      isScrolling,
      tableData,
      columns,
      isSticky,
      styleObj,
      getCellValue
    }
  }
})
</script>

