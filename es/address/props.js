const addressProps = {
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
    default: "https://unpkg.com/vant-common@0.2.0-beta.14/assets/mobile-school.png"
  },
  /** 叶子节点图标 */
  leafIcon: {
    type: String,
    default: "https://unpkg.com/vant-common@0.2.0-beta.14/assets/mobile-init-image.png"
  },
  /** 列表数据空文案 */
  emptyMsg: {
    type: String,
    default: "\u6682\u65E0\u6210\u5458"
  },
  /** 列表数据空图片 */
  emptyImage: {
    type: String,
    default: "https://unpkg.com/vant-common@0.2.0-beta.14/assets/mobile-nodata.png"
  },
  /** 图片大小 */
  imageSize: [Number, String, Array],
  /** 搜索列表空文案 */
  filterMsg: {
    type: String,
    default: "\u8BF7\u8F93\u5165\u90E8\u95E8\u540D\u79F0/\u7528\u6237\u59D3\u540D\u641C\u7D22"
  },
  /** 已选择对象后缀 */
  suffixText: {
    type: String,
    default: "\u4EBA"
  }
};
export {
  addressProps
};
