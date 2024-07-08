export const addressProps = {
  /** 隐藏左下角已选择区域 */
  hideSelect: {
    type: Boolean,
    default: false
  },
  /** 粘性布局，使用粘性布局时，滚动到顶部时会自动吸顶 */
  sticky: {
    type: Boolean,
    default: false
  },
  /** 是否多选，开启多选时支持批量选择操作 */
  multiple: {
    type: Boolean,
    default: false
  },
  /** 节点图标 */
  icon: {
    type: String,
    default: 'https://unpkg.com/vant-common@0.2.0-beta.14/assets/mobile-school.png'
  },
  /** 叶子节点图标 */
  leafIcon: {
    type: String,
    default: 'https://unpkg.com/vant-common@0.2.0-beta.14/assets/mobile-init-image.png'
  },
  /** 列表数据空文案 */
  emptyMsg: {
    type: String,
    default: '暂无成员'
  },
  /** 列表数据空图片 */
  emptyImage: {
    type: String,
    default: 'https://unpkg.com/vant-common@0.2.0-beta.14/assets/mobile-nodata.png'
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

