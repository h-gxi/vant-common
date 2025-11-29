var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  addressProps: () => addressProps
});
module.exports = __toCommonJS(stdin_exports);
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
