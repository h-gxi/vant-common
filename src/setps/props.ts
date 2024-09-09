export const stepsProps = {
/** 当前步骤对应的索引值 */
  active: {
    type: [String, Number],
    default: 0
  },
  /** 激活状态颜色 */
  activeColor: {
    type: String,
    default: '#3c9cff'
  },
  /** 激活状态文字颜色 */
  activeTextColor: {
    type: String,
    default: null
  },
  /** 未激活状态颜色 */
  inactiveColor: {
    type: String,
    default: '#969799'
  },
  /** 激活状态的图标 */
  activeIcon: {
    type: String,
    default: null
  },
  /** 未激活状态图标 */
  inactiveIcon: {
    type: String,
    default: null
  },
  /** 图标大小 */
  iconSize: {
    type: Number,
    default: 17
  },
  /** 步骤条方向，可选值为 vertical */
  direction: {
    type: String,
    default: 'horizontal'
  },
  /** 步骤条样式，可选值为 thickline */
  type: {
    type: String,
    default: null
  }
}
export const stepsItemProps = {
  /** 标题文字 */
  title: {
    type: String,
    default: ''
  },
  /** 失败状态 */
  error: {
    type: Boolean,
    default: false
  }
}
