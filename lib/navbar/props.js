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
  navbarProps: () => navbarProps
});
module.exports = __toCommonJS(stdin_exports);
const navbarProps = {
  /** 是否显示组件，默认auto微信小程序端隐藏显示 */
  show: {
    type: [Boolean, String],
    default: "auto"
  },
  /** 标题 */
  title: {
    type: String,
    default: ""
  },
  /** 左侧文案 */
  leftText: {
    type: String,
    default: ""
  },
  /** 右侧文案 */
  rightText: {
    type: String,
    default: ""
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
  /** 是否开启[顶部安全区适配] */
  safeAreaInsetTop: {
    type: Boolean,
    default: true
  },
  /** 返回按钮绑定方法，return false 停止触发click-left事件 */
  clickLeft: {
    type: Function,
    default: null
  }
};
