export const addressProps = {
  /** 标题 */
  title: {
    type: String,
    default: ''
  },
  /** 隐藏左下角已选择区域 */
  hideSelect: {
    type: Boolean,
    default: false
  },
  /** 是否多选 */
  multiple: {
    type: Boolean,
    default: false
  },
  /** 叶子节点图标 */
  leafIcon: {
    type: String,
    default: 'images/mobile-init-image.png'
  },
  /** 列表数据空文案 */
  emptyMsg: {
    type: String,
    default: '暂无成员'
  },
  /** 搜索列表空文案 */
  filterMsg: {
    type: String,
    default: '请输入部门名称/用户姓名搜索'
  },
  /** 已选择对象后缀 */
  suffixText: {
    type: String,
    default: '人'
  }
}

