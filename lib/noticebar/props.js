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
  noticebarProps: () => noticebarProps
});
module.exports = __toCommonJS(stdin_exports);
const noticebarProps = {
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
  color: String,
  /** 滚动条背景 */
  background: String,
  /** 左侧图标名称或图片链接，可选值见 Icon 组件 */
  leftIcon: String,
  /** 是否在长度溢出时滚动播放 */
  scrollable: {
    type: Boolean,
    default: false
  },
  /** 自动轮播间隔，单位为 ms */
  autoplay: {
    type: Number,
    default: 4e3
  }
};
