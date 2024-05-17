export const navbarProps = {
  /** 标题 */
  title: {
    type: String,
    default: ''
  },
  /** 左侧文案 */
  leftText: {
    type: String,
    default: ''
  },
  /** 右侧文案 */
  rightText: {
    type: String,
    default: ''
  },
  /** 是否显示左侧箭头 */
  leftArrow: {
    type: Boolean,
    default: true
  },
  /** 是否显示下边框 */
  border: {
    type: Boolean,
    default: true
  },
  /** 是否固定在顶部 */
  fixed: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: Boolean,
    default: false
  },
  /** 元素 z-index */
  zIndex: {
    type: Number,
    default: 99
  },
  /** 返回按钮绑定方法，return false 停止触发click-left事件 */
  clickLeft: {
    type: Function,
    default: null
  }
}
