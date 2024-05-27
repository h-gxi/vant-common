export const tableProps = {
  data: {
    type: Array,
    default: null
  }
}

export const tableColumnProps = {
  prop: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  fixed: {
    type: Boolean,
    default: false
  },
  minWidth: {
    type: Number,
    default: 80
  },
  /** 对应列是否可以排序
 * 如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件
 */
  sortable: {
    type: [String, Boolean],
    default: ''
  },
  /** 对齐方式 'left' | 'center' */
  align: {
    type: String,
    default: 'left'
  },
  /** 用来格式化内容
 * (row: any, column: any, cellValue: any, index: number) => VNode | string
 */
  formatter: {
    type: Function,
    default: null
  }
}
