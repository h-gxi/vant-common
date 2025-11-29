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
  stepsItemProps: () => stepsItemProps,
  stepsProps: () => stepsProps
});
module.exports = __toCommonJS(stdin_exports);
const stepsProps = {
  /** 当前步骤对应的索引值 */
  active: {
    type: [String, Number],
    default: 0
  },
  /** 激活状态颜色 */
  activeColor: {
    type: String,
    default: "#3c9cff"
  },
  /** 激活状态文字颜色 */
  activeTextColor: {
    type: String,
    default: null
  },
  /** 未激活状态颜色 */
  inactiveColor: {
    type: String,
    default: "#969799"
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
    default: "horizontal"
  },
  /** 步骤条样式，可选值为 thickline */
  type: {
    type: String,
    default: null
  }
};
const stepsItemProps = {
  /** 标题文字 */
  title: {
    type: String,
    default: ""
  },
  /** 失败状态 */
  error: {
    type: Boolean,
    default: false
  }
};
