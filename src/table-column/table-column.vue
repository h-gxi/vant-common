<template>
  <div
    class="m-table__cell"
    :class="[{'is-sticky':fixed, 'is-last-column':isSticky, 'ascending': order==='ascending', 'descending': order==='descending'}]"
    :style="styleObj"
  >
    <div class="cell">
      {{ label }}
      <span v-if="sortable" class="caret-wrapper" @click="onSortable">
        <i class="sort-caret ascending" />
        <i class="sort-caret descending" />
      </span>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { computed, defineComponent } from 'vue'
import { useParent } from '@vant/use'
import { tableColumnProps } from '../table/props'
import { TABLE_KEY } from '../table/table.vue'

const name = 'm-table-column'

export default defineComponent({
  name,
  props: tableColumnProps,
  emits: [],
  setup(props) {
    const { parent, index } = useParent(TABLE_KEY)
    if (!parent) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[Vant] <m-table> must be a child component of <m-table>.')
      }
      return
    }

    if (index === 0) {
      parent.clearColumn()
    }

    let left = 0
    if (props.fixed) {
      const list = parent.columns.value.filter(m => m.fixed)
      list.forEach((e) => {
        left = left + e.minWidth
      })
    }
    parent.addColumn({ ...props, left, order: '' })

    const order = computed(() => parent.columns.value.find(m => m.prop === props.prop)?.order || '')

    const isSticky = computed(() => {
      const node = _.findLast(parent.columns.value, m => m.fixed)
      if (node) {
        return node.prop === props.prop
      }
      return false
    })

    const styleObj = computed(() => {
      const style = {
        width: `${props.minWidth}px`,
        paddingLeft: '12px'
      }
      if (props.fixed) {
        style['left'] = `${left}px`
      }
      if (props.align === 'center') {
        style['justify-content'] = 'center'
        style['padding-left'] = '0'
      }
      return style
    })

    const onSortable = () => {
      let type = ''
      if (order.value === '') {
        type = 'descending'
      } else if (order.value === 'descending') {
        type = 'ascending'
      }
      parent.setOrder(props.sortable, props.prop, type)
    }
    // const onAscending = () => {
    //   parent.setOrder(props.sortable, props.prop, order.value === 'ascending' ? '' : 'ascending')
    // }
    // const onDescending = () => {
    //   parent.setOrder(props.sortable, props.prop, order.value === 'descending' ? '' : 'descending')
    // }
    return {
      order,
      isSticky,
      styleObj,
      onSortable
    }
  }
})
</script>

