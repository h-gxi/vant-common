export const noticebarSwipeProps = {
  /** 双向绑定列表 {title} */
  modelValue: {
    type: Array,
    default: null
  },
  /** 列表数据 v-model/value 二选一，使用value时触发@remove事件*/
  value: {
    type: Array,
    default: null
  },
  /** 文本颜色 */
  color: {
    type: String,
    default: '#ed6a0c'
  },
  /** 滚动条背景 */
  background: {
    type: String,
    default: '#fffbe8'
  },
  /** 左侧图标名称或图片链接，可选值见 Icon 组件 */
  leftIcon: {
    type: String,
    default: 'volume-o'
  },
  /** 是否在长度溢出时滚动播放 */
  scrollable: {
    type: Boolean,
    default: false
  },
  /** 自动轮播间隔，单位为 ms */
  autoplay: {
    type: Number,
    default: 4000
  }
}
